import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useChain, useMoralis } from 'react-moralis';
import { useTranslation } from 'react-i18next';

const AVALANCHE_CHAIN_ID = '0xa86a';

enum ALERT_STATUSES {
  'METAMASK',
  'NETWORK',
}

// const switchNetworkAvalanche = async () => {
//   const web3 = new Web3(window.ethereum);

//   try {
//     if (!web3?.currentProvider) {
//       return;
//     }
//     // @ts-expect-error: request on string
//     await web3.currentProvider!.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: '0xa86a' }],
//     });
//   } catch (error: any) {
//     if (error.code === 4902) {
//       try {
//         // @ts-expect-error: request on string
//         await web3.currentProvider!.request({
//           method: 'wallet_addEthereumChain',
//           params: [
//             {
//               chainId: '0xa86a',
//               chainName: 'Avalanche Mainnet',
//               rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
//               nativeCurrency: {
//                 name: 'AVAX',
//                 symbol: 'AVAX',
//                 decimals: 18,
//               },
//               blockExplorerUrls: ['https://snowtrace.io/'],
//             },
//           ],
//         });
//       } catch (error: any) {
//         alert(error.message);
//       }
//     }
//   }
// };

export const NetworkAlert = () => {
  const { t } = useTranslation();
  const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading } = useMoralis();
  const { switchNetwork, chainId } = useChain();

  const location = useLocation();
  const isAppPage = location.pathname?.includes('app');

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const [alert, setAlert] = useState<typeof ALERT_STATUSES[keyof typeof ALERT_STATUSES] | null>(null);

  useEffect(() => {
    const checkAlerts = async () => {
      if (!(isWeb3Enabled || isWeb3EnableLoading)) {
        await enableWeb3();
      }

      switch (true) {
        case !isMetaMaskInstalled():
          setAlert(ALERT_STATUSES.METAMASK);
          break;
        case !chainId || chainId !== AVALANCHE_CHAIN_ID:
          setAlert(ALERT_STATUSES.NETWORK);
          break;
        case chainId === AVALANCHE_CHAIN_ID:
          setAlert(null);
          break;
      }
    };

    checkAlerts();
  }, [chainId, isWeb3EnableLoading, isWeb3Enabled]);

  const getAlertText = useCallback(() => {
    if (alert !== null) {
      return {
        [ALERT_STATUSES.METAMASK]: t('metamaskWarn'),
        [ALERT_STATUSES.NETWORK]: t('networkWarn'),
      }[alert];
    }
  }, [alert, chainId]);

  const handleNetworkSwitch = async () => {
    try {
      await switchNetwork(AVALANCHE_CHAIN_ID);
    } catch (err) {
      console.error(err);
    }
  };

  if (alert === null) {
    return null;
  }

  if (!isAppPage) {
    return null;
  }

  return (
    <div className="px-4">
      <div className="alert alert-error">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <label>{getAlertText()}</label>
        </div>
        <div className="flex-none">
          {alert === ALERT_STATUSES.METAMASK && <a className="btn btn-sm btn-secondary">{t('install')} MetaMask</a>}
          {alert === ALERT_STATUSES.NETWORK && (
            <button onClick={() => handleNetworkSwitch()} className="btn btn-sm btn-secondary">
              {t('changeNetwork')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
