import { useTheme } from '@mui/material/styles';

import { getThemeValue } from './themeUtils';

/**
 * Custom hook to easily access theme values and color constants
 * throughout the application
 */
export const useThemeValues = () => {
  const theme = useTheme();

  return {
    /**
     * Get a color value from the theme or color constants
     * @param path - Path to the color (e.g., 'primary.main', 'text.primary')
     * @param fallback - Optional fallback color
     */
    color: (path: string, fallback?: string): string =>
      getThemeValue(theme, path, fallback),

    /**
     * Get a spacing value in pixels
     * @param multiplier - Multiply the base spacing unit
     */
    spacing: (multiplier: number) => theme.spacing(multiplier),

    /**
     * Check if the current theme is in dark mode
     */
    isDarkMode: theme.palette.mode === 'dark',

    /**
     * Provides direct access to the theme object
     */
    theme,
  };
};

export default useThemeValues;
