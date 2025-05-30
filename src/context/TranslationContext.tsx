import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MissingTranslationError } from '../hooks/useLocalizedContent';
import {
  TranslationContext,
  TranslationProviderProps,
} from './translationContextUtils';

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [translationState, setTranslationState] = useState<{
    isLoading: boolean;
    hasError: boolean;
    errorDetails: string | null;
  }>({
    isLoading: true,
    hasError: false,
    errorDetails: null,
  });
  const [missingKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (i18n.isInitialized) {
      setTranslationState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [i18n.isInitialized]);

  const resetError = useCallback(() => {
    setTranslationState((prev) => ({
      ...prev,
      hasError: false,
      errorDetails: null,
    }));
  }, []);

  const getContent = useCallback(
    <T,>(namespace: string, key: string): T => {
      try {
        if (!i18n.isInitialized) {
          throw new Error(
            `i18n not initialized when getting ${namespace}:${key}`
          );
        }

        const result = i18n.t(`${key}`, { ns: namespace, returnObjects: true });

        if (typeof result === 'string' && result === key) {
          throw new MissingTranslationError(key, namespace);
        }

        return result as T;
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : `Unknown error getting ${namespace}:${key}`;

        setTranslationState({
          isLoading: false,
          hasError: true,
          errorDetails: errorMsg,
        });

        throw error;
      }
    },
    [i18n]
  );

  useEffect(() => {
    resetError();
  }, [i18n.language, resetError]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && missingKeys.size > 0) {
      console.warn('Missing translations:', Array.from(missingKeys));
    }
  }, [missingKeys]);

  return (
    <TranslationContext.Provider
      value={{
        getContent,
        translationState,
        resetError,
        missingKeys: Array.from(missingKeys),
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
