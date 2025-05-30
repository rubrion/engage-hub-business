import {
  commonColors,
  overlayColors,
  primaryColors,
  semanticColors,
  slateColors,
} from './colors';
import {
  borderRadius,
  gridSizes,
  sectionPadding,
  shadows,
  spacing,
  transitions,
} from './themeUtils';

export * from './colors';
export { default as darkTheme } from './darkTheme';
export { default as lightTheme } from './lightTheme';
export * from './themeUtils';

export const themeConstants = {
  spacing,
  borderRadius,
  shadows,
  gridSizes,
  transitions,
  sectionPadding,
  colors: {
    ...primaryColors,
    ...slateColors,
    ...semanticColors,
    ...commonColors,
    ...overlayColors,
  },
};
