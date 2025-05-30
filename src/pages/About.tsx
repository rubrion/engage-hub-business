import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MissingTranslation from '../components/translation/MissingTranslation';
import { CTASection } from '../components/ui';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import BaseLayout from '../layouts/BaseLayout';
import { scrollToElement } from '../utils/navigationUtils';

interface ValueItem {
  title: string;
  description: string;
}

const About: React.FC = () => {
  const location = useLocation();
  const { getContent } = useLocalizedContent('screens', 'about');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search]);

  const story = {
    title: getContent<string>('story.title'),
    content: getContent<string[]>('story.content'),
  };

  const values = {
    overline: getContent<string>('values.overline'),
    title: getContent<string>('values.title'),
    subtitle: getContent<string>('values.subtitle'),
    items: getContent<ValueItem[]>('values.items'),
  };

  // Helper function to render content or MissingTranslation component when null
  const renderContent = (content: string | null, key: string) => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  return (
    <BaseLayout>
      <Container id="our-story-section" maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                {renderContent(story.title, 'about.story.title')}
              </Typography>
              {Array.isArray(story.content) ? (
                story.content.map((paragraph: string, index: number) => (
                  <Typography key={index} variant="body1" sx={{ mb: 2 }}>
                    {paragraph}
                  </Typography>
                ))
              ) : (
                <MissingTranslation
                  translationKey="story.content"
                  namespace="screens.about"
                />
              )}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundImage: `url('/about/about-hero.png')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: { xs: 250, sm: 300, md: 400 },
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <CTASection
        overline={renderContent(values.overline, 'about.values.overline')}
        title={renderContent(values.title, 'about.values.title')}
        subtitle={renderContent(values.subtitle, 'about.values.subtitle')}
      >
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(values.items) ? (
            values.items.map((value: ValueItem, index: number) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2">{value.description}</Typography>
                </Box>
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <MissingTranslation
                translationKey="values.items"
                namespace="screens.about"
              />
            </Grid>
          )}
        </Grid>
      </CTASection>
    </BaseLayout>
  );
};

export default About;
