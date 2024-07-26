import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from './en/translation.json';
import translation_pl from './pl/translation.json';

const resources = {
  en: {
    translation: translation_en,
  },
  pl: {
    translation: translation_pl,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',

    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
