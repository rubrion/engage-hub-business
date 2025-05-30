import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentListPage, {
  HeroButton,
} from '../components/content/ContentListPage';
import { ContentItem } from '../components/ui/Card/ContentCard';
import NewsletterPopup from '../components/ui/Newsletter';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockedBlogPost } from '../services/blog';
import { CATEGORY_ICONS } from '../utils/iconMappings';

const Blog: React.FC = () => {
  const params = useParams<{ page?: string }>();
  const initialPage = params.page ? parseInt(params.page, 10) : 1;
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const { getContent } = useLocalizedContent('screens', 'blog');

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  const heroButtons: HeroButton[] = [
    {
      // Fix: Access the complete path to the translation key
      text: getContent<string>('hero.subscribeButton'),
      onClick: handleOpenNewsletter,
      variant: 'contained',
      color: 'primary',
    },
  ];

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  const mapToContentItems = useMemo(() => {
    return (items: MockedBlogPost[]): ContentItem[] => {
      return items.map((item) => {
        // No need to add language parameters to links - language is persisted in localStorage
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          category: item.category,
          ctaLink: ROUTES.BLOG.POST_DETAIL({ id: String(item.id) }),
          ctaText: getContent<string>('content.readMore'),
          date: item.date,
          author: item.meta?.author,
          tags: item.meta?.tags || [],
          featured: item.featured || false,
        };
      });
    };
  }, [getContent]);

  return (
    <BaseLayout>
      {newsletterOpen && (
        <NewsletterPopup open={true} onClose={handleCloseNewsletter} />
      )}

      <ContentListPage
        resource="blog"
        i18nBase="screens.blog"
        currentPage={initialPage}
        itemsPerPage={9}
        heroButtons={heroButtons}
        linkToItem={(id) => ROUTES.BLOG.POST_DETAIL({ id })}
        linkToPage={(page) => ROUTES.BLOG.LIST_PAGED({ page })}
        contentSectionId="articles-section"
        mapToContentItems={mapToContentItems}
        categoryIconMap={categoryIconMap}
      />
    </BaseLayout>
  );
};

export default Blog;
