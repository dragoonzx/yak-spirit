import NumberFormat from 'react-number-format';

interface ISwapInputProps {
  amount: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
  setMaxAmount: () => void;
}

const styleInputDisabled = {
  '--tw-border-opacity': 0.1,
  borderColor: 'hsla(var(--bc) / var(--tw-border-opacity, 1))',
};

const SwapInput = ({ amount, setAmount, disabled, setMaxAmount }: ISwapInputProps) => {
  return (
    <div className="form-control h-full w-full relative">
      <NumberFormat
        style={disabled ? styleInputDisabled : {}}
        value={amount}
        className="input input-bordered focus:shadow-none hover:border-opacity-40 focus:border-opacity-40 !rounded-l-none px-0 pl-4 pr-12 w-full h-full"
        displayType="input"
        allowNegative={false}
        disabled={disabled}
        thousandSeparator={' '}
        onValueChange={(values) => {
          const { value } = values;
          setAmount(+value);
        }}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button onClick={setMaxAmount} className="btn btn-ghost btn-xs">
          max
        </button>
      </div>
    </div>
  );
};

export default SwapInput;
