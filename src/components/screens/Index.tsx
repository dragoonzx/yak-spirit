import classNames from 'classnames';
import { Head } from '~/components/shared/Head';
import { appSettings, state, useSnapshot } from '~/state';
import SwapExchanges from '../domain/exchanges/SwapExchanges';
import SwapRouting from '../domain/routing/SwapRouting';
// import { SwapCard } from '../domain/swap/SwapCard';
import YakSwap from '../yak-swap';
import { YIELD_YAK_PLATFORM } from '../yak-swap/utils/constants';

function Index() {
  const { visibility } = useSnapshot(appSettings);

  const onlySwapVisible = !(visibility.exchanges || visibility.routing);

  const handleOfferReceive = (offer: any) => {
    console.log(offer);
    // state.swapInfo.tokens = {
    //   tokenInSymbol: tokenIn.symbol,
    //   tokenOutSymbol: tokenOut.symbol,
    // };
    offer.sort((dexA, dexB) => Number(dexB.amountOut) - Number(dexA.amountOut));
    state.swapInfo.exchanges = offer;
    const yakOffer = offer.find((v) => v.platform === YIELD_YAK_PLATFORM)?.yakOffer;
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
        {visibility.routing && (
          <div className="col-span-7 row-span-1">
            <SwapRouting />
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
