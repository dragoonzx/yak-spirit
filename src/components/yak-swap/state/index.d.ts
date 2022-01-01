import { useSnapshot, subscribe } from 'valtio';
import { IYakOffer } from '../types/yak.js';
import { TokenType } from '../api/tokenList.js';
interface ISyncState {
    timerKey: number;
    sync: boolean;
}
export declare const syncState: ISyncState;
interface ISwapState {
    tokenIn: TokenType;
    tokenOut: TokenType;
    amountIn: number;
    amountOut: number;
    loading: boolean;
    swapLoading: boolean;
}
export declare const swapState: ISwapState;
interface ISwapOfferState {
    yakOffer?: IYakOffer | null;
}
export declare const swapOfferState: ISwapOfferState;
interface IUserState {
    chainId: number;
    userAddress: string;
    balances: {
        native: string;
        tokens: any[];
    };
}
export declare const userState: IUserState;
interface IUserBalanceStore {
    native: string;
    tokens: {
        token_address: string;
        name: string;
        symbol: string;
        logo?: string | undefined;
        thumbnail?: string | undefined;
        decimals: string;
        balance: string;
    }[];
}
export declare const userBalanceStore: IUserBalanceStore;
interface ISwapSettings {
    slippage: number;
    routers: string[];
}
export declare const swapSettings: ISwapSettings;
export { useSnapshot, subscribe };
