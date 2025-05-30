import React, { createContext } from 'react';

// Define available languages
export const AVAILABLE_LANGUAGES = ['en', 'es', 'pt'] as const;
export type SupportedLanguage = (typeof AVAILABLE_LANGUAGES)[number];

// Update the context type to include language property
export interface LanguageContextType {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  isRtl: boolean;
}

export const defaultLanguage: SupportedLanguage = 'en';

// Create the context with proper types
export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  changeLanguage: () => {},
  isRtl: false,
});

export interface LanguageProviderProps {
  children: React.ReactNode;
}
