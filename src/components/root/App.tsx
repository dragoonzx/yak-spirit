import { HelmetProvider } from 'react-helmet-async';
import Main from '~/components/root/Main';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '~/locales/en/index.json';
import ruTranslation from '~/locales/ru/index.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export const App = () => {
  return (
    <HelmetProvider>
      <Main />
    </HelmetProvider>
  );
};
