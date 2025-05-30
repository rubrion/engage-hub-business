import { setupWorker } from 'msw/browser';

import { debugLog, shouldUseMockData } from '../utils/debugControl';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function initMsw() {
  if (!shouldUseMockData()) {
    debugLog('MSW is disabled based on configuration');
    window.__IS_MSW_ACTIVE__ = false;
    return false;
  }

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: { scope: '/' },
      },
    });
    window.__IS_MSW_ACTIVE__ = true;
    debugLog('Mock Service Worker initialized');
    return true;
  } catch (error) {
    console.error('Failed to start MSW:', error);
    window.__IS_MSW_ACTIVE__ = false;
    return false;
  }
}

export const isMswRunning = () => {
  return Boolean(
    navigator.serviceWorker?.controller?.scriptURL?.includes(
      'mockServiceWorker.js'
    )
  );
};

debugLog('MSW handlers registered:', handlers.length);
