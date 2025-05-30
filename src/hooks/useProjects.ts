import { useQuery } from '@tanstack/react-query';

import { createContentService } from '../services/createContentService';
import { CommonContent } from '../types/content';
import { useLanguage } from './useLanguageContext';
import { useTenant } from './useTenantContext';

const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
};

/**
 * Hook for fetching a paginated list of projects with language support
 *
 * @param page Current page number
 * @param limit Items per page
 * @param tenantOverride Optional tenant override
 * @param languageOverride Optional language override
 * @returns Query result with projects data
 */
export function useProjects(
  page = 1,
  limit = PAGINATION.DEFAULT_PAGE_SIZE,
  tenantOverride?: string,
  languageOverride?: string
) {
  const defaultTenant = useTenant();
  const { language } = useLanguage();
  const tenant = tenantOverride || defaultTenant;
  const currentLanguage = languageOverride || language;

  return useQuery({
    queryKey: ['projects', tenant, currentLanguage, page, limit],
    queryFn: async () => {
      const projectService =
        await createContentService<CommonContent>('projects');
      return projectService.list(tenant, page, limit, currentLanguage);
    },
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook for fetching a single project by ID with language support
 *
 * @param id Project ID
 * @param tenantOverride Optional tenant override
 * @param languageOverride Optional language override
 * @returns Query result with project data
 */
export function useProject(
  id: string | undefined,
  tenantOverride?: string,
  languageOverride?: string
) {
  const defaultTenant = useTenant();
  const { language } = useLanguage();
  const tenant = tenantOverride || defaultTenant;
  const currentLanguage = languageOverride || language;

  return useQuery({
    queryKey: ['project', tenant, currentLanguage, id],
    queryFn: async () => {
      const projectService =
        await createContentService<CommonContent>('projects');
      return projectService.byId(tenant, id as string, currentLanguage);
    },
    enabled: !!id,
    staleTime: 300000, // 5 minutes
  });
}
