import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { state } from '~/state';
import PairABI from '~/abis/PairABI.json';
import YakRouterABI from '~/abis/YakRouter.json';
import { ADDRESSES, AVALANCHE_CHAIN_ID } from '~/utils/constants';
import { BigNumber } from 'bignumber.js';

const provider = window.ethereum;
const web3 = new Web3(provider);
const userAddress = state.user?.get('ethAddress');

const chainId = AVALANCHE_CHAIN_ID;

const MaxUint256: BigNumber | string = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const yakRouterAddress = ADDRESSES.helpers.yakRouter;
const fee = 0;

export const swap = async (payload: any) => {
  if (userAddress) {
    const { trade, fromAVAX, toAVAX } = payload;
    const yakRouterContract = new web3.eth.Contract(YakRouterABI as AbiItem[], yakRouterAddress, {
      from: userAddress,
    });

    try {
      if (fromAVAX) {
        const tx = await yakRouterContract.methods
          .swapNoSplitFromAVAX(
            {
              amountIn: trade.amounts[0],
              amountOut: trade.amounts[trade.amounts.length - 1],
              path: trade.path,
              adapters: trade.adapters,
            },
            userAddress,
            fee,
            { value: trade.amounts[0] }
          )
          .send({ from: userAddress });
        return tx;
      } else {
        // handle approval
        const fromTokenAddress = trade.path[0];
        // get if permit from token is supported
        // const permitSupported = TokenList[chainId].filter(
        //   (token) => token.address.toLowerCase() == fromTokenAddress.toLowerCase()
        // )[0].permitSupported;
        const permitSupported = true;
        const tokenContract = new web3.eth.Contract(PairABI as AbiItem[], fromTokenAddress, {
          from: userAddress,
        });
        const approvedBalance = await tokenContract.methods.allowance(userAddress, yakRouterAddress).call();
        try {
          if (!permitSupported) throw new Error('Permit not supported');
          if (new BigNumber(approvedBalance).gte(trade.amounts[0])) throw new Error('Permit not needed');

          const deadline = Math.floor(Date.now() / 1000) + 1200; // now plus 20 mins

          const params = await getPermitParams({
            tokenContract,
            userAddress,
            chainId,
            spender: yakRouterAddress,
            amount: trade.amounts[0],
            deadline,
          });

          const signature = await provider.request({ method: 'eth_signTypedData_v4', params });

          if (toAVAX) {
            const tx = await yakRouterContract.methods
              .swapNoSplitToAvaxWithPermit(
                {
                  amountIn: trade.amounts[0],
                  amountOut: trade.amounts[trade.amounts.length - 1],
                  path: trade.path,
                  adapters: trade.adapters,
                },
                userAddress,
                fee,
                deadline.toString(),
                parseInt(signature.substring(2).substring(128, 130), 16),
                Web3.utils.hexToBytes(`0x${signature.substring(2).substring(0, 64)}`),
                Web3.utils.hexToBytes(`0x${signature.substring(2).substring(64, 128)}`)
              )
              .send({ from: userAddress });
            return tx;
          } else {
            const tx = await yakRouterContract.methods
              .swapNoSplitWithPermit(
                {
                  amountIn: trade.amounts[0],
                  amountOut: trade.amounts[trade.amounts.length - 1],
                  path: trade.path,
                  adapters: trade.adapters,
                },
                userAddress,
                fee,
                deadline.toString(),
                parseInt(signature.substring(2).substring(128, 130), 16),
                Web3.utils.hexToBytes(`0x${signature.substring(2).substring(0, 64)}`),
                Web3.utils.hexToBytes(`0x${signature.substring(2).substring(64, 128)}`)
              )
              .send({ from: userAddress });
            return tx;
          }
        } catch {
          try {
            if (new BigNumber(approvedBalance).lt(trade.amounts[0])) {
              await tokenContract.methods.approve(yakRouterAddress, MaxUint256).send({ from: userAddress });
            }

            if (toAVAX) {
              const tx = await yakRouterContract.methods
                .swapNoSplitToAVAX(
                  {
                    amountIn: trade.amounts[0],
                    amountOut: trade.amounts[trade.amounts.length - 1],
                    path: trade.path,
                    adapters: trade.adapters,
                  },
                  userAddress,
                  fee
                )
                .send({ from: userAddress });
              return tx;
            } else {
              const tx = await yakRouterContract.methods
                .swapNoSplit(
                  {
                    amountIn: trade.amounts[0],
                    amountOut: trade.amounts[trade.amounts.length - 1],
                    path: trade.path,
                    adapters: trade.adapters,
                  },
                  userAddress,
                  fee
                )
                .send({ from: userAddress });
              return tx;
            }
          } catch (err) {
            console.error('swap', err);
            return false;
          }
        }
      }
    } catch (err) {
      console.log('swap', err);
      return false;
    }
  }
};

const version = '1';
const types = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Permit: [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ],
};

async function getPermitParams(payload: any) {
  // Approval function for EIP-712
  // Note: this solution uses provider.sent("eth_signTypedData_v4", ...)
  // instead of experimental _signTypedData. This is not supported by Ledger
  // and Trezor. There is no fallback for normal approvals.
  // See https://github.com/ethers-io/ethers.js/issues/298
  const { tokenContract, account, chainId, spender, amount, deadline } = payload;

  const name = await tokenContract.methods.name().call(); // token name
  const verifyingContract = tokenContract.options.address;

  const nonce = await tokenContract.nonces(account).call();

  const domain = {
    name,
    version,
    chainId,
    verifyingContract,
  };

  const value = {
    owner: account,
    spender: spender,
    value: amount.toString(),
    nonce: nonce.toString(),
    deadline: deadline.toString(),
  };

  const msgParams = JSON.stringify({
    types,
    domain,
    primaryType: 'Permit',
    message: value,
  });

  const params = [account, msgParams];
  return params;
}
