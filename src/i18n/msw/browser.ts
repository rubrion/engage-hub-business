import { setupWorker } from 'msw/browser';

import { debugError, debugLog } from '../../utils/debugControl';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function initMswForI18n() {
  if (!import.meta.env.DEV) {
    debugLog('MSW is disabled in production');
    return false;
  }

  const useMSW = localStorage.getItem('useMSW');
  if (useMSW === 'false') {
    debugLog('MSW is disabled based on localStorage preference');
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
    debugLog('MSW initialized for i18n API mocking');
    return true;
  } catch (error) {
    debugError('Failed to start MSW for i18n:', error);
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
