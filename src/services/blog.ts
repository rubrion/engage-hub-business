import { COLLECTIONS } from '../config';
import { resolveTenant } from '../core/tenantUtils';
import { mockBlogPosts, MockedBlogPost } from '../mocks/mockBlogPosts';
import { BLOG_CATEGORY_ICONS_STRINGS } from '../utils/iconMappings';
import { createPaginatedService } from './createPaginatedService';
import { BlogPostSchema } from './validators';

export { BLOG_CATEGORY_ICONS_STRINGS as BLOG_CATEGORY_ICONS };

export type { MockedBlogPost };

export const blogService = createPaginatedService<MockedBlogPost>({
  route: '/posts',
  mock: mockBlogPosts,
  collection: COLLECTIONS.BLOGS,
  schema: BlogPostSchema,
});

const addCategoryIcon = (post: MockedBlogPost): MockedBlogPost => {
  if (!post.categoryIcon) {
    const iconKey = post.iconType || post.category;
    if (iconKey) {
      const iconName = iconKey as keyof typeof BLOG_CATEGORY_ICONS_STRINGS;
      return {
        ...post,
        categoryIcon: BLOG_CATEGORY_ICONS_STRINGS[iconName] || undefined,
      };
    }
  }
  return post;
};

// Legacy interface for backwards compatibility
export interface PaginatedBlogResponse {
  posts: MockedBlogPost[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use blogService.list() instead
 */
export const fetchBlogPosts = async (
  page = 1,
  limit = 9,
  tenant?: string,
  language?: string
): Promise<PaginatedBlogResponse> => {
  const currentTenant = tenant || resolveTenant();

  const response = await blogService.list(currentTenant, page, limit, language);

  const postsWithIcons = response.items.map(addCategoryIcon);

  return {
    posts: postsWithIcons,
    totalPages: response.totalPages,
    currentPage: response.currentPage,
    totalItems: response.totalItems,
  };
};

/**
 * Legacy function for backwards compatibility
 * @deprecated Use blogService.byId() instead
 */
export const fetchBlogPostById = async (
  id: string,
  tenant?: string,
  language?: string
): Promise<MockedBlogPost> => {
  const currentTenant = tenant || resolveTenant();

  const post = await blogService.byId(currentTenant, id, language);

  return addCategoryIcon(post);
};
