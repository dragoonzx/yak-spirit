import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
