import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { state, userBalanceStore } from '~/state';
import yakSpiritLogo from '~/assets/images/yak-spirit/yak-spirit5.png';
import I18n from '../i18n/I18n';
import Theming from '../theming/Theming';
import AppSettings from './AppSettings';
import WalletInfoModal from './WalletInfoModal';
import Moralis from 'moralis';

function Header() {
  const { authenticate, isAuthenticated, isAuthenticating, logout, user } = useMoralis();

  useEffect(() => {
    state.user = user;
  }, [user]);

  useEffect(() => {
    const getUserBalances = async () => {
      if (!user) {
        return;
      }

      const options: { chain: 'avalanche'; address: string } = { chain: 'avalanche', address: user.get('ethAddress') };

      const tokenBalances = await Promise.all([
        Moralis.Web3API.account.getTokenBalances(options),
        Moralis.Web3API.account.getNativeBalance(options),
      ]);
      console.log(tokenBalances);
      userBalanceStore.tokens = tokenBalances[0];
      userBalanceStore.native = tokenBalances[1].balance;
    };

    getUserBalances();
  }, [user]);

  const formattedEthAddress = useCallback(() => {
    const address = user?.get('ethAddress');
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <header>
        <div className="navbar mb-2 text-neutral-content rounded-box flex flex-col sm:flex-row">
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">
              <img src={yakSpiritLogo} alt="" className="h-16" />
            </span>
          </div>
          <div>
            <div className="flex-none px-2 mx-2 lg:flex text-secondary">
              <div className="flex items-stretch">
                <div className="mr-1">
                  <Theming />
                </div>
                <I18n />
                <button
                  onClick={isAuthenticated ? openModal : () => authenticate()}
                  className={classNames(
                    'btn btn-sm rounded-btn ml-2',
                    isAuthenticated ? 'btn-info lowercase' : 'btn-ghost'
                  )}
                >
                  {isAuthenticating ? (
                    <svg
                      className="animate-spin inline-block w-5 mr-2 stroke-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-5 mr-2 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  )}
                  {isAuthenticated ? formattedEthAddress() : 'Wallet'}
                </button>
              </div>
            </div>
            <div className="flex-none text-secondary">
              <AppSettings />
            </div>
          </div>
        </div>
      </header>
      <WalletInfoModal isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />
    </>
  );
}

export default Header;
