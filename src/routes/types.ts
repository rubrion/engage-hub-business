export type TranslationKey = {
  key: string;
  namespace: string;
};

export type RouteObject = {
  path: string;
  label: string;
  labelKey?: TranslationKey | string;
  description?: string;
  descriptionKey?: TranslationKey | string;
  translationNamespace?: string;
};

export type DynamicRoute<
  T extends Record<string, string | number | undefined>,
> = (params: T) => string;

export interface PaginationParams extends Record<string, string | number> {
  page: number;
}

export interface DetailParams extends Record<string, string | number> {
  id: string;
}

export interface OptionalDetailParams {
  id?: string;
  [key: string]: string | number | undefined;
}
