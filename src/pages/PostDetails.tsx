import { Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import ContentDetailPage, {
  MetaDisplay,
  SidebarConfig,
} from '../components/content/ContentDetailPage';
import PageHelmet from '../components/translation/PageHelmet';
import NewsletterPopup from '../components/ui/Newsletter';
import { useContentById } from '../hooks/useContent';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { MockedBlogPost } from '../services/blog';
import { CATEGORY_ICONS } from '../utils/iconMappings';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const [newsletterOpen, setNewsletterOpen] = useState(false);

  const { getContent: getPostContent } = useLocalizedContent(
    'screens',
    'postDetail'
  );
  const { getContent: getNavContent } = useLocalizedContent(
    'navigation',
    'menu'
  );

  const { document: post } = useContentById<MockedBlogPost>('blog', id);

  const handleOpenNewsletter = () => {
    setNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setNewsletterOpen(false);
  };

  const categoryIconMap = useMemo(() => CATEGORY_ICONS, []);

  if (!id) {
    return (
      <BaseLayout>
        <Paper sx={{ p: 3, m: 3, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h5" color="error">
            Invalid project ID
          </Typography>
        </Paper>
      </BaseLayout>
    );
  }

  const breadcrumbs = [
    {
      label: getNavContent<string>('home'),
      href: ROUTES.PUBLIC.HOME.path,
    },
    {
      label: getNavContent<string>('blog'),
      href: ROUTES.BLOG.ROOT.path,
    },
    {
      label: post?.title || id,
    },
  ];

  const metaSections: MetaDisplay[] = [];

  if (post) {
    if (post.meta?.author) {
      const authorItems: { label: string; value: React.ReactNode }[] = [
        {
          label: getPostContent<string>('details.author'),
          value: post.meta.author,
        },
      ];

      if (post.meta?.email) {
        authorItems.push({
          label: getPostContent<string>('details.email'),
          value: (
            <a href={`mailto:${post.meta.email}`} style={{ color: 'inherit' }}>
              {post.meta.email}
            </a>
          ),
        });
      }

      metaSections.push({
        title: getPostContent<string>('sections.author'),
        values: authorItems,
      });
    }

    const detailItems = [];

    if (post.date) {
      detailItems.push({
        label: getPostContent<string>('details.publishedOn'),
        value: new Date(post.date).toLocaleDateString(),
      });
    }

    if (post.category) {
      detailItems.push({
        label: getPostContent<string>('details.category'),
        value: post.category,
      });
    }

    if (post.meta?.readTime) {
      detailItems.push({
        label: getPostContent<string>('details.readTime'),
        value: `${post.meta.readTime} min`,
      });
    }

    if (detailItems.length > 0) {
      metaSections.push({
        title: getPostContent<string>('sections.details'),
        values: detailItems,
      });
    }

    if (post.meta?.tags && post.meta.tags.length > 0) {
      metaSections.push({
        title: getPostContent<string>('sections.tags'),
        values: [
          {
            label: '',
            value: (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {post.meta.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.06)',
                      padding: '2px 8px',
                      borderRadius: theme.shape.borderRadius,
                      marginRight: '4px',
                      marginBottom: '4px',
                      fontSize: '0.85rem',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ),
          },
        ],
      });
    }
  }

  const sidebar: SidebarConfig = {
    metaSections,
    newsletter: {
      title: getPostContent<string>('newsletter.title'),
      description: getPostContent<string>('newsletter.description'),
      buttonText: getPostContent<string>('newsletter.button'),
      buttonLink: '#',
      onClick: handleOpenNewsletter,
    },
  };

  const cta = {
    overline: getPostContent<string>('cta.overline'),
    title: getPostContent<string>('cta.title'),
    buttons: [
      {
        text: getPostContent<string>('cta.button'),
        href: ROUTES.BLOG.ROOT.path,
        variant: 'outlined' as const,
      },
    ],
  };

  const pageTitle = post?.title
    ? `${post.title} | ${getNavContent<string>('blog')}`
    : getPostContent<string>('meta.title');

  const pageDescription = post?.body
    ? post.body.substring(0, 160).replace(/<[^>]*>/g, '')
    : getPostContent<string>('meta.description');

  return (
    <BaseLayout>
      {newsletterOpen && (
        <NewsletterPopup open={true} onClose={handleCloseNewsletter} />
      )}

      <PageHelmet
        title={pageTitle}
        description={pageDescription}
        translationNamespace="screens"
        translationKey="postDetail"
      >
        <ContentDetailPage
          resource="blog"
          i18nBase="screens.postDetail"
          translationNamespace="postDetail"
          id={id}
          breadcrumbs={breadcrumbs}
          linkToList={ROUTES.BLOG.ROOT.path}
          sidebar={sidebar}
          cta={cta}
          categoryIconMap={categoryIconMap}
        />
      </PageHelmet>
    </BaseLayout>
  );
};

export default PostDetails;
