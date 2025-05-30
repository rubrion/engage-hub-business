import { http, HttpResponse } from 'msw';

import { debugLog } from '../../utils/debugControl';
import { Lang } from '../lang';
import { getDocument } from './db';

/**
 * MSW handlers for mocking the remote document API endpoints
 */
export const handlers = [
  http.get('/api/projects/:id', ({ params, request }) => {
    debugLog(`MSW intercepted GET /api/projects/${params.id} request`);

    try {
      const { id } = params;
      const url = new URL(request.url);
      const lang = (url.searchParams.get('lang') || 'en') as Lang;

      if (!id) {
        return HttpResponse.json(
          { error: 'Project ID is required' },
          { status: 400 }
        );
      }

      const { data, langUsed } = getDocument('projects', id as string, lang);

      if (!data) {
        return HttpResponse.json(
          { error: `Project not found: ${id}` },
          { status: 404 }
        );
      }

      return HttpResponse.json({ data, langUsed }, { status: 200 });
    } catch (error) {
      console.error(`Error in /api/projects/:id handler:`, error);
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.get('/api/posts/:id', ({ params, request }) => {
    debugLog(`MSW intercepted GET /api/posts/${params.id} request`);

    try {
      const { id } = params;
      const url = new URL(request.url);
      const lang = (url.searchParams.get('lang') || 'en') as Lang;

      if (!id) {
        return HttpResponse.json(
          { error: 'Post ID is required' },
          { status: 400 }
        );
      }

      const { data, langUsed } = getDocument('blogPosts', id as string, lang);

      if (!data) {
        return HttpResponse.json(
          { error: `Blog post not found: ${id}` },
          { status: 404 }
        );
      }

      return HttpResponse.json({ data, langUsed }, { status: 200 });
    } catch (error) {
      console.error(`Error in /api/posts/:id handler:`, error);
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.get('/api/ping', () => {
    return HttpResponse.json(
      { status: 'ok', mswActive: true },
      { status: 200 }
    );
  }),
];

debugLog(
  'MSW i18n handlers registered:',
  handlers.map((h) => h.info.method + ' ' + h.info.path)
);
