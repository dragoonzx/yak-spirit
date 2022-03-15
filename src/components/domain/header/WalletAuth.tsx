import React from 'react';
import { useMoralis } from 'react-moralis';

import Metamask from '~/assets/images/wallets/metamask.png';
import WalletConnect from '~/assets/images/wallets/wallet-connect.svg';

export const connectors = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: 'injected',
    priority: 1,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: 'walletconnect',
    priority: 2,
  },
];

const styles = {
  account: {
    height: '42px',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    borderRadius: '12px',
    backgroundColor: 'rgb(244, 244, 244)',
    cursor: 'pointer',
  },
  text: {
    color: '#21BF96',
  },
  connector: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '18px 12px',
    cursor: 'pointer',
  },
  icon: {
    alignSelf: 'center',
    fill: 'rgb(40, 13, 95)',
    flexShrink: '0',
    marginBottom: '8px',
    height: '52px',
  },
};

interface IWalletAuthProps {
  closeModal: () => void;
}

const WalletAuth = ({ closeModal }: IWalletAuthProps) => {
  const { authenticate } = useMoralis();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {connectors.map(({ title, icon, connectorId }, key) => (
        <div
          style={styles.connector}
          key={key}
          onClick={async () => {
            try {
              await authenticate({ provider: connectorId });
              window.localStorage.setItem('connectorId', connectorId);
              closeModal();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <img src={icon} alt={title} style={styles.icon} />
          <p className="text-gray-700" style={{ fontSize: '14px' }}>
            {title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WalletAuth;
