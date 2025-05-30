import { getLandingPageSlug } from '../utils/shouldShowLanding';

/**
 * Route Import Registry
 *
 * This file centralizes all route importers to make them available for prefetching.
 * It reuses the existing cachedLazy functions to avoid duplicate dynamic imports.
 */

// Using the same import functions as in routes.tsx to maintain consistency
export const importers = {
  home: () => import('../pages/Home'),
  about: () => import('../pages/About'),
  blog: () => import('../pages/Blog'),
  postDetail: () => import('../pages/PostDetails'),
  contact: () => import('../pages/Contact'),
  notFound: () => import('../pages/NotFound'),
  projects: () => import('../pages/Projects'),
  projectDetails: () => import('../pages/ProjectDetails'),
  services: () => import('../pages/Services'),
  teamDetails: () => import('../pages/TeamDetails'),
  partnerDetails: () => import('../pages/PartnerDetails'),
  teamJoin: () => import('../pages/TeamJoin'),
  landingSeasonal: () => import('../pages/LandingSeasonal'),
};

// Get the dynamic path for the seasonal landing page
const campaignPath = `/${getLandingPageSlug()}`;

// Route path to importer mapping for easy lookup
export const routeToImporter: Record<string, () => Promise<unknown>> = {
  '/': importers.home,
  '/about': importers.about,
  '/blog': importers.blog,
  '/blog/page/': importers.blog,
  '/blog/post/': importers.postDetail,
  '/contact': importers.contact,
  '/projects': importers.projects,
  '/projects/page/': importers.projects,
  '/projects/project/': importers.projectDetails,
  '/services': importers.services,
  '/team': importers.teamDetails,
  '/partners': importers.partnerDetails,
  '/join-team': importers.teamJoin,
  [campaignPath]: importers.landingSeasonal, // Using the dynamic campaign path
};

/**
 * Gets the appropriate importer for a given path
 * @param path The route path
 * @returns The importer function or undefined if not found
 */
export function getImporterForPath(
  path: string
): (() => Promise<unknown>) | undefined {
  // Try exact match first
  if (routeToImporter[path]) {
    return routeToImporter[path];
  }

  // Try path prefix match
  const matchingPrefix = Object.keys(routeToImporter).find(
    (prefix) => prefix.endsWith('/') && path.startsWith(prefix)
  );

  return matchingPrefix ? routeToImporter[matchingPrefix] : undefined;
}
