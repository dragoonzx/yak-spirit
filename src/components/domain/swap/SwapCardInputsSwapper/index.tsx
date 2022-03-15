import { useSnapshot } from 'valtio';
import SpiritLoader from '~/components/shared/SpiritLoader';
import { swapState } from '~/state';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const SwapCardInputsSwapper = () => {
  const swapSnap = useSnapshot(swapState);

  const swapSelects = () => {
    const tokenIn = swapState.tokenIn;
    swapState.tokenIn = swapState.tokenOut;
    swapState.tokenOut = tokenIn;

    swapState.amountIn = swapState.amountOut;
    swapState.amountOut = 0;
  };

  return (
    <>
      <Transition in={swapSnap.loading} timeout={duration}>
        {(state) => (
          <div
            className="absolute"
            style={{
              ...defaultStyle,
              // @ts-expect-error
              ...transitionStyles[state],
            }}
          >
            <SpiritLoader size="small" />
          </div>
        )}
      </Transition>
      <Transition in={!swapSnap.loading} timeout={duration}>
        {(state) => (
          <div
            className="absolute"
            style={{
              ...defaultStyle,
              // @ts-expect-error
              ...transitionStyles[state],
            }}
          >
            <button onClick={swapSelects} disabled={swapSnap.loading} type="button" className="btn btn-ghost">
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
        )}
      </Transition>
    </>
  );
};

export default SwapCardInputsSwapper;
