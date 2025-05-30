# Firestore Integration Testing Guide

This guide explains how to test the Firestore integration in the Rubrion Web Client Template.

## Prerequisites

1. A Firebase project with Firestore database
2. Firebase CLI installed (`npm install -g firebase-tools`)
3. Understanding of Firestore data structure

## Setup Firebase Project

### 1. Create a Firebase Project

If you haven't already, create a new Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard to create your project
4. Enable Firestore database in your project

### 2. Configure Firestore Security Rules

Set up basic security rules that allow read access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to blogs collection
    match /blogs/{document=**} {
      allow read: if true;
    }

    // Allow read access to projects collection
    match /projects/{document=**} {
      allow read: if true;
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Configure the Web Client

### 1. Create Firebase Configuration File

Create a `.env.local` file in the project root with your Firebase config:

```
VITE_API_URL=https://your-api-url.com
VITE_USE_FIRESTORE=true
VITE_FIREBASE_CONFIG={"apiKey":"your-api-key","authDomain":"your-project.firebaseapp.com","projectId":"your-project-id","storageBucket":"your-project.appspot.com","messagingSenderId":"your-messaging-id","appId":"your-app-id"}
```

Make sure to replace the placeholder values with your actual Firebase project details.

### 2. Import Sample Data to Firestore

Create a script to import sample data to your Firestore database:

```typescript
// filepath: /home/mumuzinho/rubrion/web-client-template/scripts/import-firestore-data.ts
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { mockBlogPosts } from '../src/mocks/mockBlogPosts';
import { mockProjects } from '../src/mocks/mockProjects';

// Firebase configuration - replace with your own
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: 'your-messaging-id',
  appId: 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Import mock data to Firestore
 */
async function importData() {
  try {
    console.log('Starting data import...');

    // Import blog posts
    console.log('Importing blog posts...');
    for (const post of mockBlogPosts) {
      const postWithTimestamps = {
        ...post,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'blogs', post.id), postWithTimestamps);
      console.log(`Imported blog post: ${post.id}`);
    }

    // Import projects
    console.log('Importing projects...');
    for (const project of mockProjects) {
      const projectWithTimestamps = {
        ...project,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'projects', project.id), projectWithTimestamps);
      console.log(`Imported project: ${project.id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Run the import
importData();
```

Add a script command to your package.json:

```json
"scripts": {
  "import-firestore-data": "ts-node scripts/import-firestore-data.ts"
}
```

Run the script:

```
npm run import-firestore-data
```

## Testing Firestore Integration

### 1. Disable MSW in Development

To test with real Firestore data, make sure MSW is disabled. You can do this by:

- Not running the MSW initialization code in `main.tsx` (comment it out temporarily)
- Or adding a query parameter to bypass MSW (e.g., `?noMock=true`)

### 2. Run the Application with Firestore Config

```bash
npm run dev
```

This will start the development server with your Firestore configuration.

### 3. Verify Data Loading

Open the browser and check the console for Firebase-related logs. You should see:

- Firestore initialization messages
- Query execution logs
- Data being fetched from Firestore instead of MSW

### 4. Inspect Network Tab

In your browser's developer tools:

1. Open the Network tab
2. Filter for requests to `firestore.googleapis.com`
3. Verify that data is being fetched from Firestore

## Debugging Firestore Integration

### Common Issues

1. **Missing Timestamp Fields**: Ensure documents in Firestore have `createdAt` fields, which are used for sorting in the pagination logic.

2. **CORS Issues**: If you see CORS errors, check your Firebase security rules and make sure they allow read operations.

3. **Invalid Firebase Config**: Double-check that your Firebase configuration in `.env.local` is correctly formatted as valid JSON.

4. **MSW Interference**: Make sure MSW is properly disabled when testing Firestore integration.

### Enhanced Logging

Add additional logging to `firestore.ts` to get more insights:

```typescript
// filepath: /home/mumuzinho/rubrion/web-client-template/src/lib/firestore.ts
// Add this function for debug logging
const logFirestore = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(`%c[Firestore] ${message}`, 'color: #FFA000', ...args);
  }
};

// Use in your functions:
export async function getPaginated<T extends { id: string }>(
  colPath: string,
  page: number,
  perPage: number
): Promise<PaginatedResponse<T>> {
  logFirestore(`Fetching page ${page} with ${perPage} items from ${colPath}`);

  const firebase = await getFirebase();
  // ...existing code...

  logFirestore(`Got ${items.length} items from ${colPath}`);
  return {
    // ...existing code...
  };
}
```

## Building a Data Management Panel

For more comprehensive testing, you can build a simple admin panel to manage your Firestore data:

```typescript
// filepath: /home/mumuzinho/rubrion/web-client-template/src/pages/Admin.tsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Button, Container, Typography, List, ListItem, Box, Paper, Tabs, Tab } from '@mui/material';
import BaseLayout from '../layouts/BaseLayout';

// Get Firebase config from environment
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG || '{}');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs'|'projects'>('blogs');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (collectionName: string) => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(fetchedItems);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(activeTab);
  }, [activeTab]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: 'blogs'|'projects') => {
    setActiveTab(newValue);
  };

  const handleDeleteItem = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete this item (${id})?`)) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        setError('Failed to delete item. Check console for details.');
      }
    }
  };

  return (
    <BaseLayout>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Firestore Data Management
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="collection tabs">
            <Tab label="Blog Posts" value="blogs" />
            <Tab label="Projects" value="projects" />
          </Tabs>
        </Paper>

        <Button variant="contained" color="primary" onClick={() => fetchItems(activeTab)}>
          Refresh Data
        </Button>

        {error && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'error.main', color: 'error.contrastText' }}>
            {error}
          </Box>
        )}

        {loading ? (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Paper sx={{ mt: 3 }}>
            <List>
              {items.length > 0 ? items.map(item => (
                <ListItem key={item.id} divider sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1">
                      {item.title || item.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {item.id} | Created: {item.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Button color="error" onClick={() => handleDeleteItem(item.id)}>
                      Delete
                    </Button>
                  </Box>
                </ListItem>
              )) : (
                <ListItem>
                  <Typography>No items found.</Typography>
                </ListItem>
              )}
            </List>
          </Paper>
        )}
      </Container>
    </BaseLayout>
  );
};

export default Admin;
```

Add this page to your routes:

```typescript
// Inside routes.tsx or similar
const adminRoutes = [
  {
    path: 'admin',
    element: <Admin />,
  }
];
```

## Advanced Testing

### Toggling Data Source at Runtime

You can add a utility to toggle between MSW and Firestore at runtime:

```typescript
// filepath: /home/mumuzinho/rubrion/web-client-template/src/utils/dataSourceToggle.ts
import { worker } from '../mocks/browser';

// Store the original value
const originalUseFirestore = localStorage.getItem('useFirestore') === 'true';

/**
 * Toggle between MSW and Firestore data sources
 * @param useFirestore Whether to use Firestore (true) or MSW (false)
 */
export function toggleDataSource(useFirestore: boolean) {
  // Update local storage
  localStorage.setItem('useFirestore', String(useFirestore));

  // Handle MSW
  if (!useFirestore) {
    // Start MSW if not already running
    worker.start();
    window.__IS_MSW_ACTIVE__ = true;
  } else {
    // Stop MSW
    worker.stop();
    window.__IS_MSW_ACTIVE__ = false;
  }

  // Reload the page to apply changes
  window.location.reload();
}

// Check if we should use the stored value
export function initializeDataSource() {
  if (originalUseFirestore) {
    toggleDataSource(true);
  }
}

// Add a data source indicator
export function addDataSourceIndicator() {
  if (process.env.NODE_ENV !== 'production') {
    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.right = '10px';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '4px';
    indicator.style.fontSize = '12px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '9999';

    const isFirestore = localStorage.getItem('useFirestore') === 'true';
    indicator.style.backgroundColor = isFirestore ? '#4caf50' : '#ff9800';
    indicator.style.color = 'white';
    indicator.textContent = isFirestore ? 'Firestore' : 'Mock Data';

    // Add toggle capability
    indicator.style.cursor = 'pointer';
    indicator.title = 'Click to toggle data source';
    indicator.onclick = () => toggleDataSource(!isFirestore);

    document.body.appendChild(indicator);
  }
}
```

Call `initializeDataSource` and `addDataSourceIndicator` early in your application initialization.

## Conclusion

By following this guide, you should be able to:

1. Set up Firestore for your application
2. Import mock data to Firestore
3. Configure the application to use Firestore
4. Test the Firestore integration
5. Debug any issues that may arise

Remember to revert any temporary changes made for testing before committing your code to version control, particularly any credentials or API keys in your scripts.
