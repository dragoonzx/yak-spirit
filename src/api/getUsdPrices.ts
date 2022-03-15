import { WAVAX } from '~/utils/constants';

export const getUsdPrices = async (tokenInAddress: string, tokenOutAddress: string) => {
  const addresses = `${tokenInAddress},${tokenOutAddress},${WAVAX.toLowerCase()}`;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/avalanche?contract_addresses=${addresses}&vs_currencies=usd`
  );
  const prices = await res.json();
  return prices;
};
