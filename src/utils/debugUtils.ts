import { IS_MOCK, USE_FIRESTORE } from '../config';
import { debugLog, isDebugEnabled } from './debugControl';

/**
 * Debug utility to log data source information
 */
export function logDataSourceInfo() {
  if (isDebugEnabled()) {
    const style =
      'background: #333; color: white; padding: 2px 5px; border-radius: 2px;';

    debugLog('%c[Data Source Info]', style);

    debugLog('Active Data Source:', IS_MOCK ? 'Mock (MSW)' : 'API');
    if (!IS_MOCK) {
      debugLog('API Type:', USE_FIRESTORE ? 'Firestore DB' : 'REST API');
    }

    debugLog('Configuration Flags:', {
      IS_MOCK,
      USE_FIRESTORE,
      MSW_ACTIVE: window.__IS_MSW_ACTIVE__,
    });

    debugLog('Local Storage Settings:', {
      useMSW: localStorage.getItem('useMSW'),
      dataSource: localStorage.getItem('dataSource'),
    });

    debugLog('Environment Variables:', {
      API_URL: import.meta.env.VITE_API_URL || 'Not set',
      USE_FIRESTORE_ENV: import.meta.env.VITE_USE_FIRESTORE || 'Not set',
      FIREBASE_CONFIG: import.meta.env.VITE_FIREBASE_CONFIG ? 'Set' : 'Not set',
    });
  }
}

export function installNetworkDebugHooks() {
  if (isDebugEnabled()) {
    const originalFetch = window.fetch;

    window.fetch = async function (...args) {
      const url = args[0];
      const urlString =
        typeof url === 'string'
          ? url
          : url instanceof Request
            ? url.url
            : url instanceof URL
              ? url.toString()
              : String(url);

      debugLog(`[Network] Fetch: ${urlString}`);

      try {
        const response = await originalFetch.apply(this, args);
        return response;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        console.error(`[Network] Fetch Error: ${errorMessage}`);
        throw error;
      }
    };

    debugLog('[Debug] Network monitoring installed');
  }
}
