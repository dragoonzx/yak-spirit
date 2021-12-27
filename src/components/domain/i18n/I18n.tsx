import { Menu } from '@headlessui/react';
import SpiritMenu from '~/components/shared/SpiritMenu';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'react-use';
import { useEffect } from 'react';

const languages = [
  {
    title: '🇺🇸 English',
    language: 'en',
  },
  {
    title: '🇷🇺 Русский',
    language: 'ru',
  },
  {
    title: '🇨🇳 简体中文',
    language: 'cn',
  },
];

const I18n = () => {
  const [langLS, setLangLS] = useLocalStorage('lang', 'en');

  useEffect(() => {
    if (langLS === 'en') {
      return;
    }

    i18n.changeLanguage(langLS);
  }, []);

  const { i18n } = useTranslation();

  const setLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangLS(lng);
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
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      />
    </svg>
  );

  const menuItems = (
    <div className="px-1 py-1 ">
      {languages.map(({ language, title }) => (
        <Menu.Item key={language}>
          {() => (
            <button
              onClick={() => setLanguage(language)}
              className={`${
                language === langLS ? 'bg-success/10 text-base-content' : 'text-base-content hover:btn-primary'
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

export default I18n;
