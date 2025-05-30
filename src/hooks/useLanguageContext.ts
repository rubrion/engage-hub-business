import { useContext } from 'react';

import {
  AVAILABLE_LANGUAGES,
  LanguageContext,
  LanguageContextType,
  SupportedLanguage,
} from '../context/languageContextUtils';

export const useLanguage = (): LanguageContextType =>
  useContext(LanguageContext);

export { AVAILABLE_LANGUAGES };
export type { LanguageContextType, SupportedLanguage };
