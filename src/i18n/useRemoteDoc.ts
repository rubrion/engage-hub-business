import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useLanguage } from '../hooks/useLanguageContext';
import { useTenant } from '../hooks/useTenantContext';
import { debugLog } from '../utils/debugControl';
import { getLangParam, Lang } from './lang';

/**
 * Interface for remote documents
 */
export interface RemoteDoc {
  title: string;
  body: string;
  meta?: {
    description?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Response structure for remote document API
 */
interface RemoteDocResponse {
  data: RemoteDoc | null;
  langUsed: Lang;
}

/**
 * Map of document types to their respective API endpoints
 */
const DOC_TYPE_ENDPOINTS: Record<string, string> = {
  projects: 'projects',
  blogPosts: 'posts',
};

/**
 * Hook for fetching remote documents with language support
 * Automatically handles language fallback to English if the requested language is not available
 *
 * @param docType The type of document to fetch ('projects', 'blogPosts', etc.)
 * @param slug The unique identifier for the document
 * @param langOverride Optional language override (defaults to URL param or context language)
 * @returns Query result with document data, loading state, error state, and language actually used
 */
export function useRemoteDoc(
  docType: string,
  slug: string | undefined,
  langOverride?: Lang
) {
  const location = useLocation();
  const { language: contextLanguage } = useLanguage();
  const tenant = useTenant();

  // Determine which language to use (priority: override > URL param > context)
  const urlLang = getLangParam(location.search);
  const language = langOverride || urlLang || contextLanguage;

  // Get the API endpoint for the document type
  const endpoint = DOC_TYPE_ENDPOINTS[docType] || docType;

  // Fetch the document with React Query
  const query = useQuery({
    queryKey: ['remoteDoc', docType, slug, language],
    queryFn: async (): Promise<RemoteDocResponse> => {
      if (!slug) {
        throw new Error('Document slug is required');
      }

      const url = new URL(`/api/${endpoint}/${slug}`, window.location.origin);
      url.searchParams.set('lang', language);

      if (tenant) {
        url.searchParams.set('tenant', tenant);
      }

      // Create an AbortController for this request
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch(url.toString(), { signal });

        if (!response.ok) {
          if (response.status === 404) {
            return { data: null, langUsed: language };
          }
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return {
          data: result.data || result,
          langUsed: result.langUsed || language,
        };
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          debugLog('Request was aborted');
        }
        throw error;
      }
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    ...query,
    document: query.data?.data || null,
    langUsed: query.data?.langUsed || language,
    isUsingFallback: useMemo(() => {
      return !!query.data && query.data.langUsed !== language;
    }, [query.data, language]),
  };
}
