import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { startMockWorker } from './mocks/workerUtils';
import { shouldUseMockData } from './utils/debugControl';
import { debugLog, isDebugEnabled } from './utils/debugControl';
import {
  installNetworkDebugHooks,
  logDataSourceInfo,
} from './utils/debugUtils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

async function bootstrap() {
  if (shouldUseMockData()) {
    debugLog('Initializing Mock Service Worker');
    await startMockWorker();
  }

  if (isDebugEnabled()) {
    debugLog('Debug mode is active');
    installNetworkDebugHooks();
    logDataSourceInfo();
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

bootstrap();
