import { state, useSnapshot } from '~/state';
import SpiritLoader from '~/components/shared/SpiritLoader';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCallback, useEffect, useState } from 'react';
import { COINGECKO_API, WAVAX } from '~/utils/constants';
import classNames from 'classnames';
import { ZERO_ADDRESS } from '~/components/yak-swap/utils/constants';

type PriceDataType = [number, number][];
type TokenChartPriceData = {
  name: string;
  uv: number;
}[];
type ChartPricesData = {
  tokenIn: TokenChartPriceData;
  tokenOut: TokenChartPriceData;
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) => {
  if (active && payload && payload.length) {
    const name = payload[0].payload?.name;

    if (!name) {
      return null;
    }

    return (
      <div className="rounded px-2 bg-primary">
        <p className="label">{name}</p>
      </div>
    );
  }

  return null;
};

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const getTimestampDaysAgo = (n: number) => {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - n);
  return Number(timestamp);
};

const getCoingeckoUrl = (tokenAddress: string, daysAgo: number = 3) => {
  return `${COINGECKO_API}/coins/avalanche/contract/${tokenAddress}/market_chart/range?vs_currency=usd&from=${(
    getTimestampDaysAgo(daysAgo) / 1000
  ).toFixed()}&to=${(Date.now() / 1000).toFixed()}`;
};

const SwapChart = () => {
  const {
    loadingQuotes,
    swapInfo: { tokens: tokensSnap },
  } = useSnapshot(state);
  const {
    swapInfo: { tokens },
  } = state;

  const [pricesData, setPricesData] = useState<ChartPricesData>({
    tokenIn: [],
    tokenOut: [],
  });
  const [formattedData, setFormattedData] = useState<TokenChartPriceData>([]);

  const [errorFetching, setErrorFetching] = useState(false);

  const getChartData = async (tokenInAddress: string, tokenOutAddress: string) => {
    setErrorFetching(false);

    tokenInAddress = tokenInAddress === ZERO_ADDRESS ? WAVAX : tokenInAddress;
    tokenOutAddress = tokenOutAddress === ZERO_ADDRESS ? WAVAX : tokenOutAddress;

    try {
      const resArr = await Promise.all([
        fetch(getCoingeckoUrl(tokenInAddress)),
        fetch(getCoingeckoUrl(tokenOutAddress)),
      ]);
      const data = (await Promise.all(resArr.map(async (res) => await res.json()))) as unknown as [
        {
          prices: PriceDataType;
        },
        {
          prices: PriceDataType;
        }
      ];

      const pricesIn = data[0]?.prices;
      const pricesOut = data[1]?.prices;

      const formattedPrices = [pricesIn, pricesOut].map((prices) =>
        prices.map(([ts, quote]) => ({
          name: new Date(ts).toLocaleString(),
          uv: quote,
        }))
      );
      if (!(formattedPrices && formattedPrices[0].length)) {
        return;
      }
      setPricesData({
        tokenIn: formattedPrices[0],
        tokenOut: formattedPrices[1],
      });

      const formattedData = formattedPrices[0].map((price, i) => {
        return {
          name: price.name,
          uv: price.uv / formattedPrices[1][i].uv,
        };
      });

      setFormattedData(formattedData);
      setCurPrice(formattedData[formattedData.length - 1].uv);
    } catch (err) {
      console.error(err);
      setErrorFetching(true);
    }
  };

  useEffect(() => {
    // const WAVAX = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7';
    // const YAK = '0x59414b3089ce2af0010e7523dea7e2b35d776ec7';
    if (!(tokens.tokenIn.address && tokens.tokenOut.address)) {
      return;
    }

    getChartData(tokens.tokenIn.address, tokens.tokenOut.address);
  }, [tokens]);

  const [curPrice, setCurPrice] = useState(0);
  const [diffPercent, setDiffPercent] = useState(0);

  useEffect(() => {
    if (!(formattedData && formattedData.length)) {
      return;
    }

    const percents = (formattedData[formattedData.length - 1].uv * 100) / formattedData[0].uv - 100;
    setDiffPercent(Number(percents.toFixed(2)));
  }, [formattedData]);

  const handleMouseMove = (payload: any) => {
    const activePayload = payload.activePayload;
    if (activePayload && activePayload[0]) {
      const currentPrice = activePayload[0].value;
      setCurPrice(currentPrice);
    } else {
      const currentPrice = formattedData[formattedData.length - 1]?.uv;
      setCurPrice(currentPrice);
    }
  };

  const handleMouseLeave = () => {
    if (!(curPrice && formattedData.length)) {
      return;
    }

    const currentPrice = formattedData[formattedData.length - 1]?.uv;
    setCurPrice(currentPrice);
  };

  const [formatType, setFormatType] = useState(0);

  const formats = [
    `${tokens.tokenIn.symbol} / ${tokens.tokenOut.symbol}`,
    `${tokens.tokenOut.symbol} / ${tokens.tokenIn.symbol}`,
    `${tokens.tokenIn.symbol} / USD`,
    `${tokens.tokenOut.symbol} / USD`,
  ];

  const setDefaultFormattedData = () => {
    const formattedData = pricesData.tokenIn.map((price, i) => {
      return {
        name: price.name,
        uv: price.uv / pricesData.tokenOut[i].uv,
      };
    });

    setFormattedData(formattedData);
    setCurPrice(formattedData[formattedData.length - 1].uv);
  };

  const setReversedFormattedData = () => {
    const formattedData = pricesData.tokenOut.map((price, i) => {
      return {
        name: price.name,
        uv: price.uv / pricesData.tokenIn[i].uv,
      };
    });

    setFormattedData(formattedData);
    setCurPrice(formattedData[formattedData.length - 1].uv);
  };

  const setTokenInToUsdFormattedData = () => {
    const formattedData = pricesData.tokenIn;

    setFormattedData(formattedData);
    setCurPrice(formattedData[formattedData.length - 1].uv);
  };

  const setTokenOutToUsdFormattedData = () => {
    const formattedData = pricesData.tokenOut;

    setFormattedData(formattedData);
    setCurPrice(formattedData[formattedData.length - 1].uv);
  };

  useEffect(() => {
    if (!(pricesData.tokenIn.length || pricesData.tokenOut.length)) {
      return;
    }

    switch (formatType) {
      case 0:
        setDefaultFormattedData();
        break;
      case 1:
        setReversedFormattedData();
        break;
      case 2:
        setTokenInToUsdFormattedData();
        break;
      case 3:
        setTokenOutToUsdFormattedData();
        break;
    }
  }, [formatType]);

  const changeFormat = (i: number) => {
    setFormatType(i);
  };

  const renderLineChart = useCallback(() => {
    return formattedData.length ? (
      <ResponsiveContainer>
        <AreaChart
          data={formattedData}
          height={150}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#42de81" stopOpacity="0.1" />
              <stop offset="95%" stopColor="#09162E" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <YAxis hide type="number" domain={['dataMin', 'dataMax']} />
          <Tooltip content={(props) => <CustomTooltip {...props} />} />
          <Area type="natural" dataKey="uv" stroke="#42de81" fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    ) : null;
  }, [formattedData]);

  // AVAX / USD = k1 YAK / USD = k2 => USD = YAK / k => AVAX / YAK = k1 / k2
  return (
    <div className="card shadow-lg bg-base-200/100">
      <div className="card-body">
        <h2 className="font-bold -mt-4 flex items-center" style={helperStyle}>
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-sm text-sm">
              {formats[formatType]}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {!errorFetching && (
              <ul tabIndex={0} id="dropdown" className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                {formats.map((el, i) => (
                  <li key={i} className="text-xs">
                    <a onClick={() => changeFormat(i)}>
                      {el}
                      {formatType === i && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2 text-success"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errorFetching && (
            <div data-tip="no data" className="tooltip tooltip-bottom ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          {loadingQuotes && <SpiritLoader size="small" className="-mt-2" />}
        </h2>
        <div className={classNames('duration-300 transition-all', errorFetching ? 'h-0 opacity-0' : 'h-52 opacity-1')}>
          {!!formattedData.length && (
            <div className="mt-2 flex items-center">
              <p className="font-bold text-xl">{curPrice}</p>
              <span className={classNames('ml-2 text-xs', diffPercent > 0 ? 'text-success' : 'text-error')}>
                {diffPercent}% (past 3 days)
              </span>
            </div>
          )}
          <div className="flex items-end overflow-x-auto mt-2" style={{ width: '100%', height: 150 }}>
            {renderLineChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapChart;
