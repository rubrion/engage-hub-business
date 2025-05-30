import './i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { startMockWorker } from './mocks/workerUtils';
import { debugError, debugLog, debugWarn } from './utils/debugControl';

async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    const useMSW = localStorage.getItem('useMSW');

    if (useMSW !== 'false') {
      try {
        const mswStarted = await startMockWorker();
        debugLog(
          `🔶 MSW initialization ${mswStarted ? 'successful' : 'skipped'}`
        );
      } catch (error) {
        debugError('Failed to initialize Mock Service Worker', error);
      }
    } else {
      debugLog('MSW is disabled based on localStorage preference');
      window.__IS_MSW_ACTIVE__ = false;
    }
  }

  const rootElement = document.getElementById('root');

  if (!rootElement) {
    debugError('Could not find root element to mount React app');
    const fallbackRoot = document.createElement('div');
    fallbackRoot.id = 'root';
    document.body.appendChild(fallbackRoot);
    debugWarn('Created fallback root element');

    const errorRoot = ReactDOM.createRoot(fallbackRoot);
    errorRoot.render(
      <div
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          margin: '20px',
        }}
      >
        <h2>Application Error</h2>
        <p>
          The application could not initialize properly. Could not find the root
          element.
        </p>
        <p>Please check your HTML template for an element with id="root".</p>
      </div>
    );
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    debugError('Failed to render React application:', error);
    const errorDiv = document.createElement('div');
    errorDiv.style.padding = '20px';
    errorDiv.style.margin = '20px';
    errorDiv.style.fontFamily = 'Arial, sans-serif';
    errorDiv.style.color = '#721c24';
    errorDiv.style.backgroundColor = '#f8d7da';
    errorDiv.style.border = '1px solid #f5c6cb';
    errorDiv.style.borderRadius = '4px';

    errorDiv.innerHTML = `
      <h2>Application Error</h2>
      <p>The application failed to initialize properly.</p>
      <p>Please check the console for detailed error information.</p>
    `;

    rootElement.appendChild(errorDiv);
  }
}

prepareApp().catch((error) => {
  debugError('Critical application initialization error:', error);

  const errorMessage = document.createElement('div');
  errorMessage.style.padding = '20px';
  errorMessage.style.margin = '20px';
  errorMessage.style.fontFamily = 'Arial, sans-serif';
  errorMessage.style.color = '#721c24';
  errorMessage.style.backgroundColor = '#f8d7da';
  errorMessage.style.border = '1px solid #f5c6cb';
  errorMessage.style.borderRadius = '4px';

  errorMessage.innerHTML = `
    <h2>Critical Application Error</h2>
    <p>The application could not be initialized.</p>
    <p>Error: ${error?.message || 'Unknown error'}</p>
  `;

  document.body.appendChild(errorMessage);
});
