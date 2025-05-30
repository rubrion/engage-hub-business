let hasShownAnimationThisSession = false;

export const shouldShowLogoAnimation = (): boolean => {
  if (hasShownAnimationThisSession) {
    return false;
  }

  const hasVisited = localStorage.getItem('hasVisitedBefore') === 'true';

  hasShownAnimationThisSession = true;

  localStorage.setItem('hasVisitedBefore', 'true');

  return !hasVisited;
};
