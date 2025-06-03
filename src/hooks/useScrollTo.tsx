import { useCallback } from 'react';

// Define types explicitly to avoid 'no-undef' errors
type Behavior = 'auto' | 'smooth';
type Block = 'start' | 'center' | 'end' | 'nearest';
type Inline = 'start' | 'center' | 'end' | 'nearest';

interface ScrollOptions {
  behavior?: Behavior;
  block?: Block;
  inline?: Inline;
  offset?: number;
}

export const useScrollTo = () => {
  const scrollToElement = useCallback(
    (elementId: string, options: ScrollOptions = {}) => {
      const { behavior = 'smooth', offset = 0 } = options;

      setTimeout(() => {
        const element = document.getElementById(elementId);

        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: Math.max(0, offsetPosition), // Prevent negative scroll positions
            behavior: behavior as ScrollBehavior,
          });
        } else {
          console.warn(
            `Element with ID "${elementId}" not found for scrolling`
          );
        }
      }, 50);
    },
    []
  );

  const scrollToTop = useCallback((behavior: Behavior = 'smooth') => {
    window.scrollTo({
      top: 0,
      behavior: behavior as ScrollBehavior,
    });
  }, []);

  return { scrollToElement, scrollToTop };
};
