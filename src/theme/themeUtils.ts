import { Theme } from '@mui/material';

import {
  commonColors,
  overlayColors,
  primaryColors,
  semanticColors,
  slateColors,
} from './colors';

export const spacing = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
};

export const sectionPadding = {
  y: {
    small: 4,
    medium: 8,
    large: 12,
  },
  x: {
    small: 2,
    medium: 4,
    large: 6,
  },
};

export const gridSizes = {
  fullWidth: { xs: 12 },
  halfWidth: { xs: 12, sm: 6 },
  thirdWidth: { xs: 12, sm: 6, md: 4 },
  quarterWidth: { xs: 12, sm: 6, md: 3 },

  hero: {
    content: { xs: 12, md: 6 },
    image: { xs: 12, md: 6 },
  },

  responsive: {
    mobile: { xs: 12 },
    tablet: { xs: 12, sm: 6 },
    desktop: { xs: 12, sm: 6, md: 4 },
  },
};

export const borderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: '50%',
};

export const shadows = {
  card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  cardHover: '0 15px 30px rgba(0, 0, 0, 0.1)',
  button: '0 8px 15px rgba(0, 0, 0, 0.1)',
  dropdown: '0 5px 15px rgba(0, 0, 0, 0.08)',
  none: 'none',
};

export { overlayColors } from './colors';

export const buttonSizes = {
  small: {
    padding: '8px 16px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '10px 24px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 24px',
    fontSize: '1.125rem',
  },
};

export const transitions = {
  fast: 'all 0.2s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
};

export const layout = {
  navbarHeight: {
    xs: 64,
    sm: 80,
  },
  contentHeight: {
    small: 200,
    medium: 260,
    large: 320,
  },
  imageHeight: {
    xs: 260,
    md: 320,
  },
  logoWidth: 160,
  minContentHeight: 100,
  offset: {
    small: 20,
    medium: 50,
    large: 200,
  },
  dividerHeight: 2,
};

export const cardLayout = {
  margin: {
    default: '10px 10px 0 10px',
    partner: '20px',
  },
  content: {
    maxHeight: 300,
  },
  heights: {
    compact: {
      card: 290,
      name: 7,
      nameSubtitleContainer: 10,
      description: 7,
      socialLinksCollapsed: 0,
      socialLinksExpanded: 32,
      avatar: 8,
    },
    default: {
      card: undefined,
      name: 'auto',
      nameSubtitleContainer: 12,
      description: 10, // Increased from 8 to 10
      socialLinksCollapsed: 0,
      socialLinksExpanded: 40,
      avatar: 12,
    },
  },
  spacing: {
    avatarMargin: 1,
    nameTitleSpacing: 0.25,
    subtitleMargin: 0.5,
    descriptionMargin: 0.5,
    contentPadding: 2,
    compactContentPadding: 1,
    expandedMargin: 1,
  },
  opacity: {
    collapsed: 0,
    expanded: 1,
    hoveredCard: 0.8,
  },
  borderRadius: {
    container: 4,
  },
  borderWidth: 1,
  elevation: {
    default: 1,
    hovered: 4,
  },
  transform: {
    raised: 'translateY(-4px)',
    none: 'none',
  },
  lineHeight: {
    compact: 1.25,
  },
  webkitLines: {
    name: 3,
    descriptionCompact: 4,
    descriptionDefault: 6,
  },
  iconSizes: {
    compact: 'small',
    default: 'medium',
  },
  iconPadding: {
    compact: 0.75,
    default: 1.25,
  },
  cardWidth: 260,
  socialLinksGap: {
    compact: 0.5,
    default: 1,
  },
  backgroundOpacity: {
    locked: 0.03,
    descriptionLocked: 0.02,
  },
  scrollThreshold: 10,
  animation: {
    duration: 0.3,
  },
  slider: {
    arrowSize: 48,
    arrowTop: 'calc(50% - 30px)',
    arrowSide: 2,
    arrowTransform: 'translateY(-50%)',
    arrowBackgroundDefault: 'rgba(0, 0, 0, 0.5)',
    arrowBackgroundHover: 'rgba(0, 0, 0, 0.7)',
    arrowIndicatorSize: 12,
    arrowIndicatorBorderWidth: 3,
    arrowIndicatorTranslate: 2,
    paginationGap: 1,
    paginationDotSize: 8,
    paginationMarginTop: 2,
  },
  mediaAspectRatio: {
    partner: '100%',
    member: '75%',
  },
};

export const getSectionPadding = () => ({
  py: spacing.lg,
});

export const getCardShadow = () => ({
  boxShadow: shadows.card,
  transition: transitions.medium,
  '&:hover': {
    boxShadow: shadows.cardHover,
    transform: 'translateY(-5px)',
  },
});

export const breakpoints = {
  mobile: '@media (max-width: 600px)',
  tablet: '@media (max-width: 960px)',
  desktop: '@media (min-width: 961px)',
};

export const animationDurations = {
  short: 300,
  medium: 500,
  long: 1000,
};

export const animations = {
  fadeIn: {
    opacity: 0,
    y: 20,
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.6,
    },
  },
  fadeInRight: {
    opacity: 0,
    x: -20,
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      duration: 0.5,
    },
  },
  fadeInLeft: {
    opacity: 0,
    x: 20,
    animate: {
      opacity: 1,
      x: 0,
    },
    transition: {
      duration: 0.5,
    },
  },
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    animate: {
      opacity: 1,
      scale: 1,
    },
    transition: {
      duration: 0.5,
    },
  },
  floating: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

export const getContrastText = (backgroundColor: string) => {
  return backgroundColor.startsWith('#') && backgroundColor.length >= 7
    ? parseInt(backgroundColor.slice(1, 7), 16) > 0xffffff / 2
      ? commonColors.black
      : commonColors.white
    : commonColors.white;
};

export const getThemeValue = (
  theme: Theme,
  path: string,
  fallback?: string
): string => {
  try {
    const parts = path.split('.');
    let value: unknown = theme.palette;

    for (const part of parts) {
      if (
        value &&
        typeof value === 'object' &&
        part in (value as Record<string, unknown>)
      ) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return getColorConstant(path) || fallback || slateColors[500];
      }
    }

    return typeof value === 'string' ? value : fallback || slateColors[500];
  } catch (error) {
    console.warn(`Error getting theme value for path: ${path}`, error);
    return fallback || slateColors[500];
  }
};

function getColorConstant(path: string): string | undefined {
  const parts = path.split('.');

  const colorRoots: Record<string, Record<string, unknown>> = {
    primary: primaryColors,
    slate: slateColors,
    semantic: semanticColors,
    overlay: overlayColors,
    common: commonColors,
  };

  const rootKey = parts[0];
  if (rootKey in colorRoots) {
    let value: unknown = colorRoots[rootKey];
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      if (
        value &&
        typeof value === 'object' &&
        part in (value as Record<string, unknown>)
      ) {
        value = (value as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return typeof value === 'string' ? value : undefined;
  }

  return undefined;
}
