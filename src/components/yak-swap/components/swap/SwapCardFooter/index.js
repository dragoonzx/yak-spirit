import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { swapSettings, swapState } from '../../../state/index.js';
import { WAVAX, ZERO_ADDRESS } from '../../../utils/constants.js';
import { formatCurrency } from '../../../utils/formatters.js';
const SwapCardFooter = ({ usdPrices, priceImpact, gasPrice, showUsdPrices }) => {
    const gasCost = usdPrices ? (gasPrice * usdPrices[WAVAX.toLowerCase()]?.usd).toFixed(2) : 0;
    const minToReceiveUsd = useMemo(() => {
        return usdPrices
            ? usdPrices[swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                ? WAVAX.toLowerCase()
                : swapState.tokenOut.address.toLowerCase()]?.usd *
                swapState.amountOut >
                0
                ? formatCurrency(Number((usdPrices[swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                    ? WAVAX.toLowerCase()
                    : swapState.tokenOut.address.toLowerCase()]?.usd *
                    swapState.amountOut *
                    (1 - swapSettings.slippage / 100)).toFixed(8)))
                : formatCurrency(Number((usdPrices[swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                    ? WAVAX.toLowerCase()
                    : swapState.tokenOut.address.toLowerCase()]?.usd *
                    swapState.amountOut *
                    (1 - swapSettings.slippage / 100)).toPrecision(8)))
            : '';
    }, [swapState.amountOut, usdPrices]);
    const minToReceive = swapState.amountOut * (1 - swapSettings.slippage / 100) > 0
        ? Number((swapState.amountOut * (1 - swapSettings.slippage / 100)).toFixed(8)).toLocaleString()
        : (swapState.amountOut * (1 - swapSettings.slippage / 100)).toPrecision(8).toLocaleString();
    return (_jsxs("div", { className: "font-light", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Price impact" }, void 0), _jsx("span", { children: _jsxs("span", { className: "flex font-bold", children: [priceImpact.toFixed(4), " %"] }, void 0) }, void 0)] }, void 0), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Gas cost" }, void 0), _jsxs("span", { children: [showUsdPrices && _jsxs("span", { className: "font-light text-xs", children: ["~$", gasCost] }, void 0), _jsxs("span", { className: "font-bold ml-2", children: [gasPrice.toPrecision(2), " AVAX"] }, void 0)] }, void 0)] }, void 0), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Min. to receive" }, void 0), _jsxs("span", { children: [showUsdPrices && (_jsxs("span", { className: "font-light text-xs", children: ["~$", minToReceiveUsd] }, void 0)), _jsxs("span", { className: "font-bold ml-2", children: [' ', minToReceive, " ", swapState.tokenOut.symbol] }, void 0)] }, void 0)] }, void 0), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Service fee" }, void 0), _jsx("span", { children: _jsx("span", { className: "font-bold", children: "0" }, void 0) }, void 0)] }, void 0)] }, void 0));
};
export default SwapCardFooter;
