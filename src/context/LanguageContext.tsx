import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AVAILABLE_LANGUAGES,
  defaultLanguage,
  LanguageContext,
  LanguageProviderProps,
  SupportedLanguage,
} from './languageContextUtils';

/**
 * Language provider that handles language selection and persistence
 *
 * NOTE: This implementation uses localStorage for language persistence,
 * not URL parameters. This means:
 * - Language persists across page reloads in the same browser
 * - Links won't carry language information to new sessions or devices
 * - User language preferences reset on other devices/incognito sessions
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    const isValidLanguage = (
      lang?: string | null
    ): lang is SupportedLanguage => {
      return !!lang && AVAILABLE_LANGUAGES.includes(lang as SupportedLanguage);
    };

    const storedLang = localStorage.getItem('i18nextLng');
    if (isValidLanguage(storedLang)) {
      return storedLang;
    }

    // For first-time visits only, check URL parameter once
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (isValidLanguage(urlLang)) {
      return urlLang;
    }

    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (isValidLanguage(browserLang)) {
      return browserLang;
    }

    return defaultLanguage;
  });

  const [isRtl, setIsRtl] = useState(false);

  const changeLanguage = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  useEffect(() => {
    const isRtlLanguage = ['ar', 'he'].includes(language);
    setIsRtl(isRtlLanguage);
    document.documentElement.setAttribute('dir', isRtlLanguage ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};
