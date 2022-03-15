import TokenList from '~/assets/tokenlist/defi.tokenlist.json';

class TokenListClass {
  public tokenList;

  constructor() {
    let customTokens = [] as typeof TokenList.tokens;

    const customTokensLS = window.localStorage.getItem('custom-tokens');
    if (customTokensLS) {
      customTokens = JSON.parse(customTokensLS).map((v) => {
        v.custom = true;
        return v;
      });
    }

    this.tokenList = [...TokenList.tokens, ...customTokens].map((token) => ({
      ...token,
      value: token.symbol,
      label: token.name,
    }));
  }

  importCustomToken(token: { symbol: string; name: string; address: string; decimals: number }) {
    const customTokensLS = window.localStorage.getItem('custom-tokens');

    if (!customTokensLS) {
      window.localStorage.setItem('custom-tokens', JSON.stringify([token]));
    } else {
      window.localStorage.setItem('custom-tokens', JSON.stringify([...JSON.parse(customTokensLS), token]));
    }

    this.tokenList.push({ ...token, value: token.symbol, label: token.name, chainId: 43114, custom: true });
  }
}

export const TokenListInstance = new TokenListClass();

export const tokenList = TokenListInstance.tokenList;

export type TokenType = typeof tokenList[number];
export type TokenListType = typeof tokenList;
