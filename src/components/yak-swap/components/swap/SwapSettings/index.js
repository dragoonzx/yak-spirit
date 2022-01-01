import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { useSnapshot } from 'valtio';
import SpiritPopover from '../../../components/shared/SpiritPopover.js';
import { swapSettings } from '../../../state/index.js';
import { ADDRESSES } from '../../../utils/constants.js';
const SwapSettings = ({ btnStyle, onSettingsChange }) => {
    const swapSettingsSnap = useSnapshot(swapSettings);
    useEffect(() => {
        if (!onSettingsChange) {
            return;
        }
        onSettingsChange({
            routers: swapSettings.routers,
            slippage: swapSettings.slippage,
        });
    }, [swapSettings.routers, swapSettings.slippage]);
    const adaptersChange = (v) => {
        swapSettings.routers.includes(v)
            ? (swapSettings.routers = swapSettings.routers.filter((adapter) => adapter !== v))
            : swapSettings.routers.push(v);
    };
    const btn = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }, void 0) }, void 0));
    const content = (_jsx("div", { className: "overflow-hidden rounded-lg shadow-lg w-70 ring-1 ring-black ring-opacity-5", children: _jsxs("div", { className: "relative flex flex-col w-full p-7 lg:grid-cols-2 bg-base-100 text-base-content", children: [_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-sm mb-2", children: "Slippage tolerance" }, void 0), _jsx(NumberFormat, { value: swapSettingsSnap.slippage, className: "input input-bordered border-primary-focus p-2 w-16 h-full", displayType: "input", allowNegative: false, suffix: "%", onValueChange: (values) => {
                                const { value } = values;
                                if (+value >= 100) {
                                    swapSettings.slippage = 99;
                                    return;
                                }
                                swapSettings.slippage = +value;
                            } }, void 0)] }, void 0), _jsxs("div", { className: "mb-4", children: [_jsxs("p", { className: "text-sm mb-2", children: ["Liquidity sources (", swapSettingsSnap.routers.length, "/", ADDRESSES.routers.length, ")"] }, void 0), _jsx("div", { className: "max-h-32 rounded border w-44 border-primary-focus overflow-auto", children: ADDRESSES.routers.map((v) => (_jsx("div", { className: "px-4 mb-1 card", children: _jsx("div", { className: "form-control", children: _jsxs("label", { className: "cursor-pointer label", children: [_jsx("span", { className: "label-text text-md capitalize", children: v.platform }, void 0), _jsx("input", { type: "checkbox", checked: swapSettingsSnap.routers.includes(v.platform), onChange: () => adaptersChange(v.platform), className: "checkbox checkbox-sm" }, void 0)] }, void 0) }, void 0) }, v.platform))) }, void 0)] }, void 0)] }, void 0) }, void 0));
    return _jsx(SpiritPopover, { btn: btn, content: content, btnStyle: btnStyle }, void 0);
};
export default SwapSettings;
