import classNames from 'classnames';
import { BigNumber } from 'ethers';
import { swap } from '~/api/swap';
import { useSnapshot } from 'valtio';
import Moralis from 'moralis';
import { useChain, useMoralis } from 'react-moralis';
import { swapOfferState, swapSettings, swapState, userBalanceStore, userState } from '~/state';
import { AVALANCHE_CHAIN_ID, ZERO_ADDRESS } from '~/utils/constants';
import { useEffect } from 'react';
import { formatTokenBalance } from '~/utils/formatters';

const SwapCardButton = () => {
  const { authenticate, isAuthenticated, isAuthenticating, user } = useMoralis();
  const { chainId } = useChain();

  const userBalancesSnap = useSnapshot(userBalanceStore);
  // const swapOfferStateSnap = useSnapshot(swapOfferState);

  useEffect(() => {
    if (!user) {
      return;
    }

    userState.userAddress = user.get('ethAddress') ?? '';
  }, [user]);

  const getUserBalances = async () => {
    if (!user) {
      return;
    }

    const options: { chain: 'avalanche'; address: string } = { chain: 'avalanche', address: user.get('ethAddress') };

    try {
      const tokenBalances = await Promise.all([
        Moralis.Web3API.account.getTokenBalances(options),
        Moralis.Web3API.account.getNativeBalance(options),
      ]);
      userBalanceStore.tokens = tokenBalances[0];
      userBalanceStore.native = tokenBalances[1].balance;
    } catch (err) {
      console.error('error in fetching user balances');
    }
  };

  useEffect(() => {
    getUserBalances();
  }, [user]);

  const swapStateSnap = useSnapshot(swapState);
  // const userStateSnap = useSnapshot(userState);

  const swapTokens = async () => {
    const currentOffer = swapOfferState.yakOffer;
    if (!currentOffer) {
      return;
    }

    swapState.swapLoading = true;

    const slippage = swapSettings.slippage * 100;

    const offerWithSlippage = {
      ...currentOffer,
      amounts: currentOffer.amounts.map((amount: any, index: any) =>
        index === 0
          ? BigNumber.from(amount).toString()
          : BigNumber.from(amount)
              .mul(BigNumber.from(10000 - slippage))
              .div(BigNumber.from('10000'))
              .toString()
      ),
    };

    const payload = {
      trade: offerWithSlippage,
      fromAVAX: swapState.tokenIn.address === ZERO_ADDRESS,
      toAVAX: swapState.tokenOut.address === ZERO_ADDRESS,
    };

    try {
      await swap(payload);
      await getUserBalances();
    } finally {
      swapState.swapLoading = false;
    }
  };

  const inputTokenUserBalance = userBalanceStore.tokens.find(
    (v) => v.token_address.toLowerCase() === swapState.tokenIn.address.toLowerCase()
  );

  return (
    <>
      {/* {snap.user ? (
            Number(
              tokens.tokenIn.address === ZERO_ADDRESS
                ? formatTokenBalance(userBalances.native, '18')
                : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals)
            ) >= amountIn ? ( */}
      {isAuthenticated && Number(chainId) === 1337 ? (
        <button
          onClick={swapTokens}
          className={classNames('btn w-full btn-primary', swapStateSnap.swapLoading === true ? 'loading' : null)}
          disabled={!!swapStateSnap.loading}
        >
          Swap
        </button>
      ) : isAuthenticated ? (
        Number(chainId) !== AVALANCHE_CHAIN_ID ? (
          <button disabled className="btn w-full btn-disabled">
            Wrong network
          </button>
        ) : Number(
            swapStateSnap.tokenIn.address === ZERO_ADDRESS
              ? formatTokenBalance(userBalancesSnap.native, '18')
              : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals)
          ) >= swapStateSnap.amountIn ? (
          <button
            onClick={swapTokens}
            className={classNames('btn w-full btn-primary', swapStateSnap.swapLoading === true ? 'loading' : null)}
            disabled={!!swapStateSnap.loading}
          >
            Swap
          </button>
        ) : (
          <button disabled className="btn w-full btn-disabled">
            Insufficient funds
          </button>
        )
      ) : (
        <button
          onClick={() => authenticate()}
          className={classNames('btn w-full btn-ghost', {
            loading: isAuthenticating,
          })}
        >
          Connect wallet
        </button>
      )}
    </>
  );
};

export default SwapCardButton;
