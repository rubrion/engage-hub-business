import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
      exclude: ['node_modules/', 'src/mocks/browser.ts'],
    },
  },
});
