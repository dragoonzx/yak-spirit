/// <reference types="react" />
import { TokenListType, TokenType } from '../../../api/tokenList.js';
interface ISwapSelectProps {
    token: TokenType;
    setToken: (token: TokenType) => void;
    tokenList: TokenListType;
}
declare const SwapSelect: ({ token, setToken, tokenList }: ISwapSelectProps) => JSX.Element;
export default SwapSelect;
