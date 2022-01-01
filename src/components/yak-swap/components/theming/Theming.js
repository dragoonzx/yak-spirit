import { jsx as _jsx } from "react/jsx-runtime";
import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import SpiritMenu from '../../components/shared/SpiritMenu.js';
const themes = [
    {
        title: '🌲  forest',
        theme: 'forest',
    },
    { title: '🌚  dark', theme: 'dark' },
    { title: '🌝  light', theme: 'light' },
    { title: '🐝  bumblebee', theme: 'bumblebee' },
    { title: '✳️  Emerald', theme: 'emerald' },
    { title: '🌃  synthwave', theme: 'synthwave' },
    { title: '👴  retro', theme: 'retro' },
    { title: '🌸  valentine', theme: 'valentine' },
    { title: '👓  lofi', theme: 'lofi' },
    { title: '🖍  pastel', theme: 'pastel' },
    { title: '📝  Wireframe', theme: 'wireframe' },
    { title: '💎  luxury', theme: 'luxury' },
    { title: '🧛‍♂️  dracula', theme: 'dracula' },
];
const Theming = () => {
    const [themeLS, setThemeLS] = useLocalStorage('theme', 'forest');
    useEffect(() => {
        const htmlEl = document.querySelector('html');
        if (!htmlEl) {
            return;
        }
        htmlEl.dataset.theme = themeLS;
    }, []);
    const setTheme = (theme) => {
        const htmlEl = document.querySelector('html');
        if (!htmlEl) {
            return;
        }
        htmlEl.dataset.theme = theme;
        setThemeLS(theme);
    };
    const menuBtn = (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "inline-block w-5 stroke-current", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }, void 0) }, void 0));
    const menuItems = (_jsx("div", { className: "px-1 py-1 ", children: themes.map(({ theme, title }) => (_jsx(Menu.Item, { children: () => (_jsx("button", { onClick: () => setTheme(theme), className: `${themeLS === theme ? 'bg-success/10 text-base-content' : 'text-base-content hover:btn-primary'} group flex rounded-md items-center w-full px-2 py-2 text-sm`, children: title }, void 0)) }, theme))) }, void 0));
    return _jsx(SpiritMenu, { menuBtn: menuBtn, menuItems: menuItems }, void 0);
};
export default Theming;
