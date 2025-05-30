import {
  DynamicRoute,
  OptionalDetailParams,
  PaginationParams,
  RouteObject,
} from './types';

const BLOG_ROUTES = {
  ROOT: {
    path: '/blog',
    label: 'Blog',
    labelKey: { namespace: 'navigation', key: 'menu.blog' },
    description: 'Read the latest updates and insights',
    descriptionKey: { namespace: 'common', key: 'meta.blog' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST: {
    path: '/blog/page/1',
    label: 'Blog',
    labelKey: { namespace: 'navigation', key: 'menu.blog' },
    description: 'Read the latest updates and insights',
    descriptionKey: { namespace: 'common', key: 'meta.blog' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST_PAGED: ((params: PaginationParams): string => {
    return `/blog/page/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/blog/page/:page',

  POST_DETAIL: ((params: OptionalDetailParams = {}): string => {
    if (!params.id) return '/blog/post/:id';
    return `/blog/post/${params.id}`;
  }) as DynamicRoute<OptionalDetailParams>,

  POST_DETAIL_STATIC: '/blog/post/:id',
};

export default BLOG_ROUTES;
