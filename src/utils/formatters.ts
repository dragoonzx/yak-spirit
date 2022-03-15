import { ethers, BigNumber } from 'ethers';

export const formatTokenBalance = (balance?: string, decimals: string | number = '18') => {
  if (!balance) {
    return null;
  }

  return ethers.utils.formatUnits(BigNumber.from(balance), decimals);
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};
