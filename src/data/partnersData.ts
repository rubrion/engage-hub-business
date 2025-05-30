import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { Partner } from '../types/partnerTypes';

/**
 * Hook to fetch partners data from the localized content
 * @returns Array of partner objects
 */
export function usePartners(): Partner[] {
  const { getContent } = useLocalizedContent('data');

  try {
    return getContent<Partner[]>('partnersData') || [];
  } catch (error) {
    console.error('Failed to load partners data:', error);
    return [];
  }
}

export type { Partner } from '../types/partnerTypes';
