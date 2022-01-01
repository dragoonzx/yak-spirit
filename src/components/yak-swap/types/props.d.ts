import { TokenType } from '../api/tokenList.js';
/**
 * Properties for the `Swap` Component.
 */
export declare type SwapProps = {
    /**
     * If true, then go to coingecko API for usd prices
     * @default true
     */
    showUsdPrices?: boolean;
    /**
     * Callback on token change
     */
    onTokenChange?: (newToken: TokenType) => void;
    /**
     * Callback on amountIn change
     */
    onAmountInChange?: (newAmountIn: number) => void;
    /**
     * Callback when new offer received from YY Router
     */
    onOfferReceive?: (newOffer: any) => void;
    /**
     * Callback when quotes loading
     */
    onQuotesLoading?: (isLoading: boolean) => void;
    /**
     * Callback when swap settings change
     */
    onSettingsChange?: (settings: any) => void;
    /**
     * Token list providing information for tokens used.
     * @default tokenList from yak-spirit
     */
    tokenList?: TokenType[];
    /**
     * Wallet address to which referral fees are sent (i.e. a SOL address).
     * To receive referral fees, the wallet must *own* associated token
     * accounts for the token in which the referral is paid  (usually USDC
     * or USDT).
     */
    referral?: any;
    /**
     * The initial amount for the `fromMint` to use when the component first
     * renders.
     */
    fromAmount?: number;
    /**
     * The initial amount for the `toMint` to use when the component first
     * renders.
     */
    toAmount?: number;
};
