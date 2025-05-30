import { useContext } from 'react';

import {
  TranslationContext,
  TranslationContextType,
} from '../context/translationContextUtils';

export const useTranslationContext = () => useContext(TranslationContext);

export type { TranslationContextType };
