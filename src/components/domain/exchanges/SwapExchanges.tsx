import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import SpiritLoader from '~/components/shared/SpiritLoader';
import { state, useSnapshot } from '~/state';
import { DEXES } from '~/utils/constants';
import { get1inchQuotes, getParaswapQuotes } from '~/utils/getAggregatorsQuotes';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const SwapExchanges = () => {
  const snap = useSnapshot(state);

  const [aggregators, setAggregators] = useState<any[]>([]);

  const [loadingAggregators, setLoadingAggregators] = useState(false);

  useEffect(() => {
    console.log('tokens', state.swapInfo.tokens);
    const getAdditionalQuotes = async () => {
      try {
        setLoadingAggregators(true);
        const additionalQuotes = await Promise.all([
          get1inchQuotes({
            fromTokenAddress: state.swapInfo.tokens.tokenIn?.address ?? '',
            toTokenAddress: state.swapInfo.tokens.tokenOut?.address ?? '',
            amount: state.swapInfo.routing.amounts[0],
          }),
          getParaswapQuotes({
            fromTokenAddress: state.swapInfo.tokens.tokenIn?.address ?? '',
            toTokenAddress: state.swapInfo.tokens.tokenOut?.address ?? '',
            amount: state.swapInfo.routing.amounts[0],
            fromTokenDecimals: state.swapInfo.tokens.tokenIn?.decimals ?? 18,
            toTokenDecimals: state.swapInfo.tokens.tokenOut?.decimals ?? 18,
          }),
        ]);

        console.log(additionalQuotes);
        if (!additionalQuotes.length) {
          setAggregators([]);
          setLoadingAggregators(false);
          return;
        }

        const aggregatorQuotes = additionalQuotes.map((quote) => {
          return {
            platform: quote.platform,
            logo: quote.logo,
            link: quote.link,
            amountOut: quote.toTokenAmount,
            formattedAmountOut: !new BigNumber(quote.toTokenAmount).isZero()
              ? // TODO: check small numbers
                new BigNumber(quote.toTokenAmount).div(new BigNumber(10).pow(quote.toToken?.decimals)).toFixed(8)
              : 0,
            aggregator: true,
          };
        });
        setAggregators(aggregatorQuotes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAggregators(false);
      }
    };
    getAdditionalQuotes();
  }, [state.swapInfo.tokens, state.swapInfo.routing.amounts]);

  const [exchanges, setExchanges] = useState<any[]>([]);

  const bestOffer = exchanges[0];

  useEffect(() => {
    if (state.swapInfo.exchanges.length === 0) {
      return;
    }

    const exchangesUnion = [...state.swapInfo.exchanges, ...aggregators];
    exchangesUnion.sort((dexA, dexB) => Number(dexB.formattedAmountOut) - Number(dexA.formattedAmountOut));

    setExchanges(exchangesUnion);
  }, [state.swapInfo.exchanges, aggregators]);

  return (
    <div className="card shadow-lg bg-base-200/100 min-h-full">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          Exchanges
          {/* {snap.swapInfo.exchanges.length === 0 ? <SpiritLoader size="small" /> : null} */}
          {(snap.loadingQuotes || loadingAggregators) && <SpiritLoader size="small" className="-mt-2" />}
        </h2>
        <div className="overflow-x-auto">
          {snap.swapInfo.exchanges.length !== 0 && (
            <table className="table w-full table-zebra">
              <thead className="text-center">
                <tr>
                  <th className="text-left">DEX/Aggregator</th>
                  <th>Receive</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {exchanges.length !== 0
                  ? exchanges.map((exchange, index) => {
                      return Number(exchange.formattedAmountOut) !== 0 ? (
                        <tr key={exchange.platform}>
                          <td>
                            <a
                              href={DEXES[exchange.platform]?.link ?? exchange.link}
                              target="_blank"
                              rel="noreferrer"
                              className="contents"
                            >
                              <div className="flex items-center text-sm">
                                {(exchange.aggregator || DEXES[exchange.platform]?.logo) && (
                                  <img
                                    src={
                                      require(`../../../assets/images/providers/${
                                        exchange.aggregator ? exchange.logo : DEXES[exchange.platform]?.logo
                                      }`).default
                                    }
                                    alt=""
                                    className="h-8 rounded mr-4"
                                  />
                                )}
                                <p className="capitalize">{exchange.platform}</p>
                              </div>
                            </a>
                          </td>
                          <td className="text-sm">{Number(exchange.formattedAmountOut).toLocaleString()}</td>
                          <td>
                            <div
                              className={classNames(
                                'p-1 w-16 text-center text-sm rounded mx-auto',
                                bestOffer.formattedAmountOut === exchange.formattedAmountOut
                                  ? 'bg-primary text-primary-content'
                                  : 'bg-error text-neutral'
                              )}
                            >
                              {bestOffer.formattedAmountOut === exchange.formattedAmountOut
                                ? 'Best'
                                : `-${Number(
                                    (1 -
                                      Number(exchange.formattedAmountOut) / Number(exchanges[0].formattedAmountOut)) *
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
