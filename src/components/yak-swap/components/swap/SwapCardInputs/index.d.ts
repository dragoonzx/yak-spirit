/// <reference types="react" />
import { TokenListType, TokenType } from '../../../api/tokenList.js';
interface ISwapCardInputsProps {
    isSend?: boolean;
    tokenList: TokenListType;
    usdPrices?: any;
    onTokenChange?: (newToken: TokenType) => void;
    onAmountInChange?: (newAmount: number) => void;
    showUsdPrices?: boolean;
}
declare const SwapCardInputs: ({ isSend, tokenList, usdPrices, onTokenChange, onAmountInChange, showUsdPrices, }: ISwapCardInputsProps) => JSX.Element;
export default SwapCardInputs;
