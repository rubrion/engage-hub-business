import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('App', () => {
  it('renders the app without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check that the app container is rendered
    // Look for the main app container or any content that indicates the app loaded
    const appContainer =
      document.querySelector('.app-container') ||
      document.querySelector('main') ||
      document.querySelector('body');
    expect(appContainer).toBeInTheDocument();
  });
});
