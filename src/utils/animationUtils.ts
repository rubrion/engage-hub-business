/**
 * Utility functions to handle animation behaviors globally
 */

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function is executed
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Event listener to disable animations on language change
 * Should be registered at the app root level
 */
export const setupAnimationControl = () => {
  const disableAnimations = () => {
    document.body.classList.add('disable-animations');
    setTimeout(() => {
      document.body.classList.remove('disable-animations');
    }, 500);
  };

  const handleLanguageChange = () => {
    disableAnimations();
  };

  document.addEventListener('i18n-language-changed', handleLanguageChange);

  return () => {
    document.removeEventListener('i18n-language-changed', handleLanguageChange);
  };
};

/**
 * Simple scroll direction tracker that only cares about UP vs DOWN
 */
export function createScrollDirectionTracker() {
  let lastScrollY = 0;
  let direction: 'up' | 'down' = 'up';

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      direction = 'down';
    } else if (currentScrollY < lastScrollY) {
      direction = 'up';
    }

    lastScrollY = currentScrollY > 0 ? currentScrollY : 0;

    return direction;
  };

  return {
    getDirection: () => direction,
    checkDirection: handleScroll,
    reset: () => {
      direction = 'up';
      lastScrollY = 0;
    },
  };
}
