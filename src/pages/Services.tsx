import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import ServiceCard, {
  ServiceItemType,
} from '../components/ui/Card/ServiceCard';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { gridSizes } from '../theme/themeUtils';

interface ProcessStep {
  phase: string;
  description: string;
}

const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'services');

  const serviceData = {
    hero: {
      overline: getContent<string>('hero.overline'),
      title: getContent<string>('hero.title'),
    },
    services: getContent<ServiceItemType[]>('services'),
    process: {
      overline: getContent<string>('process.overline'),
      title: getContent<string>('process.title'),
      subtitle: getContent<string>('process.subtitle'),
      buttonText: getContent<string>('process.buttonText'),
      steps: getContent<ProcessStep[]>('process.steps'),
      footer: getContent<string>('process.footer'),
    },
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollTo');

    if (scrollToId) {
      scrollToElement(scrollToId);
    }
  }, [location.search, scrollToElement]);

  return (
    <BaseLayout>
      <CTASection
        id="services-section"
        overline={serviceData.hero.overline}
        title={serviceData.hero.title}
        maxWidth="lg"
      >
        <Grid container spacing={4}>
          {Array.isArray(serviceData.services) &&
            serviceData.services.map((service: ServiceItemType) => (
              <Grid
                size={gridSizes.quarterWidth}
                key={service.id || service.title}
              >
                <ServiceCard service={service} />
              </Grid>
            ))}
        </Grid>
      </CTASection>

      <CTASection
        overline={serviceData.process.overline}
        title={serviceData.process.title}
        subtitle={serviceData.process.subtitle}
        buttonText={serviceData.process.buttonText}
        onButtonClick={() =>
          navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=services`)
        }
      >
        <Grid container spacing={2} justifyContent="center">
          {Array.isArray(serviceData.process.steps) &&
            serviceData.process.steps.map(
              (step: ProcessStep, index: number) => (
                <Grid size={gridSizes.thirdWidth} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        position: 'absolute',
                        top: -20,
                        left: 10,
                        opacity: 0.1,
                        fontSize: '6rem',
                        fontWeight: 700,
                        zIndex: -1,
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {step.phase}
                    </Typography>
                    <Typography variant="body2">{step.description}</Typography>
                  </Box>
                </Grid>
              )
            )}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {serviceData.process.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default Services;
