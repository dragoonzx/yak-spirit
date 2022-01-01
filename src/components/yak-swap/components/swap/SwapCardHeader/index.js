import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useSnapshot } from 'valtio';
import { syncState, userState } from '../../../state/index.js';
import { AVALANCHE_CHAIN_ID } from '../../../utils/constants.js';
import SwapSettings from '../SwapSettings/index.js';
const customGhostBtnStyle = {
    paddingLeft: '6px',
    paddingRight: '6px',
    height: '36px',
    minHeight: '26px',
    width: '36px',
};
const handleChainChanged = () => {
    window.location.reload();
};
const SwapCardHeader = ({ onSettingsChange, getSyncPrices }) => {
    const { timerKey, sync } = useSnapshot(syncState);
    const [chainId, setChainId] = useState(0);
    useEffect(() => {
        const getChainId = async () => {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(chainId);
            userState.chainId = chainId;
        };
        getChainId();
    }, []);
    useEffect(() => {
        window.ethereum.on('chainChanged', handleChainChanged);
        return () => {
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("h2", { className: "font-bold flex items-center", children: ["Swap Tokens", Number(chainId) !== AVALANCHE_CHAIN_ID ? (_jsx("button", { "data-tip": "wrong network", type: "button", className: "btn btn-ghost text-error tooltip tooltip-bottom ml-2", style: customGhostBtnStyle, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }, void 0) }, void 0) }, void 0)) : null] }, void 0), _jsxs("div", { className: "flex items-center", children: [_jsx("button", { type: "button", className: "btn btn-ghost mr-1", style: customGhostBtnStyle, children: _jsx(CountdownCircleTimer, { isPlaying: sync, duration: 12, colors: [
                                ['#1eb854', 0.33],
                                ['#1fd65f', 0.33],
                                ['#1eb854', 0.33],
                            ], size: 18, strokeWidth: 3, onComplete: () => getSyncPrices() }, timerKey) }, void 0), _jsx(SwapSettings, { onSettingsChange: onSettingsChange, btnStyle: customGhostBtnStyle }, void 0)] }, void 0)] }, void 0));
};
export default SwapCardHeader;
