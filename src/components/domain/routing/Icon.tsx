import React from 'react';
import clsx from 'classnames';
import { DEXES } from '~/utils/constants';

interface Props {
  className?: string;
  withType?: boolean;
  type?: string;
  url: string;
  background?: string;
  dex?: string;
}

export const Icon: React.FC<Props> = ({ type = 'AVAX', className, withType, url, background = '#6768AB', dex }) => {
  return (
    <div className={clsx(className, 'relative')}>
      <div className={clsx('h-8 pl-8 flex items-center text-sm', withType && 'mr-2 ml-2')}>{withType && type}</div>
      {dex && DEXES[dex]?.logo ? (
        <img
          src={require(`../../../assets/images/providers/${DEXES[dex]?.logo}`).default}
          alt=""
          className="h-6 rounded-lg absolute left-1/2 -translate-x-1/2 -top-8"
        />
      ) : null}
      <div className="absolute inset-0 rounded-lg opacity-10" style={{ backgroundColor: background }} />
      <div
        className="w-8 h-8 absolute bg-no-repeat bg-contain rounded-lg bg-center inset-0"
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    </div>
  );
};
