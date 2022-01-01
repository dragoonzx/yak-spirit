import { BigNumber } from 'bignumber.js';
import { IYakOffer } from '../types/yak.js';
export declare const fetchOnchainPrices: (payload: {
    fromToken: string;
    toToken: string;
    amountIn: BigNumber;
}) => Promise<{
    platform: string;
    amountOut: string | BigNumber;
    yakOffer?: IYakOffer | undefined;
}[] | undefined>;
