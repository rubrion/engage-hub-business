import { PaletteMode } from '@mui/material';
import React, { createContext } from 'react';

export interface ThemeContextType {
  themeMode: PaletteMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'dark',
  toggleTheme: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}
