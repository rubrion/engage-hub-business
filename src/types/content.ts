/**
 * Common content interface shared between blog posts, projects, and other content types
 */
export interface CommonContent {
  id: string;
  title: string;
  description?: string;
  body: string;
  image?: string;
  category?: string;
  date?: string;
  language?: string;
  featured?: boolean;
  meta?: {
    description?: string;
    category?: string;
    date?: string;
    author?: string;
    technologies?: string[];
    github?: string;
    website?: string;
    email?: string;
    readTime?: number;
    tags?: string[];
    [key: string]: unknown;
  };
}

/**
 * Response structure for paginated content
 */
export interface PaginatedContentResponse<T extends CommonContent> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Content resource identifier
 */
export type ContentResource = 'blog' | 'projects';

/**
 * Map of content resources to their API endpoints
 */
export const CONTENT_ENDPOINTS: Record<ContentResource, string> = {
  blog: 'posts',
  projects: 'projects',
};
