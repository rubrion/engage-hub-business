import { z } from 'zod';

import { COLLECTIONS } from '../config';
import {
  CommonContent,
  CONTENT_ENDPOINTS,
  ContentResource,
} from '../types/content';
import {
  createPaginatedService,
  PaginatedResponse,
} from './createPaginatedService';

/**
 * Common content schema shared by all content types
 */
export const CommonContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  language: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

/**
 * Map of content resources to their mock data
 */
const getResourceMocks = async (
  resource: ContentResource
): Promise<CommonContent[]> => {
  try {
    // Use dynamic import instead of require
    let mockData: CommonContent[] = [];

    if (resource === 'blog') {
      const { mockBlogPosts } = await import('../mocks/mockBlogPosts');
      mockData = mockBlogPosts;
    } else if (resource === 'projects') {
      const { mockProjects } = await import('../mocks/mockProjects');
      mockData = mockProjects;
    }

    return mockData;
  } catch (error) {
    console.warn(`Could not load mock data for ${resource}:`, error);
    return [];
  }
};

/**
 * Map of content resources to their Firestore collections
 */
const RESOURCE_COLLECTIONS: Record<ContentResource, string> = {
  blog: COLLECTIONS.BLOGS,
  projects: COLLECTIONS.PROJECTS,
};

/**
 * Creates a service for handling content data (both paginated lists and individual items)
 *
 * @template T Type of content being handled, extending the CommonContent interface
 * @param resource The content resource identifier ('blogPosts', 'projects', etc)
 * @param schema Optional Zod schema for validation (defaults to CommonContentSchema)
 * @returns A service object with methods for interacting with the content
 */
export async function createContentService<T extends CommonContent>(
  resource: ContentResource,
  schema: z.ZodType<T> = CommonContentSchema as unknown as z.ZodType<T>
) {
  // Get the API endpoint and collection for this resource
  const endpoint = CONTENT_ENDPOINTS[resource];
  const collection = RESOURCE_COLLECTIONS[resource];

  // Get mock data for this resource
  const mockData = await getResourceMocks(resource);

  // Create the paginated service
  return createPaginatedService<T>({
    route: `/${endpoint}`,
    mock: mockData as T[],
    collection,
    schema,
  });
}

/**
 * List content with pagination
 *
 * @template T Type of content being handled
 * @param service The content service to use
 * @param page Current page number
 * @param limit Items per page
 * @param tenant Optional tenant identifier
 * @param language Optional language code
 * @returns Promise resolving to paginated response
 */
export async function listContent<T extends CommonContent>(
  service:
    | Promise<ReturnType<typeof createContentService<T>>>
    | ReturnType<typeof createContentService<T>>,
  page = 1,
  limit = 10,
  tenant?: string,
  language?: string
): Promise<PaginatedResponse<T>> {
  const resolvedService = await Promise.resolve(service);
  return await resolvedService.list(tenant, page, limit, language);
}

/**
 * Get a single content item by ID
 *
 * @template T Type of content being handled
 * @param service The content service to use
 * @param id Item identifier
 * @param tenant Optional tenant identifier
 * @param language Optional language code
 * @returns Promise resolving to a single content item
 */
export async function getContentById<T extends CommonContent>(
  service:
    | Promise<ReturnType<typeof createContentService<T>>>
    | ReturnType<typeof createContentService<T>>,
  id: string,
  tenant?: string,
  language?: string
): Promise<T> {
  const resolvedService = await Promise.resolve(service);
  return await resolvedService.byId(tenant, id, language);
}
