import { proxy, useSnapshot, subscribe } from 'valtio';
import Moralis from 'moralis';
import { ADDRESSES } from '~/utils/constants';
import { IYakOffer, YakTokenType } from '~/types/yak';
import { tokenList, TokenType } from '~/api/tokenList';
interface ISyncState {
  timerKey: number;
  sync: boolean;
}

export const syncState: ISyncState = proxy({
  timerKey: 0,
  sync: true,
});

interface ISwapState {
  tokenIn: TokenType;
  tokenOut: TokenType;
  amountIn: number;
  amountOut: number;
  loading: boolean;
  swapLoading: boolean;
}

export const swapState: ISwapState = proxy({
  tokenIn: tokenList[0],
  tokenOut: tokenList.find((v) => v.symbol === 'YAK')!,
  amountIn: 1,
  amountOut: 0,
  loading: true,
  swapLoading: false,
});

interface ISwapOfferState {
  yakOffer?: IYakOffer | null;
  type: 'Yield Yak' | '1inch' | 'paraswap';
  externalOffer?: any;
}

export const swapOfferState: ISwapOfferState = proxy({
  yakOffer: null,
  type: 'Yield Yak',
  externalOffer: null,
});

interface IUserState {
  chainId: number;
  userAddress: string;
  balances: {
    native: string;
    tokens: any[];
  };
}

export const userState: IUserState = proxy({
  chainId: 0,
  userAddress: '',
  balances: {
    native: '0',
    tokens: [],
  },
});

interface ISwapSettings {
  slippage: number;
  routers: string[];
  sync: boolean;
}

export const swapSettings: ISwapSettings = proxy({
  slippage: 0.2,
  routers: ADDRESSES.routers.map((v) => v.platform),
  sync: true,
});

interface ISwapInfo {
  tokens: {
    tokenIn: Partial<YakTokenType>;
    tokenOut: Partial<YakTokenType>;
  };
  exchanges: {
    platform: string;
    amountOut: string;
    formattedAmountOut: string;
  }[];
  routing: IYakOffer;
}

interface IState {
  user: Moralis.User<Moralis.Attributes> | null;
  swapInfo: ISwapInfo;
  loadingQuotes: boolean;
}

export const state: IState = proxy({
  user: null,
  swapInfo: {
    exchanges: [],
    tokens: {
      tokenIn: {
        address: '',
        symbol: 'AVAX',
      },
      tokenOut: {
        address: '',
        symbol: 'YAK',
      },
    },
    routing: {
      path: [],
      adapters: [],
      amounts: [],
      gasEstimate: '0',
    },
  },
  loadingQuotes: true,
});

interface IUserBalanceStore {
  native: string;
  tokens: {
    // eslint-disable-next-line camelcase
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
  }[];
}

export const userBalanceStore: IUserBalanceStore = proxy({
  native: '0',
  tokens: [],
});

interface IAppSettings {
  visibility: {
    chart: boolean;
    routing: boolean;
    exchanges: boolean;
  };
}

export const appSettings: IAppSettings = proxy({
  visibility: {
    chart: true,
    routing: true,
    exchanges: true,
  },
});

export const useUserBalance = () => {
  return useSnapshot(userBalanceStore);
};

export { useSnapshot, subscribe };
