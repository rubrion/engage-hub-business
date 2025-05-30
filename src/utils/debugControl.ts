/**
 * Debug control system for application
 *
 * This file provides functions to control debug behaviors across the app,
 * making it easy to build with or without debug features.
 */

/**
 * Determines if debug features should be enabled
 *
 * This checks:
 * 1. If we're in development mode
 * 2. If debug mode is forced through localStorage or environment variables
 */
export const isDebugEnabled = (): boolean => {
  // Check environment - debug is only available in development by default
  const isDev = import.meta.env.DEV === true;

  // Check for forced debug mode either through localStorage or env variable
  const debugForced =
    localStorage.getItem('debugMode') === 'true' ||
    import.meta.env.VITE_FORCE_DEBUG === 'true';

  return isDev || debugForced;
};

/**
 * Determines if mocked data should be used regardless of environment
 *
 * This allows building production apps that still use mock data
 */
export const shouldUseMockData = (): boolean => {
  const forceMockInProd = import.meta.env.VITE_USE_MOCK_DATA === 'true';

  if (import.meta.env.DEV) {
    const localStorageSetting = localStorage.getItem('useMSW');
    if (localStorageSetting === 'true' || localStorageSetting === 'false') {
      return localStorageSetting === 'true';
    }

    return true;
  }

  // In production, only use mock if explicitly configured
  return forceMockInProd;
};

/**
 * Controlled console logging that only shows in debug mode
 */
export const debugLog = (message: string, ...args: unknown[]): void => {
  if (isDebugEnabled()) {
    console.log(`[Debug] ${message}`, ...args);
  }
};

/**
 * Controlled console warning that only shows in debug mode
 */
export const debugWarn = (message: string, ...args: unknown[]): void => {
  if (isDebugEnabled()) {
    console.warn(`[Debug] ${message}`, ...args);
  }
};

/**
 * Controlled console error that always shows (even in production)
 * but with different formatting based on environment
 */
export const debugError = (message: string, ...args: unknown[]): void => {
  // Always show errors, but format differently for production
  if (isDebugEnabled()) {
    console.error(`[Debug Error] ${message}`, ...args);
  } else {
    console.error(message, ...args);
  }
};
