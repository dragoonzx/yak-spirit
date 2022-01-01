import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
// const loadingGif = 'https://github.com/dragoonzx/yak-swap-ui/blob/master/src/assets/gif/loading-unscreen.gif';
const loadingGif = 'https://i.ibb.co/4MNvsVc/loading-unscreen.gif';
const SpiritLoader = ({ size = 'medium', className }) => {
    const sizeClass = {
        small: 'h-8',
        medium: 'h-16',
        big: 'h-32',
    }[size];
    return _jsx("img", { src: loadingGif, className: classNames(sizeClass, className) }, void 0);
};
export default SpiritLoader;
