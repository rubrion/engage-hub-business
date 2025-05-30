import { createTheme, PaletteMode } from '@mui/material/styles';

import { commonColors, primaryColors, slateColors } from './colors';
import { borderRadius, buttonSizes, shadows, transitions } from './themeUtils';

const palette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: primaryColors.blue.light,
    light: primaryColors.blue.lighter,
    dark: primaryColors.blue.main,
    contrastText: commonColors.white,
  },
  secondary: {
    main: primaryColors.indigo.light,
    light: primaryColors.indigo.lighter,
    dark: primaryColors.indigo.main,
    contrastText: commonColors.white,
  },
  background: {
    default: slateColors[900],
    paper: slateColors[800],
  },
  text: {
    primary: slateColors[100],
    secondary: slateColors[300],
  },
};

const darkTheme = createTheme({
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
          background: slateColors[900],
        },
        '::-webkit-scrollbar-thumb': {
          background: slateColors[700],
          borderRadius: borderRadius.xs,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: slateColors[600],
        },
      },
    },
  },
});

export default darkTheme;
