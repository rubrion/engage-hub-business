import { resolveTenant } from './core/tenantUtils';
import { shouldUseMockData } from './utils/debugControl';

declare global {
  interface Window {
    __IS_MSW_ACTIVE__?: boolean;
    env?: Record<string, string>;
  }
}

/**
 * Get an environment variable with fallback to window.env or default value
 */
export const getEnvVariable = (key: string, defaultValue = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const value = import.meta.env[key];
      if (value !== undefined) return value;
    }
  } catch {
    // Silent catch - import.meta might not be available
  }

  if (typeof window !== 'undefined') {
    const windowEnv = window.env || {};
    if (windowEnv[key] !== undefined) {
      return windowEnv[key];
    }
  }

  return defaultValue;
};

/**
 * Get stored data source preference from localStorage
 * This now always checks localStorage directly to ensure fresh values
 */
export function getStoredPreference(
  key: string,
  defaultValue: boolean
): boolean {
  if (typeof window === 'undefined') return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored === 'true') return true;
  if (stored === 'false') return false;
  return defaultValue;
}

/**
 * API base URL from environment with tenant support
 * @param tenant Optional tenant override
 */
export function getApiBaseUrl(tenant?: string): string {
  const baseUrl = getEnvVariable('VITE_API_URL', '');
  const currentTenant = tenant || resolveTenant();

  return baseUrl.replace('{tenant}', currentTenant);
}

/**
 * Feature flags with tenant configuration
 * Base flags can be overridden by tenant configuration
 */
export const FEATURES = {
  ENABLE_ANALYTICS: getEnvVariable('VITE_ENABLE_ANALYTICS') === 'true',
  ENABLE_NEWSLETTER:
    getEnvVariable('VITE_ENABLE_NEWSLETTER', 'true') !== 'false',
  MAINTENANCE_MODE: getEnvVariable('VITE_MAINTENANCE_MODE') === 'true',
  MULTI_TENANT: getEnvVariable('VITE_MULTI_TENANT', 'true') === 'true',
};

/**
 * Pagination settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 9,
  MAX_PAGE_SIZE: 50,
};

/**
 * Firebase collection paths
 */
export const COLLECTIONS = {
  TENANTS: 'tenants',
  BLOGS: 'blogs',
  PROJECTS: 'projects',
  TRANSLATIONS: 'translations',
};

/**
 * Get current data source mode - always checks localStorage to ensure fresh values
 *
 * @returns Current data source mode configuration
 */
export function getDataSourceMode() {
  // Use centralized mock data check that works in both dev and prod
  const isMswEnabled = shouldUseMockData();

  // Check for Firestore - only if MSW is not enabled
  const isFirestoreEnabled =
    !isMswEnabled && getEnvVariable('VITE_USE_FIRESTORE') === 'true';

  return {
    IS_MOCK: isMswEnabled,
    USE_FIRESTORE: isFirestoreEnabled,
  };
}

export const IS_MOCK = getDataSourceMode().IS_MOCK;
export const USE_FIRESTORE = getDataSourceMode().USE_FIRESTORE;

export const API_PAGE_LIMIT = PAGINATION.DEFAULT_PAGE_SIZE;
