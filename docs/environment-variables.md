# Environment Variables

This document describes all environment variables used in the Rubrion Web Client Template project, organized by function and build type.

## Build Types

The application supports various build configurations through environment variables:

- **Development**: Default mode using `npm run dev` (uses `.env.debug`)
- **Production-like Development**: For testing in production-like environment using `npm run dev:prod`
- **Production**: Standard production build using `npm run build`
- **Production with Mock Data**: Production build using mock data with `npm run build:mocked` (uses `.env.mocked`)

## Core Environment Variables

| Variable                 | Description                                          | Default                            | Used In                       |
| ------------------------ | ---------------------------------------------------- | ---------------------------------- | ----------------------------- |
| `VITE_API_URL`           | Base URL for the API (supports {tenant} placeholder) | `https://api.example.com/{tenant}` | All builds                    |
| `VITE_USE_MOCK_DATA`     | Whether to use mock data instead of real API         | `true` in dev, `false` in prod     | All builds                    |
| `VITE_USE_FIRESTORE`     | Whether to use Firestore instead of REST API         | `false`                            | All builds                    |
| `VITE_MULTI_TENANT`      | Enable multi-tenant support                          | `true`                             | All builds                    |
| `VITE_ENABLE_ANALYTICS`  | Enable analytics tracking                            | `false`                            | All builds                    |
| `VITE_ENABLE_NEWSLETTER` | Enable newsletter functionality                      | `true`                             | All builds                    |
| `VITE_MAINTENANCE_MODE`  | Enable maintenance mode                              | `false`                            | All builds                    |
| `VITE_FORCE_DEBUG`       | Force debug features even in production              | `false`                            | `.env.debug` and debug builds |

## Form Submission Endpoints

Form submissions use FormSubmit.co service with configurable email endpoints:

| Variable                   | Description                                              | Default                  | Used For       |
| -------------------------- | -------------------------------------------------------- | ------------------------ | -------------- |
| `VITE_FORM_DEFAULT_EMAIL`  | Default recipient for all forms if specific ones not set | `contact@rubrion.com`    | All forms      |
| `VITE_FORM_CONTACT_EMAIL`  | Email address for contact form submissions               | Falls back to default    | Contact form   |
| `VITE_FORM_TEAMJOIN_EMAIL` | Email address for team/job applications                  | Falls back to default    | Team Join form |

## Feature Flags

| Variable                     | Description                              | Default                   | Used In              |
| ---------------------------- | ---------------------------------------- | ------------------------- | -------------------- |
| `VITE_FEATURE_SHOW_LANDING`  | Whether to display seasonal landing page | `false`                   | All builds           |
| `VITE_LANDING_CAMPAIGN_SLUG` | URL slug for landing page                | `engage-hub-event`        | When landing enabled |
| `VITE_LANDING_START_DATE`    | Start date for seasonal landing page     | `2025-05-01T00:00:00-03:00` | When landing enabled |
| `VITE_LANDING_END_DATE`      | End date for seasonal landing page       | `2025-06-14T23:59:59-03:00` | When landing enabled |
| `VITE_LANDING_CAMPAIGN_BASE_URL` | Base URL for landing page campaign      | `https://forms.gle/...`   | When landing enabled |

## Firebase Configuration (When Using Firestore)

| Variable               | Description                             | Default | Used In                        |
| ---------------------- | --------------------------------------- | ------- | ------------------------------ |
| `VITE_FIREBASE_CONFIG` | JSON string with Firebase configuration | Not set | When `VITE_USE_FIRESTORE=true` |

## Environment Files

### `.env` (Default Development)

Basic development configuration with mock data enabled by default:

```
VITE_API_URL=https://api.example.com/{tenant}
VITE_USE_FIRESTORE=false
VITE_MULTI_TENANT=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NEWSLETTER=true
VITE_MAINTENANCE_MODE=false
VITE_FORM_DEFAULT_EMAIL=info@example.com
VITE_FORM_CONTACT_EMAIL=contact@example.com
VITE_FORM_TEAMJOIN_EMAIL=careers@example.com
```

### `.env.debug` (Development with Debug)

Development with explicit debug features enabled:

```
VITE_API_URL=http://localhost:3001/mock
VITE_USE_MOCK_DATA=true
VITE_USE_FIRESTORE=false
VITE_MULTI_TENANT=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NEWSLETTER=true
VITE_MAINTENANCE_MODE=false
VITE_FORCE_DEBUG=true
VITE_FORM_DEFAULT_EMAIL=contact@rubrion.com
VITE_FORM_CONTACT_EMAIL=contact@rubrion.com
VITE_FORM_TEAMJOIN_EMAIL=contact@rubrion.com
VITE_LANDING_CAMPAIGN_SLUG=engage-hub-event
VITE_LANDING_START_DATE=2025-05-01T00:00:00-03:00
VITE_LANDING_END_DATE=2025-06-14T23:59:59-03:00
VITE_LANDING_CAMPAIGN_BASE_URL=https://forms.gle/Fh4sZTw7DMGamttE7
```

### `.env.mocked` (Production with Mock Data)

Production configuration that uses mock data:

```
VITE_API_URL=https://demo.example.com/mock
VITE_USE_MOCK_DATA=true
VITE_USE_FIRESTORE=false
VITE_MULTI_TENANT=false
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NEWSLETTER=false
VITE_MAINTENANCE_MODE=false
VITE_FORCE_DEBUG=false
VITE_FORM_DEFAULT_EMAIL=contact@rubrion.com
VITE_FORM_CONTACT_EMAIL=contact@rubrion.com
VITE_FORM_TEAMJOIN_EMAIL=contact@rubrion.com
VITE_LANDING_CAMPAIGN_SLUG=engage-hub-event
VITE_LANDING_START_DATE=2025-05-01T00:00:00-03:00
VITE_LANDING_END_DATE=2025-06-14T23:59:59-03:00
VITE_LANDING_CAMPAIGN_BASE_URL=https://forms.gle/Fh4sZTw7DMGamttE7
```

## Adding New Environment Variables

When adding new environment variables:

1. Add them to all relevant `.env.*` files
2. Document them in this file
3. Use the `getEnvVariable()` function from `src/config.ts` to access them
4. Provide sensible defaults for all environment variables

## Using Environment Variables in Code

```typescript
import { getEnvVariable } from '../config';

// Get value with fallback
const apiUrl = getEnvVariable('VITE_API_URL', 'https://api.default.com');

// Boolean flag
const isFeatureEnabled = getEnvVariable('VITE_SOME_FEATURE') === 'true';
```

```

```
