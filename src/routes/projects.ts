import {
  DynamicRoute,
  OptionalDetailParams,
  PaginationParams,
  RouteObject,
} from './types';

const PROJECTS_ROUTES = {
  ROOT: {
    path: '/projects',
    label: 'Projects',
    labelKey: { namespace: 'navigation', key: 'menu.projects' },
    description: 'Explore our projects',
    descriptionKey: { namespace: 'common', key: 'meta.projects' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST: {
    path: '/projects/page/1',
    label: 'Projects',
    labelKey: { namespace: 'navigation', key: 'menu.projects' },
    description: 'Explore our projects',
    descriptionKey: { namespace: 'common', key: 'meta.projects' },
    translationNamespace: 'navigation',
  } as RouteObject,

  LIST_PAGED: ((params: PaginationParams): string => {
    return `/projects/page/${params.page}`;
  }) as DynamicRoute<PaginationParams>,

  LIST_PAGED_STATIC: '/projects/page/:page',

  PROJECT_DETAIL: ((params: OptionalDetailParams = {}): string => {
    if (!params.id) return '/projects/project/:id';
    return `/projects/project/${params.id}`;
  }) as DynamicRoute<OptionalDetailParams>,

  PROJECT_DETAIL_STATIC: '/projects/project/:id',
};

export default PROJECTS_ROUTES;
