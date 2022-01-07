import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { state } from '~/state';
import RouterABI from '~/abis/IUnilikeAVAXRouter.json';
import YakRouterABI from '~/abis/YakRouter.json';
import { ADDRESSES, AVALANCHE_CHAIN_ID, WAVAX } from '~/utils/constants';
import { BigNumber } from 'bignumber.js';
import { IYakOffer } from '~/types/yak';

const web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc') || window.ethereum);
const userAddress = state.user?.get('ethAddress');

const chainId = AVALANCHE_CHAIN_ID;
const provider = web3;

const routers = ADDRESSES.routers;
const yakRouterAddress = ADDRESSES.helpers.yakRouter;
const platform = 'Yield Yak';
const gasPrice = 225;
const maxSteps = 3;

export const fetchOnchainPrices = async (payload: { fromToken: string; toToken: string; amountIn: BigNumber }) => {
  if (chainId && provider) {
    const { fromToken, toToken, amountIn } = payload;

    const prices: {
      platform: string;
      amountOut: string | BigNumber;
      yakOffer?: IYakOffer;
    }[] = await Promise.all(
      routers.map(async (router) => {
        let amountOut;
        const routerContract = new web3.eth.Contract(RouterABI as AbiItem[], router.address, {
          from: userAddress,
        });

        try {
          const path = [fromToken, toToken];
          const amountsOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
          amountOut = amountsOut[amountsOut.length - 1];
        } catch {
          amountOut = new BigNumber('0');
        }

        if (fromToken.toLowerCase() !== WAVAX.toLowerCase() && toToken.toLowerCase() !== WAVAX.toLowerCase()) {
          try {
            const path = [fromToken, WAVAX, toToken];
            const amountsOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
            const tmpAmountOut = amountsOut[amountsOut.length - 1];
            amountOut = new BigNumber(amountOut).gt(new BigNumber(tmpAmountOut)) ? amountOut : tmpAmountOut;
          } catch {}
        }

        return {
          platform: router.platform,
          amountOut,
        };
      })
    );

    try {
      const yakOffer = await fetchYakOffer(payload);
      prices.push({
        platform,
        amountOut: yakOffer.amounts[yakOffer.amounts.length - 1],
        yakOffer,
      });
    } catch (err) {
      console.error(err);
    }

    return prices;
  }
};

const fetchYakOffer = async (payload: { fromToken: string; toToken: string; amountIn: BigNumber }) => {
  if (chainId && provider) {
    const { fromToken, toToken, amountIn } = payload;
    const yakRouterContract = new web3.eth.Contract(YakRouterABI as AbiItem[], yakRouterAddress);

    try {
      const data = await yakRouterContract.methods
        .findBestPathWithGas(amountIn, fromToken, toToken, maxSteps, gasPrice)
        .call();
      return data;
    } catch (err) {
      console.error('fetchOnChainPricesV2', err);
    }
  }
};
