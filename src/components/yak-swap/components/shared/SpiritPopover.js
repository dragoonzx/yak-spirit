import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
const SpiritPopover = ({ btnStyle = {}, btn, content, }) => {
    return (_jsx(Popover, { className: "relative", children: ({ open }) => (_jsxs(_Fragment, { children: [_jsx(Popover.Button, { className: `
                ${open ? 'bg-primary/40' : ''}
                btn btn-square btn-ghost`, style: btnStyle, children: btn }, void 0), _jsx(Transition, { as: Fragment, enter: "transition ease-out duration-200", enterFrom: "opacity-0 translate-y-1", enterTo: "opacity-100 translate-y-0", leave: "transition ease-in duration-150", leaveFrom: "opacity-100 translate-y-0", leaveTo: "opacity-0 translate-y-1", children: _jsx(Popover.Panel, { className: "absolute z-10 w-64 max-w-sm bg-base-100\trounded-lg px-4 mt-3 right-0 sm:px-0 lg:max-w-3xl", children: content }, void 0) }, void 0)] }, void 0)) }, void 0));
};
export default SpiritPopover;
