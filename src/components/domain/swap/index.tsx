import { ReactElement } from 'react';
import { tokenList } from '~/api/tokenList';
import { SwapCard } from './SwapCard';
import { SwapProps } from '~/types/props';
import { ToastContainer } from 'react-toastify';

/**
 * A`Swap` component that can be embedded into applications. To use,
 * one should install all prerequisite libraries and setup
 * For example,
 *
 * ```javascript
 * <YakSwap />
 * ```
 *
 * All of the complexity of communicating with the YY Router and managing
 * its data is handled internally by the component.
 *
 * For information on other properties like earning referrals, see the
 * [[SwapProps]] documentation.
 */
export default function YakSwap(props: SwapProps): ReactElement {
  return (
    <>
      <SwapCard {...props} tokenList={props.tokenList ?? tokenList} showUsdPrices={props.showUsdPrices ?? true} />
      <ToastContainer position="bottom-right" />
    </>
  );
}
