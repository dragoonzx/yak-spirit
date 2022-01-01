import { proxy, useSnapshot, subscribe } from 'valtio';
import { ADDRESSES } from '../utils/constants.js';
import { tokenList } from '../api/tokenList.js';
export const syncState = proxy({
    timerKey: 0,
    sync: true,
});
export const swapState = proxy({
    tokenIn: tokenList[0],
    tokenOut: tokenList.find((v) => v.symbol === 'YAK'),
    amountIn: 1,
    amountOut: 0,
    loading: true,
    swapLoading: false,
});
export const swapOfferState = proxy({
    yakOffer: null,
});
export const userState = proxy({
    chainId: 0,
    userAddress: '',
    balances: {
        native: '0',
        tokens: [],
    },
});
export const userBalanceStore = proxy({
    native: '0',
    tokens: [],
});
export const swapSettings = proxy({
    slippage: 0.2,
    routers: ADDRESSES.routers.map((v) => v.platform),
});
export { useSnapshot, subscribe };
