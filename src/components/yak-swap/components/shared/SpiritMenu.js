import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
const SpiritMenu = ({ menuBtn, menuItems }) => {
    return (_jsxs(Menu, { as: "div", className: "relative inline-block text-left", children: [_jsx("div", { children: _jsx(Menu.Button, { className: "btn btn-ghost btn-sm rounded-btn", children: menuBtn }, void 0) }, void 0), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95", children: _jsx(Menu.Items, { className: "absolute overflow-y-auto max-h-48 z-20 right-0 w-56 mt-2 origin-top-right bg-base-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", children: menuItems }, void 0) }, void 0)] }, void 0));
};
export default SpiritMenu;
