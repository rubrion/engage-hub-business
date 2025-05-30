import {
  Box,
  Container,
  Grid,
  Pagination,
  SvgIcon,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { usePaginatedContent } from '../../hooks/useContent';
import { useLanguage } from '../../hooks/useLanguageContext';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { useScrollTo } from '../../hooks/useScrollTo';
import { getImporterForPath } from '../../routes/importRegistry';
import { CommonContent, ContentResource } from '../../types/content';
import MissingTranslation from '../translation/MissingTranslation';
import { CTASection, HeroSection, LoadingIndicator } from '../ui';
import ContentCard, { ContentItem } from '../ui/Card/ContentCard';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface HeroButton {
  text: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'inherit';
  href?: string;
}

interface ContentListPageProps<T extends CommonContent> {
  resource: ContentResource;
  i18nBase: string;
  currentPage?: number;
  itemsPerPage?: number;
  heroButtons?: HeroButton[];
  linkToItem: (id: string) => string;
  linkToPage?: (page: number) => string;
  breadcrumbs?: BreadcrumbItem[];
  translationNamespace?: string;
  contentSectionId?: string;
  newsletter?: React.ReactNode;
  mapToContentItems?: (items: T[]) => ContentItem[];
  categoryIconMap?: Record<string, typeof SvgIcon>;
}

/**
 * Generic content list page that works with any content type
 */
function ContentListPage<T extends CommonContent>({
  resource,
  currentPage = 1,
  itemsPerPage = 9,
  heroButtons = [],
  linkToItem,
  linkToPage,
  contentSectionId = 'content-section',
  newsletter,
  mapToContentItems,
  categoryIconMap,
}: ContentListPageProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { language } = useLanguage();
  const [page, setPage] = useState(currentPage);
  const namespace = resource;
  const { getContent } = useLocalizedContent('screens', namespace);
  const {
    data: contentData,
    isLoading,
    error,
  } = usePaginatedContent<T>(resource, page, itemsPerPage, undefined, language);
  const translations = useMemo(
    () => ({
      hero: {
        title: getContent<string>('hero.title'),
        subtitle: getContent<string>('hero.subtitle'),
        overline: getContent<string>('hero.overline'),
      },
      content: {
        overline: getContent<string>('content.overline'),
        title: getContent<string>('content.title'),
        readMore: getContent<string>('content.readMore'),
        viewDetails: getContent<string>('content.viewDetails'),
        noItemsTitle: getContent<string>('content.noItemsTitle'),
        noItemsMessage: getContent<string>('content.noItemsMessage'),
      },
      loading: {
        items: getContent<string>('loading.items'),
        updating: getContent<string>('loading.updating'),
      },
    }),
    [getContent]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get('scrollTo');

    if (scrollToId) {
      setTimeout(() => {
        scrollToElement(scrollToId);
      }, 100);
    }
  }, [location.search, scrollToElement]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);

    if (linkToPage) {
      navigate(linkToPage(value));
    }
  };

  const renderContent = (
    content: string | null,
    key: string
  ): React.ReactNode => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  const defaultMapToContentItems = (items: T[]): ContentItem[] => {
    return items.map((item) => {
      const baseLink = linkToItem(item.id);

      const detailImporter = getImporterForPath(baseLink);

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        ctaLink: baseLink,
        ctaText:
          resource === 'blog'
            ? translations.content.readMore
            : translations.content.viewDetails,
        date: item.date,
        author: item.meta?.author,
        tags: (item.meta?.tags as string[]) || [],
        featured: item.featured || false,
        prefetchImporter: detailImporter,
      };
    });
  };

  const finalMapToContentItems = mapToContentItems || defaultMapToContentItems;

  if (isLoading && !contentData) {
    return (
      <>
        <HeroSection
          title={translations.hero.title}
          subtitle={translations.hero.subtitle}
          overline={translations.hero.overline}
          imageSrc={
            resource === 'blog'
              ? '/blog/blog-hero.png'
              : '/projects/projects-hero.png'
          }
          buttons={heroButtons}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <LoadingIndicator message={translations.loading.items} fullHeight />
        </Container>

        {newsletter}
      </>
    );
  }

  const hasEmptyItems = contentData?.items?.length === 0;
  if (error || !contentData || hasEmptyItems) {
    return (
      <>
        <HeroSection
          title={renderContent(
            translations.hero.title,
            `screens.${namespace}.hero.title`
          )}
          subtitle={renderContent(
            translations.hero.subtitle,
            `screens.${namespace}.hero.subtitle`
          )}
          overline={renderContent(
            translations.hero.overline,
            `screens.${namespace}.hero.overline`
          )}
          imageSrc={
            resource === 'blog'
              ? '/blog/blog-hero.png'
              : '/projects/projects-hero.png'
          }
          buttons={heroButtons}
        />

        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
            {renderContent(
              translations.content.noItemsTitle,
              `screens.${namespace}.content.noItemsTitle`
            )}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: 'center' }}
          >
            {renderContent(
              translations.content.noItemsMessage,
              `screens.${namespace}.content.noItemsMessage`
            )}
          </Typography>
        </Container>

        {newsletter}
      </>
    );
  }

  return (
    <>
      <HeroSection
        title={renderContent(
          translations.hero.title,
          `screens.${namespace}.hero.title`
        )}
        subtitle={renderContent(
          translations.hero.subtitle,
          `screens.${namespace}.hero.subtitle`
        )}
        overline={renderContent(
          translations.hero.overline,
          `screens.${namespace}.hero.overline`
        )}
        imageSrc={
          resource === 'blog'
            ? '/blog/blog-hero.png'
            : '/projects/projects-hero.png'
        }
        buttons={heroButtons}
      />

      <CTASection
        id={contentSectionId}
        overline={renderContent(
          translations.content.overline,
          `screens.${namespace}.content.overline`
        )}
        title={renderContent(
          translations.content.title,
          `screens.${namespace}.content.title`
        )}
        maxWidth="lg"
      >
        {isLoading ? (
          <LoadingIndicator message={translations.loading.updating} />
        ) : (
          <>
            <Grid container spacing={4}>
              {finalMapToContentItems(contentData.items).map(
                (contentItem, index) => {
                  const isFeatured = contentItem.featured && index === 0;
                  return (
                    <Grid
                      key={contentItem.id}
                      size={{
                        xs: 12,
                        sm: 12,
                        md: isFeatured ? 12 : 6,
                        lg: isFeatured ? 12 : 4,
                      }}
                    >
                      <ContentCard
                        item={contentItem}
                        variant={isFeatured ? 'featured' : 'default'}
                        imageAspectRatio={
                          resource === 'projects' ? '75%' : '56.25%'
                        }
                        showCategory={true}
                        categoryIconMap={categoryIconMap}
                      />
                    </Grid>
                  );
                }
              )}
            </Grid>

            {contentData.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={contentData.totalPages}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </CTASection>
    </>
  );
}

export default ContentListPage;
