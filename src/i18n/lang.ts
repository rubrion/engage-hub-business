import {
  AVAILABLE_LANGUAGES,
  SupportedLanguage,
} from '../context/languageContextUtils';

export type Lang = SupportedLanguage;

/**
 * Extracts the language parameter from a URL search string
 * Returns a valid language code or falls back to 'en'
 *
 * @param search URL search parameters string
 * @returns A valid language code from AVAILABLE_LANGUAGES or 'en' as fallback
 */
export function getLangParam(search: string): Lang {
  const params = new URLSearchParams(search);
  const langParam = params.get('lang');

  if (langParam && AVAILABLE_LANGUAGES.includes(langParam as Lang)) {
    return langParam as Lang;
  }

  return 'en';
}

/**
 * Get the current language from various sources in order of priority:
 * 1. URL parameter
 * 2. localStorage
 * 3. browser preference
 * 4. default ('en')
 */
export function getCurrentLanguage(): Lang {
  // URL param has highest priority
  const urlLang = getLangParam(window.location.search);
  if (urlLang) {
    return urlLang;
  }

  // Then check localStorage
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && AVAILABLE_LANGUAGES.includes(storedLang as Lang)) {
    return storedLang as Lang;
  }

  // Try browser language
  const browserLang = navigator.language.split('-')[0] as Lang;
  if (AVAILABLE_LANGUAGES.includes(browserLang)) {
    return browserLang;
  }

  // Default fallback
  return 'en';
}
