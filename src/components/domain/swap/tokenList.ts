import TokenList from '~/assets/tokenlist/defi.tokenlist.json';

export const tokenList = TokenList.tokens.map((token) => ({
  ...token,
  value: token.symbol,
  label: token.name,
}));

export type TokenType = typeof tokenList[number];
export type TokenListType = typeof tokenList;
