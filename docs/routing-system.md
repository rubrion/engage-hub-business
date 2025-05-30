# Routing System

This document describes the routing system implemented in the Rubrion Web Client Template.

## Overview

The routing system is built on React Router v6, with enhancements for:

- Typed routes
- Nested layouts
- Route-based code splitting
- Scroll restoration
- Route guards and authentication
- SEO metadata management

## Route Structure

Routes are organized in a modular structure inside the `routes` directory:

```
src/routes/
├── index.ts           # Export all routes
├── types.ts           # Route type definitions
├── blog.ts            # Blog routes
├── projects.ts        # Projects routes
├── public.ts          # Public routes
├── routes.tsx         # Route configuration and JSX elements
└── importRegistry.ts  # Dynamic imports registry
```

## Route Definitions

Routes are defined as objects with path, label, and other metadata:

```typescript
// Example from projects.ts
const PROJECTS_ROUTES = {
  // Root path (redirects to page 1)
  ROOT: {
    path: '/projects',
    label: 'navigation:menu.projects',
    description: 'common:meta.projects',
  } as RouteObject,

  // Default list page (page 1)
  LIST: {
    path: '/projects/page/1',
    label: 'navigation:menu.projects',
    description: 'common:meta.projects',
  } as RouteObject,

  // Paginated list
  LIST_PAGED: ((params: PaginationParams): string => {
    return `/projects/page/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/projects/page/:page',

  // Detail page
  PROJECT_DETAIL: ((params: OptionalDetailParams = {}): string => {
    if (!params.id) return '/projects/project/:id';
    return `/projects/project/${params.id}`;
  }) as DynamicRoute<OptionalDetailParams>,

  PROJECT_DETAIL_STATIC: '/projects/project/:id',
};
```

## Route Types

The system uses TypeScript to ensure type safety:

```typescript
// From types.ts
export interface RouteObject {
  path: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  hideInNav?: boolean;
  roles?: string[];
}

export interface PaginationParams {
  page: number;
}

export interface DetailParams {
  id: string;
}

export interface OptionalDetailParams {
  id?: string;
}

export type DynamicRoute<T> = (params: T) => string;
```

## Route Configuration

Routes are configured in `routes.tsx` using React Router's `createBrowserRouter`:

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: {
          metaData: {
            title: 'Home',
            description: 'Welcome to our website',
          },
        },
      },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/blog/page/1" replace />,
          },
          {
            path: 'page/:page',
            element: <BlogList />,
          },
          {
            path: 'post/:id',
            element: <BlogPost />,
          },
        ],
      },
      // Other routes...
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);
```

## Usage in Components

### Navigation

For navigation, use the route constants to ensure type safety:

```tsx
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../routes';

// In a component
const MyComponent = () => {
  const navigate = useNavigate();

  const goToProjectDetail = () => {
    navigate(ROUTES.PROJECTS.PROJECT_DETAIL({ id: '123' }));
  };

  return (
    <div>
      <button onClick={goToProjectDetail}>View Project</button>
      <Link to={ROUTES.BLOG.LIST_PAGED({ page: 2 })}>Blog Page 2</Link>
    </div>
  );
};
```

### Route Parameters

Access route parameters with the `useParams` hook:

```tsx
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch blog post with id
  // ...

  return <div>Blog Post {id}</div>;
};
```

### Query Parameters

Access and update query parameters:

```tsx
import { useSearchParams } from 'react-router-dom';

const ProjectsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ category: newCategory });
  };

  // ...
};
```

## Code Splitting

Routes use React.lazy and Suspense for code splitting:

```tsx
// Lazy loaded components
const Home = React.lazy(() => import('../pages/Home'));
const BlogList = React.lazy(() => import('../pages/Blog'));
const BlogPost = React.lazy(() => import('../pages/BlogPost'));

// In the router configuration
{
  path: '/',
  element: (
    <Suspense fallback={<LoadingIndicator />}>
      <Home />
    </Suspense>
  ),
}
```

## Scroll Restoration

Custom scroll restoration is implemented to:

1. Scroll to top when navigating to a new page
2. Restore scroll position when navigating back/forward
3. Support scroll-to-element for deep linking

```tsx
import { useScrollTo } from '../hooks/useScrollTo';

const MyPage = () => {
  const { scrollToElement } = useScrollTo();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      setTimeout(() => {
        scrollToElement(scrollToId);
      }, 100);
    }
  }, [location.search, scrollToElement]);

  // ...
};
```

The `createScrollRoute` utility helps create routes with scroll targets:

```tsx
import { createScrollRoute } from '../utils/navigationUtils';

const link = createScrollRoute(ROUTES.PUBLIC.SERVICES.path, 'services-section');
// Results in: "/services?scrollTo=services-section"
```

## Protected Routes

Role-based route protection is implemented:

```tsx
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user, isAuthenticated, userRoles } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user has required roles
  const hasRequiredRoles = requiredRoles.length === 0 ||
    requiredRoles.some(role => userRoles.includes(role));

  if (!hasRequiredRoles) {
    return <AccessDenied />;
  }

  return children;
};

// Usage in routes
{
  path: 'admin',
  element: (
    <ProtectedRoute requiredRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  ),
}
```

## SEO and Metadata

Each route can define metadata for SEO:

```tsx
// In the route configuration
{
  path: 'about',
  element: <About />,
  handle: {
    metaData: {
      title: 'About Us',
      description: 'Learn about our company and mission',
      ogImage: 'https://example.com/about-og.jpg',
    },
  },
}
```

The metadata is rendered by a `MetaTags` component:

```tsx
import { useMatches } from 'react-router-dom';

const MetaTags = () => {
  const matches = useMatches();
  const match = matches.find((m) => m.handle?.metaData);
  const metaData = match?.handle?.metaData || {};

  return (
    <>
      <title>{metaData.title || 'Default Title'}</title>
      <meta
        name="description"
        content={metaData.description || 'Default description'}
      />
      <meta
        property="og:title"
        content={metaData.ogTitle || metaData.title || 'Default Title'}
      />
      <meta
        property="og:description"
        content={
          metaData.ogDescription ||
          metaData.description ||
          'Default description'
        }
      />
      <meta
        property="og:image"
        content={metaData.ogImage || '/default-og.jpg'}
      />
    </>
  );
};
```

## Navigation Guards

The system supports navigation guards to control route transitions:

```tsx
import { useBlocker } from 'react-router-dom';

const FormWithUnsavedChanges = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Block navigation when there are unsaved changes
  useBlocker(
    ({ currentLocation, nextLocation }) => {
      return (
        hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
      );
    },
    ({ currentLocation, nextLocation, blocker }) => {
      const confirmNavigation = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (confirmNavigation) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  );

  // ...
};
```

## Navigation Tracking

Navigation events can be tracked for analytics:

```tsx
import { useNavigationType, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const NavigationTracker = () => {
  const navigationType = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    // Don't track initial load twice (it's tracked in App.tsx)
    if (navigationType !== 'POP') {
      trackPageView({
        path: location.pathname,
        search: location.search,
        title: document.title,
      });
    }
  }, [location, navigationType]);

  return null;
};
```

## Layout System

The routing system supports nested layouts:

```tsx
const RootLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const BlogLayout = () => (
  <>
    <BlogSidebar />
    <div className="blog-content">
      <Outlet />
    </div>
  </>
);

// In the router configuration
{
  path: '/',
  element: <RootLayout />,
  children: [
    {
      path: 'blog',
      element: <BlogLayout />,
      children: [
        // Blog routes
      ],
    },
  ],
}
```

## Error Boundaries

The system includes route-level error boundaries:

```tsx
const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }

    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.data.message || 'An error occurred'}</p>
      </div>
    );
  }

  return <GenericError error={error} />;
};
```

## Conclusion

This routing system provides a robust foundation for building complex applications with multiple page types, authentication, and SEO optimization. The typed route definitions ensure that navigation is type-safe and prevent broken links.
