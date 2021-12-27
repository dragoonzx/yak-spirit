import WindowedSelect, { components } from 'react-windowed-select';
import { colourStyles } from './select.styles';
import { TokenListType, TokenType } from './tokenList';

const Option = (props: any) => {
  // TODO: fix rerendering on key nav
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;

  const style = {
    backgroundColor: props.isSelected
      ? 'hsla(var(--p) / var(--tw-bg-opacity,1))'
      : props.isFocused
      ? 'hsla(var(--p) / 0.2)'
      : undefined,
    '&:hover': {
      backgroundColor: 'hsla(var(--pf) / var(--tw-bg-opacity,1))',
    },
  };

  const { logoURI } = props.data;

  const { selectOption, ...rest } = props;

  return (
    <div
      onClick={() => selectOption(props.data)}
      className="flex items-center cursor-pointer hover:bg-primary-focus p-2"
      style={style}
    >
      {logoURI && <img src={logoURI} alt="" className="h-6 rounded" />}
      <span className={logoURI ? 'ml-2' : ''}>
        <components.Option {...rest} />
      </span>
    </div>
  );
};

interface ISwapSelectProps {
  token: TokenType;
  setToken: (token: TokenType) => void;
  tokenList: TokenListType;
}

const SwapSelect = ({ token, setToken, tokenList }: ISwapSelectProps) => {
  return (
    <div className="w-full relative">
      <img src={token.logoURI} alt="" className="h-6 absolute z-10 top-1/2 left-2 -translate-y-1/2 rounded" />
      <WindowedSelect
        className="h-full"
        value={token}
        onChange={setToken}
        components={{ Option }}
        options={tokenList}
        styles={colourStyles}
      />
    </div>
  );
};

export default SwapSelect;
