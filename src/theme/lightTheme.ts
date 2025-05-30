import { createTheme } from '@mui/material/styles';

import { commonColors, primaryColors, slateColors } from './colors';
import { borderRadius, buttonSizes, shadows, transitions } from './themeUtils';

const palette = {
  primary: {
    main: primaryColors.blue.main,
    light: primaryColors.blue.light,
    dark: primaryColors.blue.dark,
    contrastText: commonColors.white,
  },
  secondary: {
    main: primaryColors.indigo.main,
    light: primaryColors.indigo.light,
    dark: primaryColors.indigo.dark,
    contrastText: commonColors.white,
  },
  background: {
    default: slateColors[50],
    paper: commonColors.white,
  },
  text: {
    primary: slateColors[800],
    secondary: slateColors[600],
  },
};

const lightTheme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    overline: {
      letterSpacing: '0.15em',
      fontWeight: 600,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.sm,
          padding: buttonSizes.medium.padding,
          textTransform: 'none',
          fontWeight: 600,
          transition: transitions.medium,
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: shadows.button,
          },
        },
        contained: {
          boxShadow: shadows.none,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          overflow: 'hidden',
          boxShadow: shadows.card,
          transition: transitions.medium,
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: shadows.cardHover,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows.none,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowX: 'hidden',
          transition: transitions.medium,
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: slateColors[100],
        },
        '::-webkit-scrollbar-thumb': {
          background: slateColors[400],
          borderRadius: borderRadius.xs,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: slateColors[500],
        },
      },
    },
  },
});

export default lightTheme;
