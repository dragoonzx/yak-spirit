import PairABI from '~/abis/PairABI.json';
import YakRouterABI from '~/abis/YakRouter.json';
import { ADDRESSES } from '~/utils/constants';
import { userState } from '~/state';
import { tokenList } from './tokenList';
import { toast } from 'react-toastify';
import { signERC2612Permit } from 'eth-permit';
import { ethers, BigNumber } from 'ethers';
import SpiritSuccessTx from '~/components/shared/SpiritSuccessTx';

const MaxUint256: BigNumber | string = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const yakRouterAddress = ADDRESSES.helpers.yakRouter;
const fee = 0;

export const swap = async (payload: any) => {
  // TODO: not metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const userAddress = userState.userAddress;

  if (userAddress) {
    const { trade, fromAVAX, toAVAX } = payload;
    const yakRouterContract = new ethers.Contract(yakRouterAddress, YakRouterABI, signer);

    try {
      if (fromAVAX) {
        const tx = await yakRouterContract.swapNoSplitFromAVAX(
          {
            amountIn: trade.amounts[0],
            amountOut: trade.amounts[trade.amounts.length - 1],
            path: trade.path,
            adapters: trade.adapters,
          },
          userAddress,
          fee,
          { from: userAddress, value: trade.amounts[0] }
        );

        const receipt = await tx.wait();

        if (receipt.status) {
          toast.success(
            ({ closeToast }) => <SpiritSuccessTx closeToast={closeToast} txHash={receipt.transactionHash} />,
            {
              autoClose: 8000,
              closeOnClick: false,
            }
          );
        } else {
          toast.error('Swap failed');
        }
        return tx;
      } else {
        // handle approval
        const fromTokenAddress = trade.path[0];
        const permitSupported = tokenList.find(
          (token) => token.address.toLowerCase() === fromTokenAddress.toLowerCase()
        )?.permitSupported;

        const tokenContract = new ethers.Contract(fromTokenAddress, PairABI, signer);
        const approvedBalance = await tokenContract.allowance(userAddress, yakRouterAddress);
        try {
          if (!permitSupported) {
            throw new Error('Permit not supported');
          }
          if (BigNumber.from(approvedBalance).gte(trade.amounts[0])) {
            throw new Error('Permit not needed');
          }

          const signature = await signERC2612Permit(
            signer,
            trade.path[0],
            userAddress,
            yakRouterAddress,
            trade.amounts[0]
          );

          if (toAVAX) {
            const tx = await yakRouterContract.swapNoSplitToAvaxWithPermit(
              {
                amountIn: trade.amounts[0],
                amountOut: trade.amounts[trade.amounts.length - 1],
                path: trade.path,
                adapters: trade.adapters,
              },
              userAddress,
              fee,
              signature.deadline,
              signature.v,
              signature.r,
              signature.s,
              { from: userAddress }
            );

            const receipt = await tx.wait();

            if (receipt.status) {
              toast.success(
                ({ closeToast }) => <SpiritSuccessTx closeToast={closeToast} txHash={receipt.transactionHash} />,
                {
                  autoClose: 8000,
                  closeOnClick: false,
                }
              );
            } else {
              toast.error('Swap failed');
            }
            return tx;
          } else {
            const tx = await yakRouterContract.swapNoSplitWithPermit(
              {
                amountIn: trade.amounts[0],
                amountOut: trade.amounts[trade.amounts.length - 1],
                path: trade.path,
                adapters: trade.adapters,
              },
              userAddress,
              fee,
              signature.deadline,
              signature.v,
              signature.r,
              signature.s,
              { from: userAddress }
            );

            const receipt = await tx.wait();

            if (receipt.status) {
              toast.success(
                ({ closeToast }) => <SpiritSuccessTx closeToast={closeToast} txHash={receipt.transactionHash} />,
                {
                  autoClose: 8000,
                  closeOnClick: false,
                }
              );
            } else {
              toast.error('Swap failed');
            }
            return tx;
          }
        } catch {
          try {
            if (BigNumber.from(approvedBalance).lt(trade.amounts[0])) {
              const tx = await tokenContract.approve(yakRouterAddress, MaxUint256, { from: userAddress });
              await tx.wait();
            }

            if (toAVAX) {
              const tx = await yakRouterContract.swapNoSplitToAVAX(
                {
                  amountIn: trade.amounts[0],
                  amountOut: trade.amounts[trade.amounts.length - 1],
                  path: trade.path,
                  adapters: trade.adapters,
                },
                userAddress,
                fee,
                { from: userAddress }
              );

              const receipt = await tx.wait();

              if (receipt.status) {
                toast.success(
                  ({ closeToast }) => <SpiritSuccessTx closeToast={closeToast} txHash={receipt.transactionHash} />,
                  {
                    autoClose: 8000,
                    closeOnClick: false,
                  }
                );
              } else {
                toast.error('Swap failed');
              }
              return tx;
            } else {
              const tx = await yakRouterContract.swapNoSplit(
                {
                  amountIn: trade.amounts[0],
                  amountOut: trade.amounts[trade.amounts.length - 1],
                  path: trade.path,
                  adapters: trade.adapters,
                },
                userAddress,
                fee,
                { from: userAddress }
              );

              const receipt = await tx.wait();

              if (receipt.status) {
                toast.success(
                  ({ closeToast }) => <SpiritSuccessTx closeToast={closeToast} txHash={receipt.transactionHash} />,
                  {
                    autoClose: 8000,
                    closeOnClick: false,
                  }
                );
              } else {
                toast.error('Swap failed');
              }
              return tx;
            }
          } catch (err: any) {
            console.error('swap', err);
            if (err.code === 4001) {
              toast.error('Metamask closed');
            } else {
              toast.error('Swap error');
            }
            return false;
          }
        }
      }
    } catch (err: any) {
      console.error('swap', err);
      if (err.code === 4001) {
        toast.error('Metamask closed');
      } else {
        toast.error('Swap error');
      }
      return false;
    }
  }
};
