import { AVALANCHE_CHAIN_ID, WAVAX, ZERO_ADDRESS } from './constants';

const INCH_API = 'https://api.1inch.io/v4.0/43114';
const PARASWAP_API = 'https://apiv5.paraswap.io';

interface I1inchProps {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
}

interface IParaswapProps {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  fromTokenDecimals: number;
  toTokenDecimals: number;
}

export const get1inchQuotes = async ({ fromTokenAddress, toTokenAddress, amount }: I1inchProps) => {
  fromTokenAddress = fromTokenAddress === ZERO_ADDRESS ? WAVAX : fromTokenAddress;
  toTokenAddress = toTokenAddress === ZERO_ADDRESS ? WAVAX : toTokenAddress;

  if (!(fromTokenAddress || toTokenAddress)) {
    return;
  }

  const quotes = await (
    await fetch(
      `${INCH_API}/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}`
    )
  ).json();
  return { ...quotes, logo: '1inch.png', platform: '1inch', link: 'https://app.1inch.io/#/43114' };
};

export const getParaswapQuotes = async ({
  fromTokenAddress,
  toTokenAddress,
  amount,
  fromTokenDecimals,
  toTokenDecimals,
}: IParaswapProps) => {
  fromTokenAddress = fromTokenAddress === ZERO_ADDRESS ? WAVAX : fromTokenAddress;
  toTokenAddress = toTokenAddress === ZERO_ADDRESS ? WAVAX : toTokenAddress;

  if (!(fromTokenAddress || toTokenAddress)) {
    return;
  }

  const quotes = await (
    await fetch(
      `${PARASWAP_API}/prices/?srcToken=${fromTokenAddress}&destToken=${toTokenAddress}&amount=${amount}&srcDecimals=${fromTokenDecimals}&destDecimals=${toTokenDecimals}&side=SELL&network=${AVALANCHE_CHAIN_ID}`
    )
  ).json();
  return {
    ...quotes,
    toTokenAmount: quotes?.priceRoute?.destAmount ?? 0,
    toToken: { decimals: quotes?.priceRoute?.destDecimals ?? 18 },
    logo: 'paraswap.png',
    platform: 'paraswap',
    link: 'https://paraswap.io/#/?network=avalanche',
  };
};
