import { createContext } from 'react';

export interface PageContent {
  [key: string]: unknown;
}

export interface ContentContextType {
  content: PageContent | null;
  loading: boolean;
  error: Error | null;
  loadPageContent: (pageId: string) => Promise<void>;
  refreshContent: () => Promise<void>;
}

export const ContentContext = createContext<ContentContextType>({
  content: null,
  loading: false,
  error: null,
  loadPageContent: async () => {},
  refreshContent: async () => {},
});
