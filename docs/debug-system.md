# Debug System & Mock Data

This document describes the debug system and mocked data implementation for the web client template.

## Overview

The application supports several modes of operation:

1. **Development Mode (Default)** - Debug tools available, mock data enabled by default
2. **Development with Forced Debug** - Full debugging with explicit tooling
3. **Production with Real API** - No debug tools, uses real API endpoints
4. **Production with Mocked Data** - No debug tools, but uses mock data

## Debug Utilities

We've implemented a centralized debug control system to manage console logging and debug features:

- `debugLog()` - Controlled console logging that only appears in debug mode
- `debugWarn()` - Controlled console warning that only appears in debug mode
- `debugError()` - Controlled console error that always appears but with different formatting
- `isDebugEnabled()` - Function to check if debug features should be enabled
- `shouldUseMockData()` - Function to check if mock data should be used

These utilities are located in `src/utils/debugControl.ts`.

## Available Scripts

The following npm scripts are available:

```bash
# Development with default settings (debug mode enabled by default)
npm run dev

# Development with production-like settings (no debug)
npm run dev:prod

# Build for production (no debug, real API)
npm run build

# Build for production with mock data (no debug, mock API)
npm run build:mocked

# Check for console.log statements in codebase
npm run clean:logs:check

# Replace console.log statements with debugLog across codebase
npm run clean:logs:fix
```

## How to Configure

The behavior is controlled through environment variables:

- `VITE_USE_MOCK_DATA=true` - Forces the use of mock data regardless of environment
- `VITE_FORCE_DEBUG=true` - Forces debug mode even in production builds

## Environment Files

We provide several environment configurations:

1. `.env` - Default development settings
2. `.env.debug` - Development with explicit debug features
3. `.env.mocked` - Production build with mock data

## Debug Button (DataSourceToggle)

The debug button appears in the bottom left corner of the screen in debug mode (development by default). It allows:

- Switching between mock and real API data
- Changing tenant settings
- Viewing current configuration

This button is automatically hidden in production builds unless `VITE_FORCE_DEBUG=true` is set.

## Console Log Management

To clean up unnecessary console logs:

1. Check for console logs: `npm run clean:logs:check`
2. Replace them with debug utilities: `npm run clean:logs:fix`

Always use the debug utilities instead of direct console.log statements to ensure proper behavior in production builds.

## Best Practices

1. Never use direct `console.log` statements - use `debugLog` instead
2. Use `debugWarn` for warnings that should only appear in debug mode
3. Use `debugError` for errors that should always be visible
4. Use the `isDebugEnabled()` check before rendering debug-only UI components
5. Use the `shouldUseMockData()` check to determine if mock data should be used
