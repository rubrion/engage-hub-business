import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { debugLog, debugWarn } from '../utils/debugControl';
import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';

const resources = {
  en,
  es,
  pt,
};

// Configure i18next
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: {
      default: ['en'],
      es: ['en'],
      pt: ['en'],
    },
    debug: process.env.NODE_ENV === 'development',

    // Better fallback behavior
    fallbackNS: 'common',
    defaultNS: 'common',

    // Language handling improvements
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,

    // Never return empty translations
    returnEmptyString: false,
    returnNull: false,

    // Return keys when translations are missing to help debug
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      debugWarn(`Missing translation: ${key} in ${ns} for language ${lng}`);
    },

    interpolation: {
      escapeValue: false,
    },

    // Define all namespaces
    ns: ['common', 'navigation', 'screens', 'data'],

    react: {
      useSuspense: false, // Disable suspense to prevent delays in rendering
      bindI18n: 'languageChanged', // Events that trigger a re-render
      bindI18nStore: 'added', // Events that trigger a re-render
    },
  });

// Custom handler for language changes
const handleLanguageChanged = (lng: string) => {
  document.documentElement.setAttribute('lang', lng.split('-')[0]);
  debugLog(`Language changed to: ${lng}`);

  // Dispatch custom event for components to refresh
  const event = new CustomEvent('i18n-language-changed', {
    detail: { language: lng },
  });
  document.dispatchEvent(event);

  // Refresh the page's content
  setTimeout(() => {
    // Force React to re-evaluate translations by updating a context value
    document.dispatchEvent(new Event('i18n-refresh-content'));
  }, 0);
};

// Register the handler
i18n.on('languageChanged', handleLanguageChanged);

export default i18n;
