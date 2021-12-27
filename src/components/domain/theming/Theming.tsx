import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import SpiritMenu from '~/components/shared/SpiritMenu';

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

  const setTheme = (theme: string) => {
    const htmlEl = document.querySelector('html');

    if (!htmlEl) {
      return;
    }

    htmlEl.dataset.theme = theme;
    setThemeLS(theme);
  };

  const menuBtn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block w-5 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const menuItems = (
    <div className="px-1 py-1 ">
      {themes.map(({ theme, title }) => (
        <Menu.Item key={theme}>
          {() => (
            <button
              onClick={() => setTheme(theme)}
              className={`${
                themeLS === theme ? 'bg-success/10 text-base-content' : 'text-base-content hover:btn-primary'
              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
            >
              {title}
            </button>
          )}
        </Menu.Item>
      ))}
    </div>
  );

  return <SpiritMenu menuBtn={menuBtn} menuItems={menuItems} />;
};

export default Theming;
