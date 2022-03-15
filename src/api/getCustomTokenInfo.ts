import ERC20ABI from '~/abis/ERC20ABI.json';
import { AVALANCHE_CHAIN_ID } from '~/utils/constants';
import { ethers } from 'ethers';
import { tokenList } from './tokenList';

const chainId = AVALANCHE_CHAIN_ID;
const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');

export const fetchCustomTokenInfo = async (address: string) => {
  const tokenInList = tokenList.find((v) => v.address.toLowerCase() === address.toLowerCase());

  if (tokenInList) {
    return {
      data: {
        name: tokenInList.name,
        symbol: tokenInList.symbol,
        decimals: tokenInList.decimals,
      },
      type: 'list',
    };
  }

  if (chainId && provider) {
    const erc20Contract = new ethers.Contract(address.toLowerCase(), ERC20ABI, provider);

    try {
      const name = erc20Contract.name();
      const symbol = erc20Contract.symbol();
      const decimals = erc20Contract.decimals();

      const res = await Promise.allSettled([name, symbol, decimals]);

      return {
        data: {
          name: res[0].status === 'fulfilled' ? (res[0].value as string) : '',
          symbol: res[1].status === 'fulfilled' ? (res[1].value as string) : '',
          decimals: res[2].status === 'fulfilled' ? (res[2].value as number) : 0,
        },
        type: 'node',
      };
    } catch (err) {
      console.error('fetchCustomToken', err);
    }
  }
};
