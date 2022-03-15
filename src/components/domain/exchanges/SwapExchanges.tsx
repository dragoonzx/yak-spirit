import { BigNumber, ethers } from 'ethers';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { state, swapOfferState, useSnapshot } from '~/state';
import { DEXES } from '~/utils/constants';
import { get1inchQuotes, getParaswapQuotes } from '~/utils/getAggregatorsQuotes';
import SpiritLoaderWithTransition from '~/components/shared/SpiritLoaderWithTransition';
import { useTranslation } from 'react-i18next';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const SwapExchanges = () => {
  const { t } = useTranslation();
  const snap = useSnapshot(state);

  const [aggregators, setAggregators] = useState<any[]>([]);

  const [loadingAggregators, setLoadingAggregators] = useState(false);

  useEffect(() => {
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
            formattedAmountOut: !BigNumber.from(quote.toTokenAmount).isZero()
              ? // TODO: check small numbers
                ethers.utils.formatUnits(BigNumber.from(quote.toTokenAmount), quote.toToken?.decimals).slice(0, 10)
              : 0,
            aggregator: true,
            origin: quote,
          };
        });
        setAggregators(aggregatorQuotes);
      } catch (err) {
        console.error(err);
        setAggregators([]);
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
    exchangesUnion.sort(
      (dexA, dexB) =>
        Number(dexB.formattedAmountOut) -
        Number(dexA.formattedAmountOut) +
        Number(dexB.platform === 'Yield Yak') / 10000 -
        Number(dexA.platform === 'Yield Yak') / 10000
    );

    setExchanges(exchangesUnion);

    if (!exchangesUnion?.length) {
      return;
    }

    const platform = exchangesUnion[0].platform;
    swapOfferState.type = platform;

    if (platform === 'Yield Yak') {
      swapOfferState.externalOffer = null;
    } else {
      swapOfferState.externalOffer = exchangesUnion[0];
    }
  }, [state.swapInfo.exchanges, aggregators]);

  return (
    <div className="card shadow-lg bg-base-200/100 min-h-full">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          {t('exchanges')}
          {/* {snap.swapInfo.exchanges.length === 0 ? <SpiritLoader size="small" /> : null} */}
          <SpiritLoaderWithTransition visible={snap.loadingQuotes || loadingAggregators} />
          {/* {(snap.loadingQuotes || loadingAggregators) && <SpiritLoader size="small" className="-mt-2" />} */}
        </h2>
        <div className="overflow-x-auto">
          {snap.swapInfo.exchanges.length !== 0 && (
            <table className="table w-full table-zebra">
              <thead className="text-center">
                <tr>
                  <th className="text-left">DEX/Aggregator</th>
                  <th>{t('receive')}</th>
                  <th>{t('diff')}</th>
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
                                  : 'bg-secondary/50 text-secondary-content'
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
      </div>
    </div>
  );
};

export default SwapExchanges;
