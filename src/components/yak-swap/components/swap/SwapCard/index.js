import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
// import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { fetchOnchainPrices } from '../../../api/fetchPrices.js';
import { toBaseUnit } from '../../../utils/toBaseUnit.js';
import { tokenList as defaultTokenList } from '../../../api/tokenList.js';
import { BigNumber } from 'bignumber.js';
import { useDebounce } from 'react-use';
import { WAVAX, YIELD_YAK_PLATFORM, ZERO_ADDRESS } from '../../../utils/constants.js';
import SwapCardHeader from '../SwapCardHeader/index.js';
import SwapCardFooter from '../SwapCardFooter/index.js';
import SwapCardButton from '../SwapCardButton/index.js';
import SwapCardInputs from '../SwapCardInputs/index.js';
import SwapCardInputsSwapper from '../SwapCardInputsSwapper/index.js';
import { swapOfferState, swapSettings, swapState, syncState, useSnapshot } from '../../../state/index.js';
import { getUsdPrices } from '../../../api/getUsdPrices.js';
export const SwapCard = (props) => {
    // const { data: avgGasArr } = useMoralisCloudFunction('getAvgGas');
    const tokenList = props.tokenList ?? defaultTokenList;
    const [usdPrices, setUsdPrices] = useState(null);
    const [gasEstimate, setGasEstimate] = useState('');
    const getPrices = useCallback(async () => {
        swapState.loading = true;
        props.onQuotesLoading && props.onQuotesLoading(true);
        syncState.sync = false;
        if (!swapState.amountIn) {
            swapState.loading = false;
            props.onQuotesLoading && props.onQuotesLoading(false);
            syncState.sync = true;
            return;
        }
        const x = await fetchOnchainPrices({
            fromToken: swapState.tokenIn.address === ZERO_ADDRESS ? WAVAX : swapState.tokenIn.address,
            toToken: swapState.tokenOut.address === ZERO_ADDRESS ? WAVAX : swapState.tokenOut.address,
            // @ts-expect-error: toBN should eat BigNumber
            amountIn: Web3.utils.toBN(toBaseUnit(String(swapState.amountIn), swapState.tokenIn.decimals)),
        });
        const results = x.map((v) => {
            return {
                ...v,
                formattedAmountOut: !new BigNumber(v.amountOut).isZero()
                    ? // TODO: check small numbers
                        new BigNumber(v.amountOut).div(new BigNumber(10).pow(swapState.tokenOut.decimals)).toFixed(8)
                    : 0,
            };
        });
        props.onOfferReceive &&
            props.onOfferReceive({
                tokens: {
                    tokenIn: swapState.tokenIn,
                    tokenOut: swapState.tokenOut,
                },
                results,
            });
        const amountOutValues = results.map((v) => Number(v.formattedAmountOut));
        swapState.amountOut = Math.max(...amountOutValues);
        results.sort((dexA, dexB) => Number(dexB.formattedAmountOut) - Number(dexA.formattedAmountOut));
        const yakOffer = x?.find((v) => v.platform === YIELD_YAK_PLATFORM)?.yakOffer;
        swapOfferState.yakOffer = yakOffer;
        yakOffer?.gasEstimate && setGasEstimate(yakOffer.gasEstimate);
        const prices = await getUsdPrices(swapState.tokenIn.address, swapState.tokenOut.address);
        setUsdPrices(prices);
        syncState.timerKey += 1;
        syncState.sync = true;
        swapState.loading = false;
        props.onQuotesLoading && props.onQuotesLoading(false);
    }, [
        props.onQuotesLoading,
        swapState.tokenIn,
        swapState.tokenOut,
        swapState.amountIn,
        swapState.amountOut,
        props.onOfferReceive,
    ]);
    const getSyncPrices = useCallback(() => {
        // getPrices();
        return [false, 0];
    }, [getPrices]);
    const swapSnap = useSnapshot(swapState);
    const swapSettingsSnap = useSnapshot(swapSettings);
    const [,] = useDebounce(async () => {
        await getPrices();
    }, 200, [swapSnap.tokenIn, swapSnap.tokenOut, swapSnap.amountIn, swapSettingsSnap.routers, swapSettingsSnap.slippage]);
    const marketPrice = usdPrices
        ? swapState.amountIn *
            usdPrices[swapState.tokenIn.address.toLowerCase() === ZERO_ADDRESS
                ? WAVAX.toLowerCase()
                : swapState.tokenIn.address.toLowerCase()]?.usd
        : null;
    const receivedPrice = useMemo(() => {
        return usdPrices
            ? swapState.amountOut *
                usdPrices[swapState.tokenOut.address.toLowerCase() === ZERO_ADDRESS
                    ? WAVAX.toLowerCase()
                    : swapState.tokenOut.address.toLowerCase()]?.usd
            : null;
    }, [swapState.amountOut, usdPrices]);
    const priceImpact = useMemo(() => {
        return marketPrice && receivedPrice ? (1 - receivedPrice / marketPrice) * 100 : 0;
    }, [receivedPrice]);
    const [gasPrice, setGasPrice] = useState(0);
    useEffect(() => {
        if (!usdPrices) {
            return;
        }
        const avgGas = 25;
        // const avgGasSum = (avgGasArr as any[]).reduce((prev, cur) => prev + cur.avgGas, 0);
        // const avgGas = avgGasSum / (avgGasArr as any[]).length;
        const gasInAVAX = Number(gasEstimate) * avgGas * 10 ** -9;
        setGasPrice(gasInAVAX);
    }, [usdPrices, gasEstimate]);
    return (_jsx("div", { className: "card overflow-visible shadow-lg bg-base-200/100 w-full", children: _jsxs("div", { className: "card-body", children: [_jsx("div", { className: "flex items-center justify-between mb-6 -mt-4", children: _jsx(SwapCardHeader, { getSyncPrices: getSyncPrices, onSettingsChange: props.onSettingsChange }, void 0) }, void 0), _jsx("div", { className: "mb-4 space-x-2", children: _jsx(SwapCardInputs, { isSend: true, tokenList: tokenList, onTokenChange: props.onTokenChange, onAmountInChange: props.onAmountInChange, usdPrices: usdPrices, showUsdPrices: props.showUsdPrices }, void 0) }, void 0), _jsx("div", { className: "flex items-center justify-center h-12", children: _jsx(SwapCardInputsSwapper, {}, void 0) }, void 0), _jsx("div", { className: "mb-10 space-x-2", children: _jsx(SwapCardInputs, { tokenList: tokenList, onTokenChange: props.onTokenChange, onAmountInChange: props.onAmountInChange, usdPrices: usdPrices, showUsdPrices: props.showUsdPrices }, void 0) }, void 0), _jsx("div", { className: "w-full", children: _jsx(SwapCardButton, {}, void 0) }, void 0), _jsx("div", { className: "mt-4", children: _jsx(SwapCardFooter, { priceImpact: priceImpact, gasPrice: gasPrice, usdPrices: usdPrices, showUsdPrices: props.showUsdPrices }, void 0) }, void 0)] }, void 0) }, void 0));
};
