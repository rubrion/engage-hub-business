import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { EventSponsor } from '../types/eventSponsorTypes';

/**
 * Hook to fetch event sponsors data from the localized content
 * @returns Array of event sponsor objects
 */
export function useEventSponsors(): EventSponsor[] {
  const { getContent } = useLocalizedContent('data');

  try {
    return getContent<EventSponsor[]>('eventSponsorsData') || [];
  } catch (error) {
    console.error('Failed to load event sponsors data:', error);
    return [];
  }
}

export type { EventSponsor } from '../types/eventSponsorTypes';
