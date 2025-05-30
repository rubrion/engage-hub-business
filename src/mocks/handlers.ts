import { http, HttpHandler } from 'msw';

import { handlers as i18nHandlersAll } from '../i18n/msw/handlers';
import { debugLog } from '../utils/debugControl';
import { blogHandlers } from './mockBlogPosts';
import { projectHandlers } from './mockProjects';

/**
 * Determines if a handler is a content handler based on its path
 * Content handlers are those that serve actual content (posts, projects, etc)
 * @param handler - The MSW handler to check
 * @returns boolean - True if the handler is a content handler
 */
const isContentHandler = (handler: HttpHandler) => {
  const path = handler.info.path;

  const contentPatterns = ['/api/posts/', '/api/projects/'];

  if (typeof path === 'string') {
    return contentPatterns.some((pattern) => path.includes(pattern));
  } else if (path instanceof RegExp) {
    const pathStr = path.toString();
    return contentPatterns.some((pattern) => pathStr.includes(pattern));
  }

  return false;
};

const i18nHandlers = i18nHandlersAll.filter(
  (handler) => !isContentHandler(handler)
);

export const handlers = [
  ...projectHandlers,
  ...blogHandlers,
  ...i18nHandlers,

  http.get('/api/health', () => {
    return new Response(JSON.stringify({ status: 'up', mswActive: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];

debugLog('All MSW handlers registered:', handlers.length);
debugLog(
  'Handler paths:',
  handlers.map((h) => h.info.method + ' ' + h.info.path)
);
