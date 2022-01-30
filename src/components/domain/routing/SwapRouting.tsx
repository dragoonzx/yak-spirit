import React, { Fragment } from 'react';
import { Icon } from './Icon';
import clsx from 'classnames';
import { state, useSnapshot } from '~/state';
import { formatTokenBalance } from '~/utils/formatters';
import { tokenList } from '~/components/domain/swap/tokenList';
import { ADDRESSES } from '~/utils/constants';
import SpiritLoaderWithTransition from '~/components/shared/SpiritLoaderWithTransition';

const helperStyle = {
  height: '37px',
  display: 'flex',
  alignItems: 'center',
};

const Border: React.FC<{ start?: boolean; end?: boolean }> = ({ start, end }) => {
  return (
    <div
      className={clsx(
        (start || end) && 'pt-14',
        start && 'border-l rounded-bl-3xl',
        end && 'border-r  rounded-br-3xl',
        'border-dashed border-b border-[#C5C6E1] grow'
      )}
    />
  );
};

const Routing: React.FC = () => {
  const {
    swapInfo: {
      routing: { path, amounts },
      tokens: { tokenIn, tokenOut },
    },
    loadingQuotes,
  } = useSnapshot(state);

  const getAdapterPlatform = (index: number) => {
    return ADDRESSES.adapters[
      (state.swapInfo.routing.adapters as unknown as (keyof typeof ADDRESSES['adapters'])[])[index]
    ]?.platform;
  };

  return (
    <div className="card shadow-lg bg-base-200/100 min-h-full">
      <div className="card-body">
        <h2 className="font-bold -mt-4" style={helperStyle}>
          Routing
          <SpiritLoaderWithTransition visible={loadingQuotes} />
        </h2>
        <div className="flex justify-between mt-1">
          <div className="flex items-center">
            <Icon url={tokenList.find((v) => v.address === path[0])?.logoURI!} />
            <div className="ml-2 text-sm">
              {Number(formatTokenBalance(amounts[0], tokenIn.decimals)).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center">
            {/* <div className="mr-2">{formatNumber(to.value, 2, ' ')}</div> */}
            <div className="mr-2 text-sm">
              {Number(formatTokenBalance(amounts[amounts.length - 1], tokenOut.decimals)).toLocaleString()}
            </div>
            <Icon url={tokenList.find((v) => v.address === path[path.length - 1])?.logoURI!} />
          </div>
        </div>
        <div className="mx-4">
          {/* {path.map((token, index) => {
            return ( */}
          <div className="flex items-end justify-around">
            <Border start />
            <div className="text-[#9495C8] text-xs translate-y-1/2 mx-1.5">100%</div>
            <Border />
            {path.slice(1, path.length - 1).map((token, index) => {
              return (
                <Fragment key={token + index}>
                  <Icon
                    className="translate-y-1/2 mx-1"
                    url={tokenList.find((v) => v.address === token)?.logoURI!}
                    type={tokenList.find((v) => v.address === token)?.symbol!}
                    dex={getAdapterPlatform(index + 1)}
                    withType
                  />
                  <Border />
                </Fragment>
              );
            })}
            <div className="text-[#9495C8] text-xs translate-y-1/2  mx-1.5">100%</div>
            <Border end />
          </div>
          {/* ); */}
          {/* })} */}
        </div>
      </div>
    </div>
  );
};

export default Routing;
