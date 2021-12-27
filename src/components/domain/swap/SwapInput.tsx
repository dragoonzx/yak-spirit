import NumberFormat from 'react-number-format';

interface ISwapInputProps {
  amount: number;
  setAmount: (amount: number) => void;
  disabled?: boolean;
}

const SwapInput = ({ amount, setAmount, disabled }: ISwapInputProps) => {
  // const handleAmountChange = (e: SyntheticEvent) => {
  // };

  return (
    <div className="form-control h-full w-full relative">
      <NumberFormat
        value={amount}
        className="input input-bordered rounded-l-none px-0 pl-4 pr-12 w-full h-full"
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
        <button className="btn btn-ghost btn-xs">max</button>
      </div>
    </div>
  );
};

export default SwapInput;
