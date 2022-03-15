import RouterABI from '~/abis/IUnilikeAVAXRouter.json';
import YakRouterABI from '~/abis/YakRouter.json';
import { ADDRESSES, AVALANCHE_CHAIN_ID, WAVAX } from '~/utils/constants';
import { IYakOffer } from '~/types/yak';
import { swapSettings } from '~/state';
import { ethers, BigNumber } from 'ethers';

const chainId = AVALANCHE_CHAIN_ID;
const provider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc');

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
      amountOut: BigNumber;
      yakOffer?: IYakOffer;
    }[] = await Promise.all(
      routers
        .filter((v) => swapSettings.routers.includes(v.platform))
        .map(async (router) => {
          let amountOut;
          const routerContract = new ethers.Contract(router.address, RouterABI, provider);

          try {
            const path = [fromToken, toToken];
            const amountsOut = await routerContract.getAmountsOut(amountIn, path);
            amountOut = amountsOut[amountsOut.length - 1];
          } catch {
            amountOut = BigNumber.from('0');
          }

          if (fromToken.toLowerCase() !== WAVAX.toLowerCase() && toToken.toLowerCase() !== WAVAX.toLowerCase()) {
            try {
              const path = [fromToken, WAVAX, toToken];
              const amountsOut = await routerContract.getAmountsOut(amountIn, path);
              const tmpAmountOut = amountsOut[amountsOut.length - 1];
              amountOut = BigNumber.from(amountOut).gt(BigNumber.from(tmpAmountOut)) ? amountOut : tmpAmountOut;
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
        amountOut: yakOffer.amounts.length ? yakOffer.amounts[yakOffer.amounts.length - 1] : BigNumber.from('0'),
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
    const yakRouterContract = new ethers.Contract(yakRouterAddress, YakRouterABI, provider);

    try {
      const data = await yakRouterContract.findBestPathWithGas(amountIn, fromToken, toToken, maxSteps, gasPrice);
      return data;
    } catch (err) {
      console.error('fetchYakOffer', err);
    }
  }
};
