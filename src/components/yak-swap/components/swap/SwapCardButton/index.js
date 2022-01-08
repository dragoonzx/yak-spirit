import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import classNames from 'classnames';
import Web3 from 'web3';
import { swap } from '../../../api/swap.js';
import { useSnapshot } from 'valtio';
import Moralis from 'moralis';
import { useMoralis } from 'react-moralis';
import { swapOfferState, swapSettings, swapState, userBalanceStore, userState } from '../../../state/index.js';
import { AVALANCHE_CHAIN_ID, ZERO_ADDRESS } from '../../../utils/constants.js';
import { useEffect } from 'react';
import { formatTokenBalance } from '../../../utils/formatters.js';
const SwapCardButton = () => {
    const { authenticate, isAuthenticated, isAuthenticating, user } = useMoralis();
    const userBalancesSnap = useSnapshot(userBalanceStore);
    useEffect(() => {
        if (!user) {
            return;
        }
        userState.userAddress = user.get('ethAddress') ?? '';
    }, [user]);
    useEffect(() => {
        const getUserBalances = async () => {
            if (!user) {
                return;
            }
            const options = { chain: 'avalanche', address: user.get('ethAddress') };
            try {
                const tokenBalances = await Promise.all([
                    Moralis.Web3API.account.getTokenBalances(options),
                    Moralis.Web3API.account.getNativeBalance(options),
                ]);
                userBalanceStore.tokens = tokenBalances[0];
                userBalanceStore.native = tokenBalances[1].balance;
            }
            catch (err) {
                console.error('error in fetching user balances');
            }
        };
        getUserBalances();
    }, [user]);
    const swapStateSnap = useSnapshot(swapState);
    const userStateSnap = useSnapshot(userState);
    const swapTokens = async () => {
        const currentOffer = swapOfferState.yakOffer;
        if (!currentOffer) {
            return;
        }
        swapState.swapLoading = true;
        const slippage = swapSettings.slippage * 100;
        const offerWithSlippage = {
            ...currentOffer,
            amounts: currentOffer.amounts.map((amount, index) => index === 0
                ? Web3.utils.toBN(amount).toString()
                : Web3.utils
                    .toBN(amount)
                    .mul(Web3.utils.toBN(10000 - slippage))
                    .div(Web3.utils.toBN('10000'))
                    .toString()),
        };
        const payload = {
            trade: offerWithSlippage,
            fromAVAX: swapState.tokenIn.address === ZERO_ADDRESS,
            toAVAX: swapState.tokenOut.address === ZERO_ADDRESS,
        };
        try {
            await swap(payload);
        }
        finally {
            swapState.swapLoading = false;
        }
    };
    const inputTokenUserBalance = userBalanceStore.tokens.find((v) => v.token_address.toLowerCase() === swapState.tokenIn.address.toLowerCase());
    return (_jsx(_Fragment, { children: isAuthenticated ? (Number(userStateSnap.chainId) !== AVALANCHE_CHAIN_ID ? (_jsx("button", { disabled: true, className: "btn w-full btn-disabled", children: "Wrong network" }, void 0)) : Number(swapStateSnap.tokenIn.address === ZERO_ADDRESS
            ? formatTokenBalance(userBalancesSnap.native, '18')
            : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals)) >= swapStateSnap.amountIn ? (_jsx("button", { onClick: swapTokens, className: classNames('btn w-full btn-primary', swapStateSnap.swapLoading === true ? 'loading' : null), disabled: !!swapStateSnap.loading, children: "Swap" }, void 0)) : (_jsx("button", { disabled: true, className: "btn w-full btn-disabled", children: "Insufficient funds" }, void 0))) : (_jsx("button", { onClick: () => authenticate(), className: classNames('btn w-full btn-ghost', {
                loading: isAuthenticating,
            }), children: "Connect wallet" }, void 0)) }, void 0));
};
export default SwapCardButton;
