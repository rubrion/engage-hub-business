# Theming System

This document describes the theming system in the Rubrion Web Client Template, which is built on top of Material UI's theming capabilities.

## Overview

The theming system provides:

- Light and dark mode support
- Customizable color palettes
- Typography scale
- Responsive breakpoints
- Component style overrides
- Custom theme extensions

## Theme Structure

The theme is defined in the `src/styles/theme.ts` file and follows Material UI's theme structure with custom extensions.

### Theme Provider

The application is wrapped with a custom `ThemeProvider` that manages theme state:

```tsx
// In App.tsx
<ThemeProvider>
  <div className="app-container">{/* Application content */}</div>
</ThemeProvider>
```

## Theme Definition

### Base Theme

The base theme defines common properties shared across light and dark modes:

```typescript
const baseTheme = {
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    // Other typography variants...
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [...customShadows],
  // Custom properties
  custom: {
    contentWidth: {
      max: '1200px',
      wide: '1600px',
    },
    // Other custom properties...
  },
};
```

### Light and Dark Modes

Separate theme objects for light and dark modes:

```typescript
const lightTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'light',
      primary: {
        main: '#2563eb',
        light: '#93c5fd',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#c4b5fd',
        dark: '#7c3aed',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        disabled: '#94a3b8',
      },
      // Other color definitions...
    },
    // Other light mode specific overrides...
  })
);

const darkTheme = createTheme(
  deepmerge(baseTheme, {
    palette: {
      mode: 'dark',
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#a78bfa',
        light: '#c4b5fd',
        dark: '#7c3aed',
        contrastText: '#ffffff',
      },
      background: {
        default: '#0f172a',
        paper: '#1e293b',
      },
      text: {
        primary: '#f1f5f9',
        secondary: '#cbd5e1',
        disabled: '#64748b',
      },
      // Other color definitions...
    },
    // Other dark mode specific overrides...
  })
);
```

## Component Style Overrides

The theme includes global component style overrides:

```typescript
// Example component style overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '10px 24px',
        fontWeight: 600,
      },
      contained: ({ theme }) => ({
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme.shadows[1],
        },
      }),
      // Other button variants...
    },
    variants: [
      {
        props: { variant: 'gradient' },
        style: ({ theme }) => ({
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.primary.contrastText,
        }),
      },
    ],
  },
  // Other component overrides...
};
```

These overrides are applied to the theme:

```typescript
// Apply component overrides to both themes
lightTheme.components = deepmerge(lightTheme.components || {}, components);
darkTheme.components = deepmerge(darkTheme.components || {}, components);
```

## Using the Theme

### Theme Hook

Access the theme and theme mode using the `useTheme` hook:

```tsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <div>
      <Button
        onClick={toggleTheme}
        startIcon={themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      >
        Switch to {themeMode === 'dark' ? 'Light' : 'Dark'} Mode
      </Button>

      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        Content with theme-aware colors
      </Box>
    </div>
  );
};
```

### Styled Components

Use the theme in styled components:

```tsx
import { styled } from '@mui/material/styles';

const StyledCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
  color: theme.palette.text.primary,
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Usage
const MyComponent = () => {
  return <StyledCard>Card content</StyledCard>;
};
```

### Sx Prop

Use the theme with the `sx` prop:

```tsx
import { Box, Typography } from '@mui/material';

const MyComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Title
      </Typography>
    </Box>
  );
};
```

## Responsive Theming

The theme includes responsive breakpoints for different screen sizes:

```typescript
// Access breakpoints in your components
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'block',
        },
      }}
    >
      {/* Content */}
    </Box>
  );
};
```

## Custom Theme Properties

The theme includes custom properties for application-specific settings:

```typescript
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      contentWidth: {
        max: string;
        wide: string;
      };
      navbarHeight: {
        mobile: number;
        desktop: number;
      };
      transitions: {
        duration: {
          slow: number;
          medium: number;
          fast: number;
        };
      };
      gradients: {
        primary: string;
        secondary: string;
      };
      cards: {
        borderRadius: number;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      contentWidth?: {
        max?: string;
        wide?: string;
      };
      navbarHeight?: {
        mobile?: number;
        desktop?: number;
      };
      transitions?: {
        duration?: {
          slow?: number;
          medium?: number;
          fast?: number;
        };
      };
      gradients?: {
        primary?: string;
        secondary?: string;
      };
      cards?: {
        borderRadius?: number;
      };
    };
  }
}
```

Usage of custom theme properties:

```tsx
const ContentContainer = styled('div')(({ theme }) => ({
  maxWidth: theme.custom.contentWidth.max,
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

const WideContentContainer = styled('div')(({ theme }) => ({
  maxWidth: theme.custom.contentWidth.wide,
  margin: '0 auto',
  padding: theme.spacing(2),
}));
```

## Theme Persistence

The user's theme preference is persisted in local storage:

```typescript
// In ThemeContext.tsx
const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
  // Check if there's a saved preference in localStorage
  const savedTheme = localStorage.getItem('theme-mode');

  // If there's a valid saved preference, use it
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  // Otherwise, use system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
});

// Update localStorage when theme changes
useEffect(() => {
  localStorage.setItem('theme-mode', themeMode);
}, [themeMode]);
```

## System Preference Detection

The theme system can detect and respond to the user's system preference:

```typescript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Update theme when system preference changes
  const handleChange = (e: MediaQueryListEvent) => {
    if (followSystemTheme) {
      setThemeMode(e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, [followSystemTheme]);
```

## Performance Considerations

To prevent unnecessary re-renders, theme is memoized:

```typescript
// In ThemeContext.tsx
const currentTheme = useMemo(() => {
  return themeMode === 'dark' ? darkTheme : lightTheme;
}, [themeMode]);
```

## Best Practices

1. **Use Theme Colors**: Always use theme palette colors instead of hardcoded values
2. **Responsive Design**: Use theme breakpoints for responsive styling
3. **Custom Properties**: Extend the theme with custom properties for application-specific settings
4. **Component Variants**: Use component variants for consistent styling
5. **Nested Themes**: You can create nested themes for specific sections of your application
6. **Testing**: Include tests for both light and dark modes

## Theme Debugging

A theme debug utility is available in development mode:

```tsx
import { ThemeInspector } from '../components/debug/ThemeInspector';

// In your component
if (process.env.NODE_ENV === 'development') {
  return (
    <>
      <Component />
      <ThemeInspector />
    </>
  );
}
```

## Conclusion

The theming system provides a comprehensive solution for creating consistent, adaptive, and beautiful user interfaces. By leveraging Material UI's theming capabilities and extending them with custom properties and utilities, you can create unique designs that maintain consistency across your application.
