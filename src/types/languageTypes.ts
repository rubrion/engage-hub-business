// Define available languages
export const AVAILABLE_LANGUAGES = ['en', 'es', 'pt'] as const;
export type SupportedLanguage = (typeof AVAILABLE_LANGUAGES)[number];

// Update the context type to include language property
export interface LanguageContextType {
  language: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  isRtl: boolean;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
}

export const defaultLanguage: SupportedLanguage = 'en';
