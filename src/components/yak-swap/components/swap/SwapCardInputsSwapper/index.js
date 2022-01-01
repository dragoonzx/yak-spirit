import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSnapshot } from 'valtio';
import SpiritLoader from '../../../components/shared/SpiritLoader.js';
import { swapState } from '../../../state/index.js';
const SwapCardInputsSwapper = () => {
    const swapSnap = useSnapshot(swapState);
    const swapSelects = () => {
        const tokenIn = swapState.tokenIn;
        swapState.tokenIn = swapState.tokenOut;
        swapState.tokenOut = tokenIn;
        swapState.amountIn = swapState.amountOut;
        swapState.amountOut = 0;
    };
    return (_jsx(_Fragment, { children: swapSnap.loading ? (_jsx(SpiritLoader, { size: "small" }, void 0)) : (_jsx("button", { onClick: swapSelects, type: "button", className: "btn btn-ghost", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" }, void 0) }, void 0) }, void 0)) }, void 0));
};
export default SwapCardInputsSwapper;
