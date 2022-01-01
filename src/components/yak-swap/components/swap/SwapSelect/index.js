import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import WindowedSelect, { components } from 'react-windowed-select';
import { colourStyles } from './select.styles.js';
const Option = (props) => {
    // TODO: fix rerendering on key nav
    delete props.innerProps.onMouseMove;
    delete props.innerProps.onMouseOver;
    const style = {
        backgroundColor: props.isSelected
            ? 'hsla(var(--p) / var(--tw-bg-opacity,1))'
            : props.isFocused
                ? 'hsla(var(--p) / 0.2)'
                : undefined,
        '&:hover': {
            backgroundColor: 'hsla(var(--pf) / var(--tw-bg-opacity,1))',
        },
    };
    const { logoURI } = props.data;
    const { selectOption, ...rest } = props;
    return (_jsxs("div", { onClick: () => selectOption(props.data), className: "flex items-center cursor-pointer hover:bg-primary-focus p-2", style: style, children: [logoURI && _jsx("img", { src: logoURI, alt: "", className: "h-6 rounded" }, void 0), _jsx("span", { className: logoURI ? 'ml-2' : '', children: _jsx(components.Option, { ...rest }, void 0) }, void 0)] }, void 0));
};
const SwapSelect = ({ token, setToken, tokenList }) => {
    return (_jsxs("div", { className: "w-full relative", children: [_jsx("img", { src: token.logoURI, alt: "", className: "h-6 absolute z-10 top-1/2 left-2 -translate-y-1/2 rounded" }, void 0), _jsx(WindowedSelect, { className: "h-full", value: token, onChange: setToken, components: { Option }, options: tokenList, styles: colourStyles }, void 0)] }, void 0));
};
export default SwapSelect;
