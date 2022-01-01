import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { swapState, userBalanceStore } from '../../../state/index.js';
import { WAVAX, ZERO_ADDRESS } from '../../../utils/constants.js';
import { formatCurrency, formatTokenBalance } from '../../../utils/formatters.js';
import SwapInput from '../SwapInput/index.js';
import SwapSelect from '../SwapSelect/index.js';
const SwapCardInputs = ({ isSend, tokenList, usdPrices, onTokenChange, onAmountInChange, showUsdPrices, }) => {
    const userBalances = useSnapshot(userBalanceStore);
    const swapSnap = useSnapshot(swapState);
    const tokenType = isSend ? 'tokenIn' : 'tokenOut';
    const amountType = isSend ? 'amountIn' : 'amountOut';
    const setMaxAmount = () => {
        if (tokenType === 'tokenOut') {
            return;
        }
        const balance = swapState.tokenIn.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
            ? formatTokenBalance(userBalances.native, '18')
            : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals);
        if (!balance) {
            return;
        }
        swapState.amountIn = Number(balance);
    };
    const inputTokenUserBalance = userBalances.tokens.find((v) => v.token_address.toLowerCase() === swapState[tokenType].address.toLowerCase());
    const inputUsdPrice = useMemo(() => {
        return usdPrices
            ? `$${formatCurrency(Number((usdPrices[swapState[tokenType].address.toLowerCase() === ZERO_ADDRESS
                ? WAVAX.toLowerCase()
                : swapState[tokenType].address.toLowerCase()]?.usd * swapState[amountType]).toFixed(2)))}`
            : `$0`;
    }, [swapState.amountOut, usdPrices]);
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: isSend ? 'Send' : 'Receive' }, void 0), _jsxs("span", { className: "flex items-center", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "inline-block w-4 mr-2 stroke-current", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" }, void 0) }, void 0), _jsxs("span", { className: "font-medium", children: [swapSnap[tokenType].address === ZERO_ADDRESS
                                        ? (Number(userBalances.native) * 10 ** -18).toFixed(4)
                                        : inputTokenUserBalance
                                            ? Number(formatTokenBalance(inputTokenUserBalance.balance, inputTokenUserBalance.decimals)).toFixed(4)
                                            : '0.0', ' ', swapSnap[tokenType].symbol] }, void 0)] }, void 0)] }, void 0), _jsxs("div", { className: "flex h-16 pt-2 relative", children: [_jsx(SwapSelect, { tokenList: tokenList, token: swapSnap[tokenType], setToken: (token) => {
                            swapState[tokenType] = token;
                            onTokenChange && onTokenChange(token);
                        } }, void 0), _jsxs("div", { className: "relative w-full", children: [showUsdPrices && _jsx("span", { className: "text-xs right-0 -bottom-6 absolute font-light", children: inputUsdPrice }, void 0), _jsx(SwapInput, { disabled: tokenType === 'tokenOut', amount: swapSnap[amountType], setMaxAmount: () => setMaxAmount(), setAmount: (amount) => {
                                    swapState[amountType] = amount;
                                    if (amountType === 'amountIn') {
                                        onAmountInChange && onAmountInChange(amount);
                                    }
                                } }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
export default SwapCardInputs;
