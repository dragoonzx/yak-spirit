import classNames from 'classnames';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import SpiritPopover from '~/components/shared/SpiritPopover';
import { swapSettings, useSnapshot } from '~/state';
import { ADDRESSES } from '~/utils/constants';

const slippages = [0.1, 0.2, 1];

const SwapSettings = ({ btnStyle }: { btnStyle: any }) => {
  const snap = useSnapshot(swapSettings);

  const slippageChange = (v: number) => {
    setCustomSlippageMode(false);
    swapSettings.slippage = v;
  };

  const adaptersChange = (v: string) => {
    swapSettings.adapters.includes(v)
      ? (swapSettings.adapters = swapSettings.adapters.filter((adapter) => adapter !== v))
      : swapSettings.adapters.push(v);
  };

  const customSlippage = !slippages.includes(swapSettings.slippage);

  const [customSlippageMode, setCustomSlippageMode] = useState(false);

  const toggleCustomSlippage = () => {
    setCustomSlippageMode(true);
  };

  const btn = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  );

  const content = (
    <div className="overflow-hidden rounded-lg shadow-lg w-70 ring-1 ring-black ring-opacity-5">
      <div className="relative flex flex-col w-full p-7 lg:grid-cols-2 text-base-content">
        <div className="mb-4">
          <p className="text-sm mb-2">Slippage tolerance</p>
          <div className="btn-group">
            {slippages.map((v) => (
              <button
                key={v}
                onClick={() => slippageChange(v)}
                className={classNames(
                  'btn btn-sm',
                  snap.slippage === v && !customSlippage && !customSlippageMode ? 'btn-active' : null
                )}
              >
                {v}%
              </button>
            ))}
            {/* <button className="btn btn-sm btn-active">0.1%</button>
            <button className="btn btn-sm">0.2%</button>
            <button className="btn btn-sm">1%</button> */}
            {!(customSlippage || customSlippageMode) ? (
              <button onClick={toggleCustomSlippage} className="btn btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            ) : (
              <NumberFormat
                value={swapSettings.slippage}
                className="btn btn-sm btn-active input input-bordered rounded-l-none px-0 w-10 h-full"
                displayType="input"
                allowNegative={false}
                suffix="%"
                onValueChange={(values) => {
                  const { value } = values;
                  if (+value >= 100) {
                    swapSettings.slippage = 99;
                    return;
                  }
                  swapSettings.slippage = +value;
                }}
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm mb-2">Liquidity sources</p>
          <div className=" max-h-32 rounded ring ring-primary overflow-auto">
            {ADDRESSES.routers.map((v) => (
              <div className="p-1 mb-1 card" key={v.platform}>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text">{v.platform}</span>
                    <input
                      type="checkbox"
                      checked={snap.adapters.includes(v.platform)}
                      onChange={() => adaptersChange(v.platform)}
                      className="checkbox"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return <SpiritPopover btn={btn} content={content} btnStyle={btnStyle} />;
};

export default SwapSettings;
