export interface RouteMetadata {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface RouteConfig {
  path: string;
  routeKey: string;
  metadata: RouteMetadata;
  // For dynamic routes like blog posts or user profiles
  generatePath?: (params: Record<string, string | number>) => string;
}

// Public routes accessible to all users
export const publicRoutes: Record<string, RouteConfig> = {
  HOME: {
    path: '/',
    routeKey: 'HOME',
    metadata: {
      title: 'Home | Rubrion Web Client',
      description:
        'Welcome to Rubrion Web Client - A modern web application template',
      keywords: ['react', 'typescript', 'vite', 'template'],
    },
  },
  ABOUT: {
    path: '/about',
    routeKey: 'ABOUT',
    metadata: {
      title: 'About Us | Rubrion Web Client',
      description: 'Learn more about Rubrion Web Client and our mission',
      keywords: ['about', 'mission', 'team', 'rubrion'],
    },
  },
  CONTACT: {
    path: '/contact',
    routeKey: 'CONTACT',
    metadata: {
      title: 'Contact Us | Rubrion Web Client',
      description: 'Get in touch with the Rubrion team',
      keywords: ['contact', 'support', 'help', 'rubrion'],
    },
  },
};

// Blog routes with dynamic routes for individual posts
export const blogRoutes: Record<string, RouteConfig> = {
  BLOG_LIST: {
    path: '/blog',
    routeKey: 'BLOG_LIST',
    metadata: {
      title: 'Blog | Rubrion Web Client',
      description: 'Latest news, updates and articles from Rubrion',
      keywords: ['blog', 'articles', 'news', 'updates'],
    },
  },
  BLOG_POST: {
    path: '/blog/:slug',
    routeKey: 'BLOG_POST',
    metadata: {
      title: 'Blog Post | Rubrion Web Client',
      description: 'Read our latest articles and insights',
      keywords: ['blog', 'article', 'post'],
    },
    generatePath: (params: Record<string, string | number>) =>
      `/blog/${params.slug}`,
  },
};

// Protected routes requiring authentication
export const protectedRoutes: Record<string, RouteConfig> = {
  DASHBOARD: {
    path: '/dashboard',
    routeKey: 'DASHBOARD',
    metadata: {
      title: 'Dashboard | Rubrion Web Client',
      description: 'Your personal dashboard',
      keywords: ['dashboard', 'account', 'profile'],
    },
  },
  PROFILE: {
    path: '/profile',
    routeKey: 'PROFILE',
    metadata: {
      title: 'Profile | Rubrion Web Client',
      description: 'Manage your user profile',
      keywords: ['profile', 'account', 'settings'],
    },
  },
  USER_PROFILE: {
    path: '/users/:userId',
    routeKey: 'USER_PROFILE',
    metadata: {
      title: 'User Profile | Rubrion Web Client',
      description: 'View user profile',
      keywords: ['user', 'profile'],
    },
    generatePath: (params: Record<string, string | number>) =>
      `/users/${params.userId}`,
  },
};

// Combine all routes
export const ROUTES = {
  PUBLIC: publicRoutes,
  BLOG: blogRoutes,
  PROTECTED: protectedRoutes,
};

// Helper function to get route metadata by routeKey
export function getRouteMetadata(routeKey: string): RouteMetadata | undefined {
  // Search in all route categories
  const allRoutes = { ...publicRoutes, ...blogRoutes, ...protectedRoutes };
  return allRoutes[routeKey]?.metadata;
}

// Helper function to get all routes as a flat array for router configuration
export function getAllRoutes(): RouteConfig[] {
  return Object.values({
    ...publicRoutes,
    ...blogRoutes,
    ...protectedRoutes,
  });
}
