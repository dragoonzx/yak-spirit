import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';

const SpiritMenu = ({ menuBtn, menuItems }: { menuBtn: ReactElement; menuItems: ReactElement }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="btn btn-ghost btn-sm rounded-btn">{menuBtn}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute overflow-y-auto max-h-48 z-20 right-0 w-56 mt-2 origin-top-right bg-base-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SpiritMenu;
