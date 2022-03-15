import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { swapSettings, swapState } from '~/state';
import { WAVAX, ZERO_ADDRESS } from '~/utils/constants';
import { formatCurrency } from '~/utils/formatters';

interface ISwapCardFooter {
  usdPrices: any;
  priceImpact: any;
  gasPrice: any;
  showUsdPrices?: boolean;
}

const SwapCardFooter = ({ usdPrices, priceImpact, gasPrice, showUsdPrices }: ISwapCardFooter) => {
  const { t } = useTranslation();
  const gasCost = usdPrices ? (gasPrice * usdPrices[WAVAX.toLowerCase()]?.usd).toFixed(2) : 0;
  const minToReceiveUsd = useMemo(() => {
    return usdPrices
      ? usdPrices[
          swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
            ? WAVAX.toLowerCase()
            : swapState.tokenOut.address.toLowerCase()
        ]?.usd *
          swapState.amountOut >
        0
        ? formatCurrency(
            Number(
              (
                usdPrices[
                  swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                    ? WAVAX.toLowerCase()
                    : swapState.tokenOut.address.toLowerCase()
                ]?.usd *
                swapState.amountOut *
                (1 - swapSettings.slippage / 100)
              ).toFixed(8)
            )
          )
        : formatCurrency(
            Number(
              (
                usdPrices[
                  swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                    ? WAVAX.toLowerCase()
                    : swapState.tokenOut.address.toLowerCase()
                ]?.usd *
                swapState.amountOut *
                (1 - swapSettings.slippage / 100)
              ).toPrecision(8)
            )
          )
      : '';
  }, [swapState.amountOut, usdPrices]);

  const minToReceive =
    swapState.amountOut * (1 - swapSettings.slippage / 100) > 0
      ? Number((swapState.amountOut * (1 - swapSettings.slippage / 100)).toFixed(8)).toLocaleString()
      : (swapState.amountOut * (1 - swapSettings.slippage / 100)).toPrecision(8).toLocaleString();
  return (
    <div className="font-light">
      {/* <div className="flex justify-between text-sm">
            <span>Allowed slippage</span>
            <span>
              <span className="font-medium">0.2%</span>
            </span>
          </div> */}
      {/* <div className="flex justify-between text-sm">
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
          </div> */}
      <div className="flex justify-between text-sm">
        <span>{t('priceImpact')}</span>
        <span>
          <span className="flex font-bold">
            {Number(priceImpact.toFixed(4)).toLocaleString()} %{/* <SpiritLoader size="small" /> */}
          </span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t('gasCost')}</span>
        <span>
          {showUsdPrices && <span className="font-light text-xs">~${gasCost}</span>}
          <span className="font-bold ml-2">{Number(gasPrice.toPrecision(2)).toLocaleString()} AVAX</span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t('minReceive')}</span>
        <span>
          {showUsdPrices && (
            <span className="font-light text-xs">
              ~$
              {minToReceiveUsd}
            </span>
          )}
          <span className="font-bold ml-2">
            {' '}
            {minToReceive} {swapState.tokenOut.symbol}
          </span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>{t('serviceFee')}</span>
        <span>
          <span className="font-bold">0</span>
        </span>
      </div>
    </div>
  );
};

export default SwapCardFooter;
