import type { HttpHandler } from 'msw';
import type { SetupWorker } from 'msw/browser';

import { debugLog, shouldUseMockData } from '../utils/debugControl';

// Use proper MSW types
type MockWorker = SetupWorker;

let mockWorker: MockWorker | null = null;

export async function getMockWorker(): Promise<MockWorker | null> {
  if (typeof window === 'undefined') {
    // Node.js environment (testing)
    debugLog('MSW: Running in Node.js environment, no worker available');
    return null;
  }

  if (!shouldUseMockData()) {
    debugLog('MSW: Disabled based on configuration');
    return null;
  }

  if (!mockWorker) {
    try {
      // Dynamic import to avoid loading in Node.js
      const { worker } = await import('./browser');
      mockWorker = worker;
    } catch (error) {
      debugLog('MSW: Failed to load worker', error);
      return null;
    }
  }

  return mockWorker;
}

export async function startMockWorker() {
  const worker = await getMockWorker();
  if (worker) {
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
        options: { scope: '/' },
      },
    });
  }
  return Promise.resolve();
}

export async function stopMockWorker() {
  const worker = await getMockWorker();
  if (worker) {
    worker.stop();
  }
}

export async function resetMockHandlers() {
  const worker = await getMockWorker();
  if (worker) {
    worker.resetHandlers();
  }
}

export async function useMockHandlers(...handlers: HttpHandler[]) {
  const worker = await getMockWorker();
  if (worker) {
    worker.use(...handlers);
  }
}
