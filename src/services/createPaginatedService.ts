import { z } from 'zod';

import { resolveTenant } from '../core/tenantUtils';
import { CommonContent, PaginatedContentResponse } from '../types/content';
import { debugError, debugLog } from '../utils/debugControl';

/**
 * Options for creating a paginated service
 */
export interface PaginatedServiceOptions<T extends CommonContent> {
  route: string;
  mock?: T[];
  collection: string;
  schema: z.ZodType<T>;
}

/**
 * Standard response format for paginated endpoints
 */
export interface PaginatedResponse<T extends CommonContent>
  extends PaginatedContentResponse<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

/**
 * Creates a service for handling paginated data
 * @template T The type of data being handled
 */
export function createPaginatedService<T extends CommonContent>(
  options: PaginatedServiceOptions<T>
) {
  const { route, mock, collection, schema } = options;

  /**
   * Lists items with pagination
   */
  const list = async (
    tenant?: string,
    page = 1,
    limit = 10,
    language?: string
  ): Promise<PaginatedResponse<T>> => {
    try {
      const currentTenant = tenant || resolveTenant();

      const apiUrl = new URL(`/api${route}`, window.location.origin);
      apiUrl.searchParams.set('page', page.toString());
      apiUrl.searchParams.set('limit', limit.toString());
      apiUrl.searchParams.set('tenant', currentTenant);

      if (language) {
        apiUrl.searchParams.set('lang', language);
      }

      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();

      const items =
        responseData.items ?? responseData.posts ?? responseData.projects;

      if (!items) {
        throw new Error('Invalid response format: missing items array');
      }

      const validItems = items.map((item: Record<string, unknown>) => {
        try {
          return schema.parse(item);
        } catch (e) {
          console.warn(`Validation failed for item ${item.id}:`, e);
          return item;
        }
      });

      return {
        items: validItems,
        totalPages: responseData.totalPages || 1,
        currentPage: responseData.currentPage || 1,
        totalItems: responseData.totalItems || validItems.length,
      };
    } catch (error) {
      debugError('Error fetching paginated data:', error);

      if (mock) {
        debugLog('Using mock data as fallback');
        const start = (page - 1) * limit;
        const filteredMocks = language
          ? mock.filter(
              (item) =>
                item.language === language ||
                (!item.language && language === 'en')
            )
          : mock;

        return {
          items: filteredMocks.slice(start, start + limit),
          totalPages: Math.ceil(filteredMocks.length / limit),
          currentPage: page,
          totalItems: filteredMocks.length,
        };
      }

      throw error;
    }
  };

  const byId = async (
    tenant?: string,
    id?: string,
    language?: string
  ): Promise<T> => {
    if (!id) {
      throw new Error('ID is required');
    }

    try {
      const currentTenant = tenant || resolveTenant();

      const apiUrl = new URL(`/api${route}/${id}`, window.location.origin);
      apiUrl.searchParams.set('tenant', currentTenant);

      if (language) {
        apiUrl.searchParams.set('lang', language);
      }

      const response = await fetch(apiUrl.toString());

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      try {
        return schema.parse(data);
      } catch (e) {
        console.warn(`Validation failed for item ${id}:`, e);
        return data as T;
      }
    } catch (error) {
      debugError(`Error fetching item with ID ${id}:`, error);

      // Fallback to mock data if available
      if (mock) {
        debugLog('Using mock data as fallback');
        const mockItem = mock.find(
          (item) =>
            item.id === id &&
            (!language ||
              item.language === language ||
              (!item.language && language === 'en'))
        );

        if (mockItem) {
          return mockItem;
        }

        if (language && language !== 'en') {
          const fallbackItem = mock.find(
            (item) =>
              item.id === id && (item.language === 'en' || !item.language)
          );

          if (fallbackItem) {
            return {
              ...fallbackItem,
              langUsed: 'en',
            } as T;
          }
        }
      }

      throw error;
    }
  };

  return {
    list,
    byId,
    route,
    collection,
  };
}
