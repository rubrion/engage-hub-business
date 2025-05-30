import { useContext } from 'react';

import { ThemeContext, ThemeContextType } from '../context/themeContextUtils';

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

export type { ThemeContextType };
