import ROUTES from '../routes';
import { getLandingPageSlug } from './shouldShowLanding';

/**
 * Creates a route with a scroll target parameter
 *
 * @param path Base route path
 * @param scrollTarget ID of element to scroll to
 * @returns Route with scroll parameter
 */
export const createScrollRoute = (
  path: string,
  scrollTarget: string
): string => {
  return `${path}?scrollTo=${scrollTarget}`;
};

/**
 * Creates a route that will scroll to top when navigated to
 *
 * @param path Base route path
 * @returns Route with scroll to top parameter
 */
export const createScrollToTopRoute = (path: string): string => {
  return `${path}?scrollToTop=true`;
};

/**
 * Extracts scroll target from URL
 *
 * @param search URL search string (query parameters)
 * @returns scroll target ID or null
 */
export const getScrollTargetFromURL = (search: string): string | null => {
  const params = new URLSearchParams(search);
  return params.get('scrollTo');
};

/**
 * Pages that should automatically scroll to top when navigated to
 * This allows controlling scroll behavior without URL parameters
 */
export const SCROLL_TO_TOP_PAGES: string[] = ['*'];

/**
 * Paths that should NOT scroll to top automatically (takes precedence over SCROLL_TO_TOP_PAGES)
 * Used for pagination navigation where we want to scroll to content section instead
 */
export const NO_SCROLL_TO_TOP_PATTERNS: string[] = [
  '/blog/page/',
  '/projects/page/',
];

/**
 * Checks if a page should automatically scroll to top when navigated to
 *
 * @param pathname Current route path
 * @returns boolean indicating if should scroll to top
 */
export const shouldScrollToTop = (pathname: string): boolean => {
  // Check if this path should be excluded from scroll-to-top behavior
  const shouldExclude = NO_SCROLL_TO_TOP_PATTERNS.some((pattern) =>
    pathname.includes(pattern)
  );

  if (shouldExclude) {
    return false;
  }

  if (SCROLL_TO_TOP_PAGES.includes('*')) {
    return true;
  }

  return SCROLL_TO_TOP_PAGES.some((scrollPath) => {
    if (!scrollPath.includes(':')) {
      return pathname === scrollPath;
    }

    const basePath = scrollPath.split('/:')[0];
    return pathname.startsWith(basePath);
  });
};

/**
 * Scrolls to an element by ID
 *
 * @param elementId The ID of the element to scroll to
 * @param options Scroll behavior options
 */
interface ScrollOptions {
  behavior?: 'auto' | 'smooth';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export const scrollToElement = (
  elementId: string,
  options?: ScrollOptions
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  } else {
    console.warn(`Element with ID ${elementId} not found for scrolling`);
  }
};

/**
 * Pages that have a hero section at the top
 * These are used by both Navbar and BaseLayout components
 */
export const HERO_PAGES = [
  ROUTES.PUBLIC.HOME.path,
  ROUTES.BLOG.ROOT.path,
  ROUTES.BLOG.LIST.path,
  ROUTES.BLOG.LIST_PAGED_STATIC,
  ROUTES.PROJECTS.ROOT.path,
  ROUTES.PROJECTS.LIST.path,
  ROUTES.PROJECTS.LIST_PAGED_STATIC,
  `/${getLandingPageSlug()}`,
];

/**
 * Helper function to check if a path matches any hero page path pattern
 * @param currentPath The current route path to check
 * @returns boolean indicating if the path is for a page with a hero section
 */
export const isHeroPage = (currentPath: string): boolean => {
  return HERO_PAGES.some((heroPath) => {
    // For static paths, exact match
    if (!heroPath.includes(':')) {
      return currentPath === heroPath;
    }

    // For dynamic paths, check if it starts with the base path
    const basePath = heroPath.split('/:')[0];
    return currentPath.startsWith(basePath);
  });
};
