import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { fetchOnchainPrices } from '~/api/fetchPrices';
import { tokenList as defaultTokenList } from '~/api/tokenList';
import { ethers, BigNumber } from 'ethers';
import { useDebounce } from 'react-use';
import { WAVAX, YIELD_YAK_PLATFORM, ZERO_ADDRESS } from '~/utils/constants';
import { SwapProps } from '~/types/props';
import SwapCardHeader from '../SwapCardHeader';
import SwapCardFooter from '../SwapCardFooter';
import SwapCardButton from '../SwapCardButton';
import SwapCardInputs from '../SwapCardInputs';
import SwapCardInputsSwapper from '../SwapCardInputsSwapper';
import { swapOfferState, swapSettings, swapState, syncState, useSnapshot } from '~/state';
import { getUsdPrices } from '~/api/getUsdPrices';

export const SwapCard = (props: SwapProps) => {
  // const { data: avgGasArr } = useMoralisCloudFunction('getAvgGas');
  const tokenList = props.tokenList ?? defaultTokenList;

  const [usdPrices, setUsdPrices] = useState<Record<string, Record<'usd', number>> | null>(null);

  const [gasEstimate, setGasEstimate] = useState<string>('');

  const getPrices = useCallback(async () => {
    swapState.loading = true;
    props.onQuotesLoading && props.onQuotesLoading(true);
    syncState.sync = false;

    if (!swapState.amountIn) {
      swapState.loading = false;
      props.onQuotesLoading && props.onQuotesLoading(false);
      syncState.sync = true;
      return;
    }

    const x = await fetchOnchainPrices({
      fromToken: swapState.tokenIn.address === ZERO_ADDRESS ? WAVAX : swapState.tokenIn.address,
      toToken: swapState.tokenOut.address === ZERO_ADDRESS ? WAVAX : swapState.tokenOut.address,
      amountIn: BigNumber.from(ethers.utils.parseUnits(String(swapState.amountIn), swapState.tokenIn.decimals)),
    });

    const results = x!.map((v) => {
      return {
        ...v,
        formattedAmountOut: !v.amountOut.isZero()
          ? // TODO: check small numbers
            ethers.utils.formatUnits(v.amountOut, swapState.tokenOut.decimals).slice(0, 10)
          : 0,
      };
    });
    props.onOfferReceive &&
      props.onOfferReceive({
        tokens: {
          tokenIn: swapState.tokenIn,
          tokenOut: swapState.tokenOut,
        },
        results,
      });

    const amountOutValues = results.map((v) => Number(v.formattedAmountOut));

    swapState.amountOut = Math.max(...amountOutValues);

    results.sort((dexA, dexB) => Number(dexB.formattedAmountOut) - Number(dexA.formattedAmountOut));

    const yakOffer = x?.find((v) => v.platform === YIELD_YAK_PLATFORM)?.yakOffer;
    swapOfferState.yakOffer = yakOffer;

    yakOffer?.gasEstimate && setGasEstimate(yakOffer.gasEstimate);

    const prices = await getUsdPrices(swapState.tokenIn.address, swapState.tokenOut.address);
    setUsdPrices(prices);

    syncState.timerKey += 1;
    syncState.sync = true;
    swapState.loading = false;
    props.onQuotesLoading && props.onQuotesLoading(false);
  }, [
    props.onQuotesLoading,
    swapState.tokenIn,
    swapState.tokenOut,
    swapState.amountIn,
    swapState.amountOut,
    props.onOfferReceive,
  ]);

  const swapSnap = useSnapshot(swapState);
  const swapSettingsSnap = useSnapshot(swapSettings);

  const getSyncPrices = useCallback((): [boolean, number] => {
    swapSettings.sync && getPrices();
    return [false, 0];
  }, [getPrices, swapSettings.sync]);

  useEffect(() => {
    syncState.sync = swapSettings.sync;
  }, [swapSettingsSnap.sync]);

  const [,] = useDebounce(
    async () => {
      await getPrices();
    },
    200,
    [swapSnap.tokenIn, swapSnap.tokenOut, swapSnap.amountIn, swapSettingsSnap.routers, swapSettingsSnap.slippage]
  );

  const marketPrice = usdPrices
    ? swapState.amountIn *
      usdPrices[
        swapState.tokenIn.address.toLowerCase() === ZERO_ADDRESS
          ? WAVAX.toLowerCase()
          : swapState.tokenIn.address.toLowerCase()
      ]?.usd
    : null;
  const receivedPrice = useMemo(() => {
    return usdPrices
      ? swapState.amountOut *
          usdPrices[
            swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
              ? WAVAX.toLowerCase()
              : swapState.tokenOut.address.toLowerCase()
          ]?.usd
      : null;
  }, [swapState.amountOut, usdPrices]);

  const priceImpact = useMemo(() => {
    return marketPrice && receivedPrice ? (1 - receivedPrice / marketPrice) * 100 : 0;
  }, [receivedPrice]);

  const [gasPrice, setGasPrice] = useState(0);
  useEffect(() => {
    if (!usdPrices) {
      return;
    }

    const avgGas = 40;

    // const avgGasSum = (avgGasArr as any[]).reduce((prev, cur) => prev + cur.avgGas, 0);
    // const avgGas = avgGasSum / (avgGasArr as any[]).length;

    const gasInAVAX = Number(gasEstimate) * avgGas * 10 ** -9;
    setGasPrice(gasInAVAX);
  }, [usdPrices, gasEstimate]);

  return (
    <div className="card overflow-visible shadow-lg bg-base-200/100 w-full">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6 -mt-4">
          <SwapCardHeader getSyncPrices={getSyncPrices} onSettingsChange={props.onSettingsChange} />
        </div>
        <div className="mb-4 space-x-2">
          <SwapCardInputs
            isSend
            tokenList={tokenList}
            onTokenChange={props.onTokenChange}
            onAmountInChange={props.onAmountInChange}
            usdPrices={usdPrices}
            showUsdPrices={props.showUsdPrices}
          />
        </div>
        <div className="flex items-center justify-center relative h-12">
          <SwapCardInputsSwapper />
        </div>
        <div className="mb-10 space-x-2">
          <SwapCardInputs
            tokenList={tokenList}
            onTokenChange={props.onTokenChange}
            onAmountInChange={props.onAmountInChange}
            usdPrices={usdPrices}
            showUsdPrices={props.showUsdPrices}
          />
        </div>
        <div className="w-full">
          <SwapCardButton />
        </div>
        <div className="mt-4">
          <SwapCardFooter
            priceImpact={priceImpact}
            gasPrice={gasPrice}
            usdPrices={usdPrices}
            showUsdPrices={props.showUsdPrices}
          />
        </div>
      </div>
    </div>
  );
};
