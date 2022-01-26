import classNames from 'classnames';
import { Head } from '~/components/shared/Head';
import { appSettings, state, useSnapshot } from '~/state';
import SwapChart from '../domain/chart/SwapChart';
import SwapExchanges from '../domain/exchanges/SwapExchanges';
import SwapRouting from '../domain/routing/NewSwapRouting';
// import { SwapCard } from '../domain/swap/SwapCard';
import YakSwap from '@yak-spirit/yak-swap-ui';
import { YIELD_YAK_PLATFORM } from '~/utils/constants';

enum CurrencyType {
  ETH = 'ETH',
  DAI = 'DAI',
  USDC = 'USDC',
  USDT = 'USDT',
}

const fromCurrency = {
  name: 'Ethereum',
  type: CurrencyType.ETH,
  value: 1,
};
const toCurrency = {
  name: 'Dai Stablecoin',
  type: CurrencyType.DAI,
  value: 4106.89,
};

function Index() {
  const { visibility } = useSnapshot(appSettings);

  const onlySwapVisible = Object.values(visibility).every((v) => !v);

  const handleOfferReceive = ({ tokens, results }: any) => {
    console.log(tokens);
    if (
      !(
        tokens.tokenIn.address === state.swapInfo.tokens.tokenIn?.address &&
        tokens.tokenOut.address === state.swapInfo.tokens.tokenOut?.address
      )
    ) {
      state.swapInfo.tokens = {
        tokenIn: tokens.tokenIn,
        tokenOut: tokens.tokenOut,
      };
    }
    results.sort((dexA, dexB) => Number(dexB.formattedAmountOut) - Number(dexA.formattedAmountOut));
    state.swapInfo.exchanges = results;
    const yakOffer = results.find((v) => v.platform === YIELD_YAK_PLATFORM)?.yakOffer;
    state.swapInfo.routing.path = yakOffer.path;
    state.swapInfo.routing.amounts = yakOffer.amounts;
    state.swapInfo.routing.gasEstimate = yakOffer.gasEstimate;
    state.swapInfo.routing.adapters = yakOffer.adapters;
  };

  const handleQuotesLoading = (loading: boolean) => {
    state.loadingQuotes = loading;
  };

  return (
    <>
      <Head />
      <div
        className={classNames(
          'mt-4 p-4 rounded-box',
          onlySwapVisible ? 'flex justify-center' : 'lg:grid grid-cols-12 gap-6'
        )}
      >
        <div className="col-span-5 row-span-3" style={{ gridRowStart: 1, gridRowEnd: 3 }}>
          {/* <SwapCard /> */}
          <YakSwap onOfferReceive={handleOfferReceive} onQuotesLoading={handleQuotesLoading} />
        </div>
        {visibility.chart && (
          <div className="col-span-7 row-span-1">
            <SwapChart />
          </div>
        )}
        {visibility.routing && (
          <div className="col-span-7 row-span-1">
            <SwapRouting from={fromCurrency} to={toCurrency} />
          </div>
        )}
        {visibility.exchanges && (
          <div className="col-start-6 col-span-7" style={{ gridRowEnd: 'span 3' }}>
            <SwapExchanges />
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
