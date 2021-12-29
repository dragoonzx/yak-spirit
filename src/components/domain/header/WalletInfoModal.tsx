import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUserBalance } from '~/state';
import { formatTokenBalance } from '~/utils/formatters';

interface IWalletInfoModalProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  logout: () => void;
}

const WalletInfoModal = ({ isOpen, setIsOpen, logout }: IWalletInfoModalProps) => {
  // TODO: format native balance
  const balance = useUserBalance();

  console.log(balance);

  function closeModal() {
    setIsOpen(false);
  }

  const onLogout = () => {
    logout();
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed backdrop-blur-sm inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Account
              </Dialog.Title>
              <div className="text-gray-500">
                <p className="mb-2">Balance: {formatTokenBalance(balance.native, '18')} AVAX</p>
                <span className="font-bold">ERC-20 Tokens</span>
                {balance.tokens.length !== 0 ? (
                  balance.tokens.map((token) => (
                    <p key={token.symbol}>
                      {token.name} balance: {formatTokenBalance(token.balance, token.decimals)} {token.symbol}
                    </p>
                  ))
                ) : (
                  <p>No tokens</p>
                )}
              </div>

              <div className="mt-4">
                <button type="button" className="btn btn-error" onClick={onLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WalletInfoModal;
