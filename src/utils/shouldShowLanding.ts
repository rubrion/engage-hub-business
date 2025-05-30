/**
 * Utility to determine if the seasonal landing page should be shown
 * based on date range environment variables
 */
import { debugError, debugLog } from './debugControl';

export function shouldShowLanding(): boolean {
  debugLog('Checking seasonal landing page date range', {
    startDate: import.meta.env.VITE_LANDING_START_DATE,
    endDate: import.meta.env.VITE_LANDING_END_DATE,
  });

  const now = new Date();
  const startDateStr = import.meta.env.VITE_LANDING_START_DATE;
  const endDateStr = import.meta.env.VITE_LANDING_END_DATE;

  if (!startDateStr || !endDateStr) {
    debugLog('Hiding landing page: Date ranges not configured');
    return false;
  }

  try {
    const startDate = new Date(String(startDateStr));
    const endDate = new Date(String(endDateStr));

    const inDateRange = now >= startDate && now <= endDate;

    if (inDateRange) {
      debugLog('Showing landing page: Current date is within configured range');
    } else {
      debugLog('Hiding landing page: Current date outside configured range', {
        currentDate: now,
        startDate,
        endDate,
      });
    }

    return inDateRange;
  } catch (error) {
    debugError('Error parsing seasonal landing page dates:', error);
    return false;
  }
}

/**
 * Get the campaign slug for the seasonal landing page.
 * Returns a fallback slug if not configured.
 */
export function getLandingPageSlug(): string {
  const configuredSlug = import.meta.env.VITE_LANDING_CAMPAIGN_SLUG;
  return configuredSlug || 'seasonal-landing';
}
