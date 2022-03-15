import { Menu } from '@headlessui/react';
import { useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import SpiritMenu from '~/components/shared/SpiritMenu';

const themes = [
  {
    title: 'forest',
    theme: 'forest',
    color: '#3CE17D',
  },
  { title: 'dark', theme: 'dark', color: 'hsl(259 94% 61%)' },
  { title: 'light', theme: 'light', color: 'hsl(259 94.4% 51.2%)' },
  { title: 'bumblebee', theme: 'bumblebee', color: 'hsl(50 94.4% 58%)' },
  { title: 'Emerald', theme: 'emerald', color: 'hsl(141 50% 60%)' },
  { title: 'synthwave', theme: 'synthwave', color: 'hsl(321 69.6% 69%)' },
  { title: 'valentine', theme: 'valentine', color: 'hsl(353 73.8% 67.1%)' },
  { title: 'lofi', theme: 'lofi', color: 'hsl(0 0% 50.2%)' },
  { title: 'pastel', theme: 'pastel', color: 'hsl(284 21.6% 80%)' },
  { title: 'Wireframe', theme: 'wireframe', color: 'hsl(0 0% 72.2%)' },
  { title: 'luxury', theme: 'luxury', color: '#dca54b' },
  { title: 'dracula', theme: 'dracula', color: 'hsl(330 100% 85.1%)' },
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
      {themes.map(({ theme, title, color }) => (
        <Menu.Item key={theme}>
          {() => (
            <button
              onClick={() => setTheme(theme)}
              className={`${
                themeLS === theme ? 'bg-success/10 text-base-content' : 'text-base-content hover:btn-primary'
              } group flex rounded-md items-center w-full px-2 py-2 text-sm capitalize`}
            >
              <span className="h-2 w-2  rounded-full mr-2" style={{ backgroundColor: color }} />
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
