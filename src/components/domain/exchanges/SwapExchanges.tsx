import classNames from 'classnames';
import SpiritLoader from '~/components/shared/SpiritLoader';
import { state, useSnapshot } from '~/state';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const DEXES: Record<string, any> = {
  pangolin: {
    title: 'pangolin',
    logo: '/assets/images/providers/pangolin.jpeg',
    link: 'https://pangolin.exchange/',
  },
  zero: {
    title: 'zero',
    logo: '/assets/images/providers/zero.jpeg',
  },
  complus: {
    title: 'complus',
    logo: '/assets/images/providers/complus.png',
    link: 'https://complus.exchange/',
  },
  elk: {
    title: 'elk',
    logo: '/assets/images/providers/elk.jpeg',
    link: 'https://avax.elk.finance/',
  },
  yetiswap: {
    title: 'yetiswap',
    logo: '/assets/images/providers/yetiswap.jpeg',
    link: 'https://www.yetiswap.app/',
  },
  pandaswap: {
    title: 'pandaswap',
    logo: '/assets/images/providers/pandaswap.jpeg',
    link: 'https://www.pandaswap.info/',
  },
  sushi: {
    title: 'sushi',
    logo: '/assets/images/providers/sushi.jpeg',
    link: 'https://sushi.com/',
  },
  olive: {
    title: 'olive',
    logo: '/assets/images/providers/olive.png',
    link: 'https://avax.olive.cash/',
  },
  lydia: {
    title: 'lydia',
    logo: '/assets/images/providers/lydia.jpeg',
    link: 'https://www.lydia.finance/',
  },
  baquette: {
    title: 'baquette',
    logo: '/assets/images/providers/baguette.jpeg',
    link: 'https://baguette.exchange/',
  },
  canary: {
    title: 'canary',
    logo: '/assets/images/providers/canary.jpeg',
    link: 'https://canary.exchange/',
  },
  traderjoe: {
    title: 'traderjoe',
    logo: '/assets/images/providers/traderjoe.jpeg',
    link: 'https://traderjoexyz.com/',
  },
  'Yield Yak': {
    title: 'yak',
    logo: '/assets/images/providers/yak.png',
    link: 'https://yieldyak.com/',
  },
};

const SwapExchanges = () => {
  const snap = useSnapshot(state);

  const bestOffer = snap.swapInfo.exchanges[0];

  return (
    <div className="card shadow-lg bg-base-200/100">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          Exchanges
          {/* {snap.swapInfo.exchanges.length === 0 ? <SpiritLoader size="small" /> : null} */}
          {snap.loadingQuotes && <SpiritLoader size="small" className="-mt-2" />}
        </h2>
        <div className="overflow-x-auto">
          {snap.swapInfo.exchanges.length !== 0 && (
            <table className="table w-full table-zebra">
              <thead className="text-center">
                <tr>
                  <th className="text-left">DEX</th>
                  <th>Receive</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {snap.swapInfo.exchanges.length !== 0
                  ? snap.swapInfo.exchanges.map((exchange, index) => {
                      return exchange.amountOut !== 0 ? (
                        <tr key={exchange.platform}>
                          <td>
                            <a
                              href={DEXES[exchange.platform]?.link}
                              target="_blank"
                              rel="noreferrer"
                              className="contents"
                            >
                              <div className="flex items-center text-sm">
                                <img
                                  src={`/src${DEXES[exchange.platform]?.logo}`}
                                  alt=""
                                  className="h-8 rounded mr-4"
                                />
                                <p className="capitalize">{exchange.platform}</p>
                              </div>
                            </a>
                          </td>
                          <td className="text-sm">{Number(exchange.amountOut).toLocaleString()}</td>
                          <td>
                            <div
                              className={classNames(
                                'p-1 w-16 text-center text-sm rounded mx-auto',
                                bestOffer.amountOut === exchange.amountOut ? 'bg-primary' : 'bg-error/40'
                              )}
                            >
                              {bestOffer.amountOut === exchange.amountOut
                                ? 'Best'
                                : `-${Number(
                                    (1 - Number(exchange.amountOut) / Number(state.swapInfo.exchanges[0].amountOut)) *
                                      100
                                  ).toFixed(2)}%`}
                            </div>
                          </td>
                        </tr>
                      ) : null;
                    })
                  : null}
              </tbody>
            </table>
          )}
        </div>
        {/* {snap.swapInfo.exchanges.length !== 0 ? (
          <div className="flex justify-center btn-group mt-4">
            <button className="btn">Previous</button>
            <button className="btn">1</button>
            <button className="btn btn-active">2</button>
            <button className="btn btn-disabled">...</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
            <button className="btn">Next</button>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default SwapExchanges;
