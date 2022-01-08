import TokenList from '~/assets/tokenlist/defi.tokenlist.json';

export interface IYakOffer {
  adapters: string[];
  amounts: string[];
  gasEstimate: string;
  path: string[];
}

export type YakTokenType = typeof TokenList.tokens[number];
