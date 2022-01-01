import { proxy, useSnapshot, subscribe } from 'valtio';
import Moralis from 'moralis';
import { ADDRESSES } from '~/utils/constants';
import { IYakOffer } from '~/types/yak';

interface ISwapInfo {
  tokens: {
    tokenInSymbol: string;
    tokenOutSymbol: string;
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
      tokenInSymbol: 'PNG',
      tokenOutSymbol: 'PNG',
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
    routing: boolean;
    exchanges: boolean;
  };
}

export const appSettings: IAppSettings = proxy({
  visibility: {
    routing: true,
    exchanges: true,
  },
});

interface ISwapSettings {
  slippage: number;
  adapters: string[];
}

export const swapSettings: ISwapSettings = proxy({
  slippage: 0.2,
  adapters: ADDRESSES.routers.map((v) => v.platform),
});

export const useUserBalance = () => {
  return useSnapshot(userBalanceStore);
};

export { useSnapshot, subscribe };
