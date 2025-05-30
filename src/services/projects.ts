import { COLLECTIONS } from '../config';
import { resolveTenant } from '../core/tenantUtils';
import {
  MockProject,
  mockProjects,
  PROJECT_CATEGORY_ICONS,
} from '../mocks/mockProjects';
import { createPaginatedService } from './createPaginatedService';
import { ProjectSchema } from './validators';

/**
 * Service for fetching projects - initialized lazily to avoid require issues
 */
let _projectService: ReturnType<typeof createPaginatedService<MockProject>>;

/**
 * Get the project service instance, initializing if necessary
 */
export const getProjectService = async () => {
  if (!_projectService) {
    _projectService = createPaginatedService<MockProject>({
      route: '/projects',
      mock: mockProjects,
      collection: COLLECTIONS.PROJECTS,
      schema: ProjectSchema,
    });
  }
  return _projectService;
};

export type { MockProject, ProjectReference } from '../mocks/mockProjects';
export type { Project } from './validators';
export { PROJECT_CATEGORY_ICONS };

export interface PaginatedProjectResponse {
  projects: MockProject[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use projectService.list() instead
 */
export const fetchProjects = async (
  page = 1,
  limit = 9,
  tenant?: string,
  language?: string
): Promise<PaginatedProjectResponse> => {
  const currentTenant = tenant || resolveTenant();
  const projectService = await getProjectService();
  const response = await projectService.list(
    currentTenant,
    page,
    limit,
    language
  );

  const projectsWithIcons = response.items.map((project) => {
    if (!project.categoryIcon) {
      const iconKey = project.iconType || project.category;
      const icon =
        PROJECT_CATEGORY_ICONS[iconKey as keyof typeof PROJECT_CATEGORY_ICONS];
      return {
        ...project,
        categoryIcon: icon || undefined,
      };
    }
    return project;
  });

  return {
    projects: projectsWithIcons,
    totalPages: response.totalPages,
    currentPage: response.currentPage,
    totalItems: response.totalItems,
  };
};

/**
 * Legacy function for backwards compatibility
 * @deprecated Use projectService.byId() instead
 */
export const fetchProjectById = async (
  id: string,
  tenant?: string,
  language?: string
): Promise<MockProject> => {
  const currentTenant = tenant || resolveTenant();
  const projectService = await getProjectService();
  const project = await projectService.byId(currentTenant, id, language);

  if (!project.categoryIcon) {
    const iconKey = project.iconType || project.category;
    project.categoryIcon =
      PROJECT_CATEGORY_ICONS[iconKey as keyof typeof PROJECT_CATEGORY_ICONS] ||
      undefined;
  }

  return project;
};
