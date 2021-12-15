import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { state } from '~/state';
import yakSpiritLogo from '~/yak-spirit5.png';
import WalletInfoModal from './WalletInfoModal';

function Header() {
  const { authenticate, isAuthenticated, isAuthenticating, logout, user } = useMoralis();

  useEffect(() => {
    state.user = user;
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
        <div className="navbar mb-2 text-neutral-content rounded-box">
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">
              <img src={yakSpiritLogo} alt="" className="h-16" />
            </span>
          </div>
          <div className="flex-none hidden px-2 mx-2 lg:flex">
            <div className="flex items-stretch">
              <a className="btn btn-ghost btn-sm rounded-btn mr-2">
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                Theme
              </a>
              <a className="btn btn-ghost btn-sm rounded-btn mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-5 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </a>
              <button
                onClick={isAuthenticated ? openModal : () => authenticate()}
                className={classNames('btn btn-sm rounded-btn', isAuthenticated ? 'btn-info lowercase' : 'btn-ghost')}
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
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <WalletInfoModal isOpen={isOpen} setIsOpen={setIsOpen} logout={logout} />
    </>
  );
}

export default Header;
