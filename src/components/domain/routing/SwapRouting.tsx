import { state, useSnapshot } from '~/state';
import { tokenList } from '~/components/domain/swap/tokenList';
import { ADDRESSES } from '~/utils/constants';
import { Fragment } from 'react';
import SpiritLoader from '~/components/shared/SpiritLoader';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const SwapRouting = () => {
  const snap = useSnapshot(state);

  // adapters - Yak smart contracts
  // amounts - what i receive/have on every step
  // path - tokens in path
  const path = state.swapInfo.routing?.path;
  const adapters = state.swapInfo.routing?.adapters as unknown as (keyof typeof ADDRESSES['adapters'])[];

  return (
    <div className="card shadow-lg bg-base-200/100">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          Routing
          {snap.loadingQuotes && <SpiritLoader size="small" className="-mt-2" />}
        </h2>
        <div className="flex items-end h-24 overflow-x-auto mt-2">
          {path
            ? path.map((token, index) => (
                <Fragment key={token + index}>
                  <div className="flex flex-none items-center mr-6 relative">
                    <img
                      className="h-10 mr-6 rounded"
                      src={tokenList.find((v) => v.address === token)?.logoURI}
                      alt=""
                    />
                    {index !== path.length - 1 && (
                      <div className="relative">
                        <div className="flex absolute left-1/2 -translate-x-1/2 bottom-full mb-2 items-center mr-4">
                          <div className="flex flex-col items-center">
                            <span className="flex items-center rounded bg-base-content/20 btn-xs">
                              {tokenList.find((v) => v.address === path[index + 1])?.symbol}
                            </span>
                            <div className="text-sm capitalize">{ADDRESSES.adapters[adapters[index]]?.platform}</div>
                          </div>
                        </div>
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </Fragment>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SwapRouting;
