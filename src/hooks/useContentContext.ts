import { useContext } from 'react';

import {
  ContentContext,
  ContentContextType,
  PageContent,
} from '../context/contentContextUtils';

export const useContent = () => useContext(ContentContext);

export type { ContentContextType, PageContent };
