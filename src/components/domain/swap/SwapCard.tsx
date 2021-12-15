import { state, useSnapshot } from '~/state';
import SwapSelect from './SwapSelect';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const customGhostBtnStyle = {
  paddingLeft: '6px',
  paddingRight: '6px',
  height: '36px',
  minHeight: '26px',
};

export const SwapCard = () => {
  const snap = useSnapshot(state);

  return (
    <div className="card col-span-5 row-span-3 shadow-lg bg-base-300">
      <div className="card-body">
        <div className="flex justify-end mb-1">
          <button type="button" className="btn btn-ghost mr-1" style={customGhostBtnStyle}>
            <CountdownCircleTimer
              isPlaying
              duration={12}
              colors={[
                ['#1eb854', 0.33],
                ['#1fd65f', 0.33],
                ['#1eb854', 0.33],
              ]}
              size={18}
              strokeWidth={3}
              onComplete={() => [true, 0]}
            />
          </button>
          <button type="button" className="btn btn-ghost" style={customGhostBtnStyle}>
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4 space-x-2">
          <div className="w-full">
            <div className="flex justify-between">
              <span>Send</span>
              <span>Balance: 0.0</span>
            </div>
            <SwapSelect />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="button" className="btn btn-ghost">
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
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>
        <div className="mb-8 space-x-2">
          <div className="w-full">
            <div className="flex justify-between">
              <span>Receive</span>
              <span>Balance: 0.0</span>
            </div>
            <SwapSelect />
          </div>
        </div>
        <div className="w-full">
          {snap.user ? (
            <button className="btn w-full btn-primary">Swap</button>
          ) : (
            <button className="btn w-full btn-disabled">Connect wallet</button>
          )}
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>1 AVAX cost</span>
            <span>
              <span>~$3,836</span> 3,835.8551073 DAI
            </span>
          </div>
          <div className="flex justify-between">
            <span>1 DAI cost</span>
            <span>
              <span>~$1</span> 0.0002607 AVAX
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span>Transaction cost</span>
          <span>0 AVAX</span>
        </div>
      </div>
    </div>
  );
};
