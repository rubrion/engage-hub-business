import i18n from 'i18next';
import { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enResources from './i18n/locales/en';
import esResources from './i18n/locales/es';
import ptResources from './i18n/locales/pt';
import { debugLog } from './utils/debugControl';

interface ResourceObject {
  screens?: Record<string, unknown>;
  [key: string]: unknown;
}

const processScreenResources = (resources: ResourceObject): ResourceObject => {
  if (!resources.screens) {
    resources.screens = {};
  }

  return resources;
};

const en = processScreenResources(enResources);
const es = processScreenResources(esResources);
const pt = processScreenResources(ptResources);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, es, pt },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    returnNull: false,
    returnEmptyString: false,

    interpolation: {
      escapeValue: false,
    },
  } as InitOptions);

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng.split('-')[0]);
  debugLog(`Language changed to: ${lng}`);

  const event = new CustomEvent('i18n-language-changed', {
    detail: { language: lng },
  });
  document.dispatchEvent(event);
});

// Make i18next available globally for utilities
if (typeof window !== 'undefined') {
  window.i18next = i18n;
}

export default i18n;
