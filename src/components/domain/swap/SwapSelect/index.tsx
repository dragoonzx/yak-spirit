import WindowedSelect, { components } from 'react-windowed-select';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo, useEffect, useState } from 'react';
import { colourStyles } from './select.styles';
import { TokenListInstance, TokenListType, TokenType } from '~/api/tokenList';
import { fetchCustomTokenInfo } from '~/api/getCustomTokenInfo';

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

const CustomTokenModal = ({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
}) => {
  const [address, setAddress] = useState('');
  const [token, setToken] = useState<{
    data: {
      name: string;
      symbol: string;
      decimals: number;
    };
    type: string;
  } | null>(null);

  const getToken = async () => {
    const token = await fetchCustomTokenInfo(address);
    if (!token) {
      return;
    }

    setToken(token);
  };

  useEffect(() => {
    setToken(null);
    if (address.length === 42) {
      getToken();
    }
  }, [address]);

  const importToken = () => {
    if (!token?.data) {
      return;
    }

    TokenListInstance.importCustomToken({
      symbol: token.data.symbol,
      name: token.data.name,
      decimals: token.data.decimals,
      address: address,
    });

    setToken({ ...token, type: 'list' });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed backdrop-blur-sm inset-0 z-50 overflow-y-auto"
        onClose={() => {
          setIsModalOpen(false);
          setToken(null);
          setAddress('');
        }}
      >
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
                Add custom token
              </Dialog.Title>
              <div>
                <div className="form-control w-full max-w-xs mt-2">
                  <label className="label flex-col items-start px-0 min-w-[380px] relative">
                    <span className="label-text text-base-100 font-medium">Token address</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 absolute bottom-6 left-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      placeholder="0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
                      className="input input-bordered w-full max-w-xs mt-1 pl-8"
                    />
                  </label>
                </div>
                {token && token.data.symbol ? (
                  <div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-base-100 flex flex-col">
                        <span className="font-bold flex items-center">
                          {token.data.name}
                          <a href={`https://snowtrace.io/token/${address}`} target="_blank" rel="noreferrer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2"
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
                          </a>
                        </span>
                        <span>{token.data.symbol}</span>
                      </div>
                      <button className="btn btn-sm" onClick={importToken} disabled={token.type === 'list'}>
                        {token.type === 'node' ? (
                          'Import token'
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center text-primary mt-4">
                      {token.type === 'list' ? (
                        <span className="text-sm mr-2">This token has already been added</span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const NoOptionsMessage = ({ setIsModalOpen }: { setIsModalOpen: (state: boolean) => void }) => {
  return (
    <div className="flex flex-col items-center w-full py-4">
      <span className="font-bold">Token not found</span>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="btn btn-sm mt-2 flex items-center"
      >
        <span className="mr-1">Add custom token</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

interface ISwapSelectProps {
  token: TokenType;
  setToken: (token: TokenType) => void;
  tokenList: TokenListType;
}

const SwapSelect = ({ token, setToken, tokenList }: ISwapSelectProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const NoOptionsMessageComponent = memo(function NoOptComponent() {
    return <NoOptionsMessage setIsModalOpen={setIsModalOpen} />;
  });

  return (
    <div className="w-full relative max-w-[50%]">
      <img src={token.logoURI} alt="" className="h-6 absolute z-10 top-1/2 left-2 -translate-y-1/2 rounded" />
      <WindowedSelect
        className="h-full focus:shadow-none focus:border-opacity-40"
        value={token}
        onChange={setToken}
        components={{ Option, NoOptionsMessage: NoOptionsMessageComponent }}
        options={tokenList}
        styles={colourStyles}
      />
      <CustomTokenModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default SwapSelect;
