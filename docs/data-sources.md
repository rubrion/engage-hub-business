# Data Sources Guide

This guide explains how to work with different data sources in the Rubrion Web Client Template.

## Available Data Sources

The template supports two main data sources:

1. **Mock Data** - Uses Mock Service Worker (MSW) to intercept requests and return mock data
2. **API** - Uses real data sources (either REST API or Firestore, depending on configuration)

## Switching Between Data Sources

### Using the Debug Menu

When in development mode, a debug button appears in the bottom left corner of the screen. Click it to open the debug menu, which includes a data source toggle:

- **Mock**: Uses static mock data through MSW
- **API**: Uses real data from either Firestore or a REST API (based on environment configuration)

After selecting a data source, the page will automatically reload to apply the changes.

### Using Local Storage

You can also manually set the data source by modifying local storage:

```javascript
// For Mock data
localStorage.setItem('useMSW', 'true');
localStorage.setItem('dataSource', 'mock');

// For API (REST or Firestore)
localStorage.setItem('useMSW', 'false');
localStorage.setItem('dataSource', 'api');
```

Then reload the page for changes to take effect.

## API Configuration

The API option can use either a REST API or Firestore, depending on your configuration:

### REST API

To use a REST API:

1. Set your API URL in `.env.local`:

   ```
   VITE_API_URL=https://your-api-url.com
   ```

2. Ensure Firestore is not enabled:
   ```
   VITE_USE_FIRESTORE=false
   ```

### Firestore

To use Firestore:

1. Set your Firebase configuration in `.env.local`:

   ```
   VITE_USE_FIRESTORE=true
   VITE_FIREBASE_CONFIG={"apiKey":"YOUR_API_KEY","authDomain":"YOUR_PROJECT.firebaseapp.com","projectId":"YOUR_PROJECT_ID","storageBucket":"YOUR_PROJECT.appspot.com","messagingSenderId":"YOUR_MESSAGING_ID","appId":"YOUR_APP_ID"}
   ```

2. Import your data to Firestore following the structure outlined in the [Firestore Integration guide](./firestore-sync.md)

## Determining the Current Data Source

During development, you can use the browser console to check which data source is active:

```javascript
console.log({
  'Mock Active': localStorage.getItem('useMSW') === 'true',
  'Current Data Source': localStorage.getItem('dataSource'),
  'Firestore Enabled': import.meta.env.VITE_USE_FIRESTORE === 'true',
});
```

You can also call the debugging utility:

```javascript
import { logDataSourceInfo } from './utils/debugUtils';
logDataSourceInfo();
```

## Best Practices

- **Start with Mock Data**: During development, start with mock data to avoid API rate limits
- **Test with Real Data**: Before deployment, test thoroughly with actual API data
- **Keep Mock Data Updated**: Ensure your mock data stays in sync with API changes
- **Use Environment Variables**: Use environment variables to configure API endpoints for different environments
