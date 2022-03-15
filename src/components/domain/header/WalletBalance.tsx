import { useMoralis } from 'react-moralis';
import { useUserBalance } from '~/state';
import { formatTokenBalance } from '~/utils/formatters';

interface IWalletBalanceProps {
  onLogout: () => void;
}

const WalletBalance = ({ onLogout }: IWalletBalanceProps) => {
  const balance = useUserBalance();
  const { user } = useMoralis();

  return (
    <>
      <div className="text-gray-500">
        <div className="mb-2 mt-2 py-4 px-3 border-[1px] rounded-md flex items-center justify-between">
          <div className="flex flex-col mr-8">
            <span className="text-sm">Balance</span>
            <span className="text-sm font-bold">{formatTokenBalance(balance.native, '18')} AVAX</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Network</span>
            <span className="text-sm font-bold">Avalanche</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-gray-900 text-sm mt-4">
        <a
          className="flex items-center link"
          href={`https://snowtrace.io/address/${user?.get('ethAddress')}`}
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span>Avalanche C-Chain Explorer</span>
        </a>
        <button type="button" className="btn btn-sm btn-ghost" onClick={onLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
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
          <span className="text-sm normal-case font-normal">Logout</span>
        </button>
      </div>
    </>
  );
};

export default WalletBalance;
