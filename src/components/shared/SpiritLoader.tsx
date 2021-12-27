import classNames from 'classnames';
import loading from '~/assets/gif/loading-unscreen.gif';

const SpiritLoader = ({ size = 'medium', className }: { size: 'small' | 'medium' | 'big'; className?: string }) => {
  const sizeClass = {
    small: 'h-8',
    medium: 'h-16',
    big: 'h-32',
  }[size];

  return <img src={loading} className={classNames(sizeClass, className)} />;
};

export default SpiritLoader;
