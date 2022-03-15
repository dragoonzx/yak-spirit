import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnapshot } from 'valtio';
import { TokenListType, TokenType } from '~/api/tokenList';
import { swapState, userBalanceStore } from '~/state';
import { WAVAX, ZERO_ADDRESS } from '~/utils/constants';
import { formatCurrency, formatTokenBalance } from '~/utils/formatters';
import SwapInput from '../SwapInput';
import SwapSelect from '../SwapSelect';

interface ISwapCardInputsProps {
  isSend?: boolean;
  tokenList: TokenListType;
  usdPrices?: any;
  onTokenChange?: (newToken: TokenType) => void;
  onAmountInChange?: (newAmount: number) => void;
  showUsdPrices?: boolean;
}

const SwapCardInputs = ({
  isSend,
  tokenList,
  usdPrices,
  onTokenChange,
  onAmountInChange,
  showUsdPrices,
}: ISwapCardInputsProps) => {
  const { t } = useTranslation();
  const userBalances = useSnapshot(userBalanceStore);
  const swapSnap = useSnapshot(swapState);

  const tokenType = isSend ? 'tokenIn' : 'tokenOut';
  const amountType = isSend ? 'amountIn' : 'amountOut';

  const setMaxAmount = () => {
    if (tokenType === 'tokenOut') {
      return;
    }
    const balance =
      swapState.tokenIn.address.toLowerCase() === ZERO_ADDRESS.toLowerCase()
        ? formatTokenBalance(userBalances.native, '18')
        : formatTokenBalance(inputTokenUserBalance?.balance, inputTokenUserBalance?.decimals);

    if (!balance) {
      return;
    }

    swapState.amountIn = Number(balance);
  };

  const inputTokenUserBalance = userBalances.tokens.find(
    (v) => v.token_address.toLowerCase() === swapState[tokenType].address.toLowerCase()
  );

  const inputUsdPrice = useMemo(() => {
    let formattedCurrency = formatCurrency(
      Number(
        (
          usdPrices?.[
            swapState[tokenType].address.toLowerCase() === ZERO_ADDRESS
              ? WAVAX.toLowerCase()
              : swapState[tokenType].address.toLowerCase()
          ]?.usd * swapState?.[amountType]
        ).toFixed(2)
      )
    );

    formattedCurrency = !formattedCurrency || formattedCurrency === 'NaN' ? '0' : formattedCurrency;
    return usdPrices ? `$${formattedCurrency}` : '$0';
  }, [swapState.amountOut, usdPrices]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm">
        <span>{isSend ? t('sendTokens') : t('receive')}</span>
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-4 mr-2 stroke-current"
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
          <span className="font-medium">
            {swapSnap[tokenType].address === ZERO_ADDRESS
              ? (Number(userBalances.native) * 10 ** -18).toFixed(4)
              : inputTokenUserBalance
              ? Number(formatTokenBalance(inputTokenUserBalance.balance, inputTokenUserBalance.decimals)).toFixed(4)
              : '0.0'}{' '}
            {swapSnap[tokenType].symbol}
          </span>
        </span>
      </div>
      <div className="flex h-16 pt-2 relative">
        <SwapSelect
          tokenList={tokenList}
          token={swapSnap[tokenType]}
          setToken={(token: TokenType) => {
            swapState[tokenType] = token;
            onTokenChange && onTokenChange(token);
          }}
        />
        <div className="relative w-full">
          {showUsdPrices && <span className="text-xs right-0 -bottom-6 absolute font-light">{inputUsdPrice}</span>}
          <SwapInput
            disabled={tokenType === 'tokenOut'}
            amount={swapSnap[amountType]}
            setMaxAmount={() => setMaxAmount()}
            setAmount={(amount: number) => {
              swapState[amountType] = amount;
              if (amountType === 'amountIn') {
                onAmountInChange && onAmountInChange(amount);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SwapCardInputs;
