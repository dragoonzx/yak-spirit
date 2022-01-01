/// <reference types="react" />
interface ISwapInputProps {
    amount: number;
    setAmount: (amount: number) => void;
    disabled?: boolean;
    setMaxAmount: () => void;
}
declare const SwapInput: ({ amount, setAmount, disabled, setMaxAmount }: ISwapInputProps) => JSX.Element;
export default SwapInput;
