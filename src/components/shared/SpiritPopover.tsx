import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';

const SpiritPopover = ({
  btnStyle = {},
  btn,
  content,
}: {
  btnStyle?: any;
  btn: ReactElement;
  content: ReactElement;
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? 'bg-primary' : ''}
                btn btn-square btn-ghost`}
            style={btnStyle}
          >
            {btn}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-64 max-w-sm bg-base-200 rounded-lg px-4 mt-3 right-0 sm:px-0 lg:max-w-3xl">
              {content}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SpiritPopover;
