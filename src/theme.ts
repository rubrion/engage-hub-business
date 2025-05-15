export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  radii: ThemeRadii;
}

export const darkTheme: Theme = {
  colors: {
    primary: '#646cff',
    secondary: '#535bf2',
    background: '#242424',
    surface: 'rgba(255, 255, 255, 0.05)',
    text: 'rgba(255, 255, 255, 0.87)',
    textSecondary: '#888',
    border: 'rgba(255, 255, 255, 0.1)',
    error: '#e63946',
    success: '#2ecc71',
    warning: '#f39c12',
  },
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    xxl: '3rem', // 48px
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.25rem', // 20px
      xl: '1.5rem', // 24px
      xxl: '2.5rem', // 40px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
};

export const lightTheme: Theme = {
  ...darkTheme,
  colors: {
    primary: '#646cff',
    secondary: '#535bf2',
    background: '#ffffff',
    surface: 'rgba(0, 0, 0, 0.05)',
    text: '#213547',
    textSecondary: '#555',
    border: 'rgba(0, 0, 0, 0.1)',
    error: '#e63946',
    success: '#2ecc71',
    warning: '#f39c12',
  },
};
