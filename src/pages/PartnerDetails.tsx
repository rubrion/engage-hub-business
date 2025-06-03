import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CTASection } from '../components/ui';
import EntityCard from '../components/ui/Card/EntityCard';
import { Partner, usePartners } from '../data/partnersData';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useScrollTo } from '../hooks/useScrollTo';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';

const PartnerDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollToElement } = useScrollTo();
  const { getContent } = useLocalizedContent('screens', 'partners');

  const partners = usePartners();

  const partnerData = {
    hero: {
      title: getContent<string>('hero.title'),
    },
    details: {
      overline: getContent<string>('details.overline'),
      title: getContent<string>('details.title'),
      buttonText: getContent<string>('details.buttonText'),
      footer: getContent<string>('details.footer'),
    },
    websiteLabel: getContent<string>('websiteLabel'),
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
        id="partners-section"
        overline={partnerData.details.overline}
        title={partnerData.details.title}
        buttonText={partnerData.details.buttonText}
        onButtonClick={() =>
          navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=partner`)
        }
      >
        <Grid container spacing={4} sx={{ my: 4 }}>
          {partners.map((partner: Partner) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={partner.id || partner.name}
            >
              <EntityCard
                avatar={partner.src || ''}
                name={partner.name}
                subtitle={partner.subtitle}
                description={partner.description}
                links={{
                  website: partner.website,
                }}
                variant="partner"
                forceAvatarLayout={false}
                avatarSize={120}
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 6 }}
        >
          {partnerData.details.footer}
        </Typography>
      </CTASection>
    </BaseLayout>
  );
};

export default PartnerDetails;
