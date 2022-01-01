import { state, useSnapshot, useUserBalance } from '~/state';
import SwapSelect from './SwapSelect';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SwapSettings from './SwapSettings';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import classNames from 'classnames';
import { fetchOnchainPrices } from './fetchPrices';
import { toBaseUnit } from '~/utils/toBaseUnit';
import { tokenList, TokenType } from './tokenList';
import SwapInput from './SwapInput';
import { BigNumber } from 'bignumber.js';
import { useDebounce } from 'react-use';
import SpiritLoader from '~/components/shared/SpiritLoader';
import { swap } from './swap';
import { IYakOffer } from '~/types/yak';
import { WAVAX } from '~/utils/constants';
import { formatTokenBalance } from '~/utils/formatters';

const customGhostBtnStyle = {
  paddingLeft: '6px',
  paddingRight: '6px',
  height: '36px',
  minHeight: '26px',
  width: '36px',
};

const YIELD_YAK_PLATFORM = 'Yield Yak';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const getUsdPrices = async (tokenInAddress: string, tokenOutAddress: string) => {
  const addresses = `${tokenInAddress},${tokenOutAddress},${WAVAX.toLowerCase()}`;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/avalanche?contract_addresses=${addresses}&vs_currencies=usd`
  );
  const prices = await res.json();
  console.log(prices);
  return prices;
};

export const SwapCard = () => {
  const { authenticate, isAuthenticating } = useMoralis();
  const { data: avgGasArr } = useMoralisCloudFunction('getAvgGas');

  const snap = useSnapshot(state);
  const userBalances = useUserBalance();

  const [amountIn, setAmountIn] = useState(1);
  const [amountOut, setAmountOut] = useState(0);

  const updateAmount = (amount: number, type: 'in' | 'out') => {
    if (type === 'in') {
      setAmountIn(amount);
    } else {
      setAmountOut(amount);
    }
  };

  const [tokens, setTokens] = useState({
    tokenIn: tokenList.find((v) => v.symbol === 'YAK')!,
    tokenOut: tokenList.find((v) => v.symbol === 'PNG')!,
  });

  const updateToken = (token: TokenType, type: 'in' | 'out') => {
    console.log('updateToken', token);
    const tokenType = type === 'in' ? 'tokenIn' : 'tokenOut';

    setTokens({
      ...tokens,
      [tokenType]: token,
    });
  };

  const [sync, setSync] = useState(true);

  const [currentOffer, setCurrentOffer] = useState<IYakOffer | undefined>();

  const [usdPrices, setUsdPrices] = useState<Record<string, Record<'usd', number>> | null>(null);

  const getPrices = async () => {
    state.loadingQuotes = true;
    setSync(false);

    const { tokenIn, tokenOut } = tokens;

    if (!amountIn) {
      return;
    }

    const x = await fetchOnchainPrices({
      fromToken: tokenIn.address === ZERO_ADDRESS ? WAVAX : tokenIn.address,
      toToken: tokenOut.address === ZERO_ADDRESS ? WAVAX : tokenOut.address,
      // @ts-expect-error: toBN should eat BigNumber
      amountIn: Web3.utils.toBN(toBaseUnit(String(amountIn), tokenIn.decimals)),
    });

    console.log(x);

    const results = x!.map((v) => {
      return {
        ...v,
        amountOut: !new BigNumber(v.amountOut).isZero()
          ? // TODO: check small numbers
            new BigNumber(v.amountOut).div(new BigNumber(10).pow(tokenOut.decimals)).toFixed(2)
          : 0,
      };
    });
    const amountOutValues = results.map((v) => Number(v.amountOut));

    setAmountOut(Math.max(...amountOutValues));

    results.sort((dexA, dexB) => Number(dexB.amountOut) - Number(dexA.amountOut));

    state.swapInfo.tokens = {
      tokenInSymbol: tokenIn.symbol,
      tokenOutSymbol: tokenOut.symbol,
    };
    state.swapInfo.exchanges = results;
    const yakOffer = x?.find((v) => v.platform === YIELD_YAK_PLATFORM)?.yakOffer;
    state.swapInfo.routing = yakOffer;
    setCurrentOffer(yakOffer);

    const prices = await getUsdPrices(tokenIn.address, tokenOut.address);
    setUsdPrices(prices);

    state.loadingQuotes = false;
    setSync(true);
  };

  const [timerKey, setTimerKey] = useState(0);

  const [,] = useDebounce(
    async () => {
      await getPrices();
      setTimerKey(timerKey + 1);
    },
    500,
    [tokens, amountIn]
  );

  const swapSelects = () => {
    setTokens({
      tokenIn: tokens.tokenOut,
      tokenOut: tokens.tokenIn,
    });

    setAmountIn(amountOut);
    setAmountOut(0);
  };

  const getSyncPrices = (): [boolean, number] => {
    // getPrices();
    return [true, 0];
  };

  const swapTokens = async () => {
    if (!currentOffer) {
      return;
    }

    const slippage = 20;

    const offerWithSlippage = {
      ...currentOffer,
      amounts: currentOffer.amounts.map((amount: any, index: any) =>
        index === 0
          ? Web3.utils.toBN(amount).toString()
          : Web3.utils
              .toBN(amount)
              .mul(Web3.utils.toBN(10000 - slippage))
              .div(Web3.utils.toBN('10000'))
              .toString()
      ),
    };

    const payload = {
      trade: offerWithSlippage,
      fromAVAX: tokens.tokenIn.address === ZERO_ADDRESS,
      toAVAX: tokens.tokenOut.address === ZERO_ADDRESS,
    };

    swap(payload);
  };

  const inputTokenUserBalance = userBalances.tokens.find(
    (v) => v.token_address.toLowerCase() === tokens.tokenIn.address.toLowerCase()
  );
  const outputTokenUserBalance = userBalances.tokens.find(
    (v) => v.token_address.toLowerCase() === tokens.tokenOut.address.toLowerCase()
  );

  const marketPrice = usdPrices
    ? amountIn *
      usdPrices[
        tokens.tokenIn.address.toLowerCase() === ZERO_ADDRESS
          ? WAVAX.toLowerCase()
          : tokens.tokenIn.address.toLowerCase()
      ]?.usd
    : null;
  const receivedPrice = usdPrices
    ? amountOut *
      usdPrices[
        tokens.tokenOut.address.toLowerCase() === ZERO_ADDRESS
          ? WAVAX.toLowerCase()
          : tokens.tokenOut.address.toLowerCase()
      ]?.usd
    : null;
  const priceImpact = marketPrice && receivedPrice ? (1 - receivedPrice / marketPrice) * 100 : 0;

  const [gasPrice, setGasPrice] = useState(0);
  useEffect(() => {
    if (!(avgGasArr && usdPrices)) {
      return;
    }

    const avgGasSum = (avgGasArr as any[]).reduce((prev, cur) => prev + cur.avgGas, 0);
    const avgGas = avgGasSum / (avgGasArr as any[]).length;

    const gasInAVAX = Number(state.swapInfo.routing?.gasEstimate) * (avgGas as number) * 10 ** -9;
    setGasPrice(gasInAVAX);
  }, [avgGasArr, usdPrices, state.swapInfo.routing?.gasEstimate]);

  const setMaxAmount = (type: 'in' | 'out') => {
    if (type === 'out') {
      return;
    }

    const balance =
      tokens.tokenIn.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
        ? formatTokenBalance(userBalances.native, '18')
        : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals);

    if (!balance) {
      return;
    }

    setAmountIn(Number(balance));
  };

  return (
    <div className="card overflow-visible shadow-lg bg-base-200/100">
      <div className="card-body">
        <div className="flex items-center justify-between mb-8 -mt-4">
          <h2 className="font-bold">Swap Tokens</h2>
          <div className="flex items-center">
            <button data-tip="sync" type="button" className="btn btn-ghost tooltip mr-1" style={customGhostBtnStyle}>
              <CountdownCircleTimer
                key={timerKey}
                isPlaying={sync}
                duration={12}
                colors={[
                  ['#1eb854', 0.33],
                  ['#1fd65f', 0.33],
                  ['#1eb854', 0.33],
                ]}
                size={18}
                strokeWidth={3}
                onComplete={() => getSyncPrices()}
              />
            </button>
            <SwapSettings btnStyle={customGhostBtnStyle} />
          </div>
        </div>
        <div className="mb-4 space-x-2">
          <div className="w-full">
            <div className="flex justify-between text-sm">
              <span>Send</span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-4 mr-2 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-medium">
                  {tokens.tokenIn.address === ZERO_ADDRESS
                    ? (Number(userBalances.native) * 10 ** -18).toFixed(4)
                    : inputTokenUserBalance
                    ? Number(formatTokenBalance(inputTokenUserBalance.balance, inputTokenUserBalance.decimals)).toFixed(
                        4
                      )
                    : '0.0'}{' '}
                  {snap.swapInfo.tokens.tokenInSymbol}
                </span>
              </span>
            </div>
            <div className="flex h-16 pt-2 relative">
              <SwapSelect tokenList={tokenList} token={tokens.tokenIn} setToken={(token) => updateToken(token, 'in')} />
              <div className="relative w-full">
                <span className="text-xs right-0 -bottom-6 absolute font-light">
                  {usdPrices
                    ? `~$${(
                        usdPrices[
                          tokens.tokenIn.address.toLowerCase() === ZERO_ADDRESS
                            ? WAVAX.toLowerCase()
                            : tokens.tokenIn.address.toLowerCase()
                        ]?.usd * amountIn
                      ).toFixed(2)}`
                    : `~$0`}
                </span>
                <SwapInput
                  amount={amountIn}
                  setMaxAmount={() => setMaxAmount('in')}
                  setAmount={(amount) => updateAmount(amount, 'in')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-12">
          {state.loadingQuotes ? (
            <SpiritLoader size="small" />
          ) : (
            <button onClick={swapSelects} type="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="mb-10 space-x-2">
          <div className="w-full">
            <div className="flex justify-between text-sm">
              <span>Receive</span>
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-4 mr-2 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="font-medium">
                  {tokens.tokenOut.address === ZERO_ADDRESS
                    ? (Number(userBalances.native) * 10 ** -18).toFixed(4)
                    : outputTokenUserBalance
                    ? Number(
                        formatTokenBalance(outputTokenUserBalance.balance, outputTokenUserBalance.decimals)
                      ).toFixed(4)
                    : '0.0'}{' '}
                  {snap.swapInfo.tokens.tokenOutSymbol}
                </span>
              </span>
            </div>
            <div className="flex h-16 pt-2 relative">
              <SwapSelect
                tokenList={tokenList}
                token={tokens.tokenOut}
                setToken={(token) => updateToken(token, 'out')}
              />
              <div className="relative w-full">
                <span className="text-xs right-0 -bottom-6 absolute font-light">
                  {usdPrices
                    ? `~$${(
                        usdPrices[
                          tokens.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                            ? WAVAX.toLowerCase()
                            : tokens.tokenOut.address.toLowerCase()
                        ]?.usd * amountOut
                      ).toFixed(2)}`
                    : `~$0`}
                </span>
                <SwapInput
                  amount={amountOut}
                  setMaxAmount={() => setMaxAmount('out')}
                  setAmount={(amount) => updateAmount(amount, 'out')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {snap.user ? (
            Number(
              tokens.tokenIn.address === ZERO_ADDRESS
                ? formatTokenBalance(userBalances.native, '18')
                : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals)
            ) >= amountIn ? (
              <button onClick={swapTokens} className="btn w-full btn-primary">
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
        </div>
        <div className="mt-4 font-light">
          <div className="flex justify-between text-sm">
            <span>Allowed slippage</span>
            <span>
              <span className="font-medium">0.2%</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span>
              <span className="font-medium">
                {amountOut
                  ? amountIn / amountOut > 0
                    ? (amountIn / amountOut).toFixed(4).toLocaleString()
                    : (amountIn / amountOut).toPrecision(4)
                  : 0}
              </span>{' '}
              {snap.swapInfo.tokens.tokenInSymbol}/{snap.swapInfo.tokens.tokenOutSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Price impact</span>
            <span>
              <span className="font-medium">{priceImpact.toFixed(2)}</span>%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Gas cost</span>
            <span>
              <span className="font-light text-xs mr-2">
                ~${usdPrices ? (gasPrice * usdPrices[WAVAX.toLowerCase()]?.usd).toFixed(2) : 0}
              </span>
              <span className="font-medium">{gasPrice.toPrecision(2)}</span>AVAX
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Min. to receive</span>
            <span>
              <span className="font-light text-xs mr-2">
                ~$
                {usdPrices
                  ? usdPrices[
                      tokens.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                        ? WAVAX.toLowerCase()
                        : tokens.tokenOut.address.toLowerCase()
                    ]?.usd *
                      amountOut >
                    0
                    ? Number(
                        (
                          usdPrices[
                            tokens.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                              ? WAVAX.toLowerCase()
                              : tokens.tokenOut.address.toLowerCase()
                          ]?.usd *
                          amountOut *
                          0.98
                        ).toFixed(2)
                      ).toLocaleString()
                    : (
                        usdPrices[
                          tokens.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                            ? WAVAX.toLowerCase()
                            : tokens.tokenOut.address.toLowerCase()
                        ]?.usd *
                        amountOut *
                        0.98
                      ).toPrecision(4)
                  : ''}
              </span>
              <span className="font-medium">
                {amountOut * 0.98 > 0
                  ? Number((amountOut * 0.98).toFixed(4)).toLocaleString()
                  : (amountOut * 0.98).toPrecision(4).toLocaleString()}
              </span>{' '}
              {snap.swapInfo.tokens.tokenOutSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Yak Spirit fee</span>
            <span>
              <span className="font-medium">0</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
