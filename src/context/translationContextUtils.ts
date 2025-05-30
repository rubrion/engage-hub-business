import React, { createContext } from 'react';

interface TranslationState {
  isLoading: boolean;
  hasError: boolean;
  errorDetails: string | null;
}

export interface TranslationContextType {
  getContent: <T>(namespace: string, key: string) => T;
  translationState: TranslationState;
  resetError: () => void;
  missingKeys: string[];
}

export const TranslationContext = createContext<TranslationContextType>({
  getContent: () => {
    throw new Error('Not implemented');
  },
  translationState: {
    isLoading: false,
    hasError: false,
    errorDetails: null,
  },
  resetError: () => {},
  missingKeys: [],
});

export interface TranslationProviderProps {
  children: React.ReactNode;
}
