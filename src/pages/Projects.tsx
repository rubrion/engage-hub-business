import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockProject } from '../services/projects';
import { CATEGORY_ICONS } from '../utils/iconMappings';
import { createScrollRoute } from '../utils/navigationUtils';

const Projects: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;

  const { getContent: getProjectContent } = useLocalizedContent(
    'screens',
    'projects'
  );
  const { getContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

  const heroButtons: HeroButton[] = [
    {
      text: getProjectContent<string>('hero.buttonText'),
      onClick: () =>
        navigate(
          createScrollRoute(ROUTES.PUBLIC.SERVICES.path, 'services-section')
        ),
      variant: 'contained',
      color: 'primary',
    },
  ];

  const breadcrumbs = [
    {
      label: getNavContent<string>('home'),
      href: ROUTES.PUBLIC.HOME.path,
    },
    {
      label: getNavContent<string>('projects'),
    },
  ];

  const mapToContentItems = useMemo(() => {
    return (items: MockProject[]): ContentItem[] => {
      return items.map((item) => {
        // No need to add language parameters to links - language is persisted in localStorage
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category || 'Project',
          ctaLink: ROUTES.PROJECTS.PROJECT_DETAIL({ id: String(item.id) }),
          ctaText: getProjectContent<string>('content.viewDetails'),
          date: item.date,
          tags: item.meta?.technologies || [],
          featured: item.featured || false,
        };
      });
    };
  }, [getProjectContent]);

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  return (
    <BaseLayout>
      <ContentListPage
        resource="projects"
        i18nBase="screens.projects"
        currentPage={initialPage}
        itemsPerPage={9}
        heroButtons={heroButtons}
        linkToItem={(id) => ROUTES.PROJECTS.PROJECT_DETAIL({ id })}
        linkToPage={(page) => ROUTES.PROJECTS.LIST_PAGED({ page })}
        breadcrumbs={breadcrumbs}
        contentSectionId="projects-section"
        mapToContentItems={mapToContentItems}
        categoryIconMap={categoryIconMap}
      />
    </BaseLayout>
  );
};

export default Projects;
