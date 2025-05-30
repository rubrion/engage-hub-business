import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { debugError } from '../utils/debugControl';

export interface TeamMemberType {
  id?: number;
  name: string;
  role: string;
  image?: string;
  bio?: string;
  expertise?: string[];
  education?: string;
  contact?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export function useTeamMembers(): TeamMemberType[] {
  const { getContent } = useLocalizedContent('data');

  try {
    return getContent<TeamMemberType[]>('teamData') || [];
  } catch (error) {
    debugError('Failed to load team members data:', error);
    return [];
  }
}
