import Moralis from 'moralis';
import { state, userBalanceStore } from '~/state';

export const getUserBalances = async () => {
  const user = state.user?.get('ethAddress');
  if (!user) {
    return;
  }

  const options: { chain: 'avalanche'; address: string } = { chain: 'avalanche', address: user };
  try {
    const tokenBalances = await Promise.all([
      Moralis.Web3API.account.getTokenBalances(options),
      Moralis.Web3API.account.getNativeBalance(options),
    ]);
    console.log(tokenBalances);
    userBalanceStore.tokens = tokenBalances[0];
    userBalanceStore.native = tokenBalances[1].balance;
  } catch (err) {
    console.error(err);
  }
};
