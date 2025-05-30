import { i18n } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Define the custom event interface to properly type our event handling
interface LanguageChangedEvent extends Event {
  detail?: {
    language: string;
  };
}

export class MissingTranslationError extends Error {
  constructor(key: string, namespace: string) {
    super(`Missing translation for key: ${key} in namespace: ${namespace}`);
    this.name = 'MissingTranslationError';
  }
}

const globalMissingKeys = new Set<string>();

export interface LocalizedContentApi {
  getContent: <T>(k: string) => T;
  hasTranslation: (k: string) => boolean;
  currentLang: string;
  i18n: i18n;
  missingKeys: string[];
  allMissingKeys: string[];
}

/**
 * Enhanced hook to get localized content with error handling for missing translations
 * @param namespace The namespace to look for translations
 * @param prefix Optional prefix for the keys to look up (e.g. 'home' for 'home.title')
 * @returns Object with functions to get content and language info
 */
export function useLocalizedContent(
  namespace: string,
  prefix?: string
): LocalizedContentApi {
  const { t, i18n } = useTranslation(namespace);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [missingKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Typed wrapper – only place the DOM type appears.
    // This cast is needed to work around i18next's untyped event payload
    const languageListener: EventListener = (e) => {
      const evt = e as LanguageChangedEvent;
      const newLang = evt.detail?.language ?? i18n.language;
      if (newLang !== currentLang) setCurrentLang(newLang);
    };

    document.addEventListener('i18n-language-changed', languageListener);
    i18n.on('languageChanged', languageListener);

    return () => {
      document.removeEventListener('i18n-language-changed', languageListener);
      i18n.off('languageChanged', languageListener);
    };
  }, [i18n, currentLang]);

  const memT = useMemo(() => {
    return (key: string, options?: Record<string, unknown>) => {
      return t(key, options);
    };
  }, [t]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && missingKeys.size > 0) {
      console.warn(
        `Missing translations in ${namespace}${prefix ? `/${prefix}` : ''}: `,
        Array.from(missingKeys).join(', ')
      );
    }
  }, [missingKeys, namespace, prefix]);

  /**
   * Get content from translations with strict error handling
   * @throws MissingTranslationError if the translation is not found
   */
  const getContent = useCallback(
    <T>(key: string): T => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      try {
        const result = memT(fullKey, { returnObjects: true });

        if (
          typeof result === 'string' &&
          (result === fullKey || result === '')
        ) {
          throw new MissingTranslationError(fullKey, namespace);
        }

        return result as T;
      } catch (error) {
        console.error(`Translation error for ${fullKey}:`, error);
        throw error instanceof MissingTranslationError
          ? error
          : new MissingTranslationError(fullKey, namespace);
      }
    },
    [memT, prefix, namespace]
  );

  const hasTranslation = useCallback(
    (key: string): boolean => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const result = memT(fullKey, { returnObjects: false });
      return typeof result === 'string' && result !== fullKey && result !== '';
    },
    [memT, prefix]
  );

  const getMissingKeys = useCallback((): string[] => {
    return Array.from(missingKeys);
  }, [missingKeys]);

  const getAllMissingKeys = useCallback((): string[] => {
    return Array.from(globalMissingKeys);
  }, []);

  return {
    getContent,
    hasTranslation,
    currentLang,
    i18n,
    missingKeys: getMissingKeys(),
    allMissingKeys: getAllMissingKeys(),
  };
}

export default useLocalizedContent;
