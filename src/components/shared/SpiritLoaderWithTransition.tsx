import React from 'react';
import { Transition } from 'react-transition-group';
import SpiritLoader from './SpiritLoader';

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

const SpiritLoaderWithTransition = ({ visible }: { visible: boolean }) => {
  return (
    <Transition in={visible} timeout={duration}>
      {(state) => (
        <div
          className="-mt-2"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <SpiritLoader size="small" />
        </div>
      )}
    </Transition>
  );
};

export default SpiritLoaderWithTransition;
