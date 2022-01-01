import { jsx as _jsx } from "react/jsx-runtime";
import { tokenList } from './api/tokenList.js';
import { SwapCard } from './components/swap/SwapCard/index.js';
// import './index.css';
/**
 * A`Swap` component that can be embedded into applications. To use,
 * one should install all prerequisite libraries and setup
 * For example,
 *
 * ```javascript
 * <YakSwap />
 * ```
 *
 * All of the complexity of communicating with the YY Router and managing
 * its data is handled internally by the component.
 *
 * For information on other properties like earning referrals, see the
 * [[SwapProps]] documentation.
 */
export default function YakSwap(props) {
    return _jsx(SwapCard, { ...props, tokenList: props.tokenList ?? tokenList, showUsdPrices: props.showUsdPrices ?? true }, void 0);
}
