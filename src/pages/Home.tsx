import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MissingTranslation from '../components/translation/MissingTranslation';
import { HeroSection, SeasonalBanner } from '../components/ui';
import LogoAnimation from '../components/ui/LogoAnimation';
import PartnerCarousel from '../components/ui/PartnerCarousel';
import CTASection from '../components/ui/Section/CTASection';
import TeamSlider from '../components/ui/TeamSlider';
import { usePartners } from '../data/partnersData';
import { useTeamMembers } from '../data/teamData';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useTranslationContext } from '../hooks/useTranslationContext';
import BaseLayout from '../layouts/BaseLayout';
import ROUTES from '../routes';
import { getImporterForPath } from '../routes/importRegistry';
import { layout } from '../theme/themeUtils';
import { shouldShowLogoAnimation } from '../utils/logoAnimationState';
import { prefetch } from '../utils/prefetchRoute';
import { shouldShowLanding } from '../utils/shouldShowLanding';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { translationState } = useTranslationContext();
  const [showLogoAnimation, setShowLogoAnimation] = useState<boolean>(() =>
    shouldShowLogoAnimation()
  );
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const showSeasonalBanner = shouldShowLanding();

  const { getContent } = useLocalizedContent('screens', 'home');

  const partners = usePartners();
  const teamMembers = useTeamMembers();

  useEffect(() => {
    if (!translationState.isLoading) {
      setContentLoaded(true);
    }
  }, [translationState.isLoading]);

  const handleAnimationComplete = () => {
    setShowLogoAnimation(false);
  };

  const partnerLogos = useMemo(() => {
    return partners.map((partner) => ({
      src:
        partner.logo ||
        `/${partner.name.toLowerCase().replace(/\s+/g, '-')}-logo.svg`,
      name: partner.name,
      website: partner.website,
    }));
  }, [partners]);

  const hero = {
    title: getContent<string>('hero.title'),
    subtitle: getContent<string>('hero.subtitle'),
    overline: getContent<string>('hero.overline'),
  };

  const aboutContent = {
    overline: getContent<string>('about.overline'),
    title: getContent<string>('about.title'),
    subtitle: getContent<string>('about.subtitle'),
    buttonText: getContent<string>('about.buttonText'),
  };

  const partnersContent = {
    overline: getContent<string>('partners.overline'),
    title: getContent<string>('partners.title'),
    subtitle: getContent<string>('partners.subtitle'),
    buttonText: getContent<string>('partners.buttonText'),
  };

  const teamContent = {
    overline: getContent<string>('team.overline'),
    title: getContent<string>('team.title'),
    subtitle: getContent<string>('team.subtitle'),
    buttonText: getContent<string>('team.buttonText'),
  };

  const ctaContent = {
    becomePartner: getContent<string>('cta.becomePartner'),
    joinTeam: getContent<string>('cta.joinTeam'),
  };

  const renderContent = (content: string | null, key: string) => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  if (showLogoAnimation || translationState.isLoading) {
    return (
      <>
        <LogoAnimation
          onAnimationComplete={handleAnimationComplete}
          duration={2500}
          isContentLoaded={contentLoaded}
        />
        {contentLoaded && (
          <div style={{ visibility: 'hidden', position: 'absolute' }}>
            <BaseLayout showNavbar={false}>
              <div />
            </BaseLayout>
          </div>
        )}
      </>
    );
  }

  if (translationState.hasError) {
    return (
      <BaseLayout showNavbar={true} transparentNavbar={false}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'error.main',
              borderRadius: 1,
              bgcolor: 'error.light',
              color: 'error.dark',
              maxWidth: 600,
            }}
          >
            <h2>Translation Error</h2>
            <p>{translationState.errorDetails}</p>
            <p>
              Please check your translation files for the current language:{' '}
              {i18n.language}
            </p>
          </Box>
        </Box>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout showNavbar={false}>
      <Box>
        <HeroSection
          title={renderContent(hero.title, 'hero.title')}
          subtitle={renderContent(hero.subtitle, 'hero.subtitle')}
          overline={renderContent(hero.overline, 'hero.overline')}
          imageSrc="/home/start-hero.png"
          buttons={[
            {
              text: ctaContent.becomePartner,
              onClick: () => {
                if (getImporterForPath(ROUTES.PUBLIC.CONTACT.path)) {
                  prefetch(getImporterForPath(ROUTES.PUBLIC.CONTACT.path)!);
                }
                navigate(`${ROUTES.PUBLIC.CONTACT.path}?subject=partner`);
              },
            },
            {
              text: ctaContent.joinTeam,
              onClick: () => {
                if (getImporterForPath(ROUTES.PUBLIC.TEAMJOIN.path)) {
                  prefetch(getImporterForPath(ROUTES.PUBLIC.TEAMJOIN.path)!);
                }
                navigate(ROUTES.PUBLIC.TEAMJOIN.path);
              },
            },
          ]}
          showNavbar={true}
        />

        {showSeasonalBanner && (
          <Box
            sx={{
              px: { xs: 2, md: 4 },
              py: { xs: 3, md: 4 },
              pt: { xs: 4, md: 5 },
            }}
          >
            <SeasonalBanner />
          </Box>
        )}

        <CTASection
          id="about-section"
          overline={renderContent(aboutContent.overline, 'about.overline')}
          title={renderContent(aboutContent.title, 'about.title')}
          subtitle={renderContent(aboutContent.subtitle, 'about.subtitle')}
          buttonText={aboutContent.buttonText}
          onButtonClick={() => {
            if (getImporterForPath(ROUTES.PUBLIC.ABOUT.path)) {
              prefetch(getImporterForPath(ROUTES.PUBLIC.ABOUT.path)!);
            }
            navigate(ROUTES.PUBLIC.ABOUT.path);
          }}
          py={5}
        />

        <CTASection
          id="partners-section"
          overline={renderContent(
            partnersContent.overline,
            'partners.overline'
          )}
          title={renderContent(partnersContent.title, 'partners.title')}
          subtitle={renderContent(
            partnersContent.subtitle,
            'partners.subtitle'
          )}
          buttonText={partnersContent.buttonText}
          onButtonClick={() => {
            if (getImporterForPath(ROUTES.PUBLIC.PARTNERDETAILS.path)) {
              prefetch(getImporterForPath(ROUTES.PUBLIC.PARTNERDETAILS.path)!);
            }
            navigate(ROUTES.PUBLIC.PARTNERDETAILS.path);
          }}
        >
          <PartnerCarousel
            logos={partnerLogos}
            speed={15}
            maxLogoHeight={layout.logo.maxHeight.carousel}
            padding="0 5px"
            logoSize={layout.logo.partnerSize}
          />
        </CTASection>

        <CTASection
          id="team-section"
          overline={renderContent(teamContent.overline, 'team.overline')}
          title={renderContent(teamContent.title, 'team.title')}
          subtitle={renderContent(teamContent.subtitle, 'team.subtitle')}
          buttonText={teamContent.buttonText}
          onButtonClick={() => {
            if (getImporterForPath(ROUTES.PUBLIC.TEAMDETAILS.path)) {
              prefetch(getImporterForPath(ROUTES.PUBLIC.TEAMDETAILS.path)!);
            }
            navigate(ROUTES.PUBLIC.TEAMDETAILS.path);
          }}
        >
          <TeamSlider members={teamMembers} showBio={false} />
        </CTASection>
      </Box>
    </BaseLayout>
  );
};

export default Home;
