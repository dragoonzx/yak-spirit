import classNames from 'classnames';
import { Head } from '~/components/shared/Head';
import { appSettings, useSnapshot } from '~/state';
import SwapExchanges from '../domain/exchanges/SwapExchanges';
import SwapRouting from '../domain/routing/SwapRouting';
import { SwapCard } from '../domain/swap/SwapCard';

function Index() {
  const { visibility } = useSnapshot(appSettings);

  const onlySwapVisible = !(visibility.exchanges || visibility.routing);

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
          <SwapCard />
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
