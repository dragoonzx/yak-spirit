import { HelmetProvider } from 'react-helmet-async';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '~/locales/en/index.json';
import ruTranslation from '~/locales/ru/index.json';
import zhTranslation from '~/locales/zh/index.json';
import { Router } from '../router/Router';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
    zh: {
      translation: zhTranslation,
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
      <Router />
    </HelmetProvider>
  );
};
