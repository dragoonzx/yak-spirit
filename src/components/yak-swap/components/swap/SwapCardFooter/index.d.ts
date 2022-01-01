/// <reference types="react" />
interface ISwapCardFooter {
    usdPrices: any;
    priceImpact: any;
    gasPrice: any;
    showUsdPrices?: boolean;
}
declare const SwapCardFooter: ({ usdPrices, priceImpact, gasPrice, showUsdPrices }: ISwapCardFooter) => JSX.Element;
export default SwapCardFooter;
