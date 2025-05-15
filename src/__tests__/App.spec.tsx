import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import App from '../App';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock the context and router to avoid navigation and theme issues in tests
vi.mock('../context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  ThemeContext: {
    Consumer: ({
      children,
    }: {
      children: (value: ThemeContextType) => React.ReactNode;
    }) => children({ theme: 'light', toggleTheme: vi.fn() }),
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

vi.mock('react-helmet', () => ({
  Helmet: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

vi.mock('react-router-dom', () => ({
  createBrowserRouter: vi.fn(() => ({})),
  createRoutesFromElements: vi.fn((children) => [children]),
  Route: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Navigate: () => <div>Navigate</div>,
  Outlet: () => <div>Outlet</div>,
  RouterProvider: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="router">{children}</div>
  ),
}));

describe('App component', () => {
  test('renders the application with router', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeInTheDocument();
  });
});
