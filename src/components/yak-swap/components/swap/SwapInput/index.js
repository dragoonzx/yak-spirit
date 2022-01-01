import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NumberFormat from 'react-number-format';
const styleInputDisabled = {
    '--tw-border-opacity': 0.1,
    borderColor: 'hsla(var(--bc) / var(--tw-border-opacity, 1))',
};
const SwapInput = ({ amount, setAmount, disabled, setMaxAmount }) => {
    return (_jsxs("div", { className: "form-control h-full w-full relative", children: [_jsx(NumberFormat, { style: disabled ? styleInputDisabled : {}, value: amount, className: "input input-bordered rounded-l-none px-0 pl-4 pr-12 w-full h-full", displayType: "input", allowNegative: false, disabled: disabled, thousandSeparator: ' ', onValueChange: (values) => {
                    const { value } = values;
                    setAmount(+value);
                } }, void 0), _jsx("div", { className: "absolute right-2 top-1/2 -translate-y-1/2", children: _jsx("button", { onClick: setMaxAmount, className: "btn btn-ghost btn-xs", children: "max" }, void 0) }, void 0)] }, void 0));
};
export default SwapInput;
