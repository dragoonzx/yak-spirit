import BigNumber from 'bignumber.js';

export const formatTokenBalance = (balance?: string, decimals: string | number = '18') => {
  if (!balance) {
    return null;
  }

  return new BigNumber(balance).times(new BigNumber(10).pow(-decimals)).toString();
};
