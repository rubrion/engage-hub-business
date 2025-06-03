import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import PartnerCarousel from '../components/ui/PartnerCarousel';
import { useEventSponsors } from '../data/eventSponsorsData';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import {
  borderRadius,
  buttonSizes,
  getThemeBackgroundVariations,
  layout,
  shadows,
  spacing,
  transitions,
} from '../theme/themeUtils';

/**
 * Seasonal Landing Page Component
 * Shown during configured date periods or when feature flag is enabled
 */
const LandingSeasonal: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { getContent } = useLocalizedContent('screens', 'landingSeasonal');

  const backgroundVariations = getThemeBackgroundVariations(theme);
  const { background, overlay } = backgroundVariations.soft;
  const eventSponsors = useEventSponsors();
  const overline = getContent<string>('overline');
  const title = getContent<string>('title');
  const subtitle = getContent<string>('subtitle');
  const buttonText = getContent<string>('buttonText');
  const subscribeButtonText = getContent<string>('subscribeButtonText');
  const location = getContent<string>('location');
  const date = getContent<string>('date');
  const subscriptionEndAlert = getContent<string>('subscriptionEndAlert');
  const features = getContent<string[]>('features') || [];
  const cta = getContent<string>('cta');
  const sponsorsTitle = getContent<string>('sponsors.title');
  const sponsorsSubtitle = getContent<string>('sponsors.subtitle');

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  const handleEnterSite = () => {
    navigate('/');
  };

  const handleSubscribe = () => {
    const subscriptionUrl = `${import.meta.env.VITE_LANDING_CAMPAIGN_BASE_URL}`;
    window.open(subscriptionUrl, '_blank');
  };

  return (
    <Box
      role="banner"
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: background,
        backgroundImage: 'url("/home/start-hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlay,
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          py: spacing.md,
        }}
      >
        <Box sx={{ mb: spacing.sm }}>
          <Typography
            variant="overline"
            component="p"
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.text.primary
                  : theme.palette.primary.contrastText,
              mb: '4px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
            }}
          >
            {overline}
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: theme.palette.common.white,
              fontWeight: 700,
              mb: spacing.xs,
              fontSize: { xs: '2rem', md: '2.8rem' },
              lineHeight: 1.1,
            }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: spacing.xs }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon
                sx={{
                  color: theme.palette.common.white,
                  mr: 1,
                  fontSize: '1.2rem',
                }}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{ color: theme.palette.common.white, fontSize: '1rem' }}
              >
                {date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon
                sx={{
                  color: theme.palette.common.white,
                  mr: 1,
                  fontSize: '1.2rem',
                }}
              />
              <Typography
                variant="body1"
                component="span"
                sx={{ color: theme.palette.common.white, fontSize: '1rem' }}
              >
                {location}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="body1"
            component="p"
            sx={{
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.text.secondary
                  : theme.palette.primary.contrastText,
              mb: spacing.sm,
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1rem',
            }}
          >
            {subtitle}
          </Typography>
        </Box>{' '}
        {subscriptionEndAlert && (
          <Alert
            severity="warning"
            sx={{
              mb: spacing.sm,
              backgroundColor: 'rgba(255, 152, 0, 0.1)',
              color: theme.palette.common.white,
              border: '1px solid rgba(255, 152, 0, 0.3)',
              '& .MuiAlert-icon': {
                color: '#ff9800',
              },
              py: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            >
              {subscriptionEndAlert}
            </Typography>
          </Alert>
        )}
        <Grid container spacing={1.5} sx={{ mb: spacing.sm }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: theme.palette.common.white,
                  borderRadius: borderRadius.md,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, fontSize: '0.9rem' }}
                >
                  {feature}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.common.white,
            fontWeight: 500,
            mb: spacing.sm,
            fontSize: '1rem',
          }}
        >
          {cta}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: spacing.sm, sm: spacing.md },
            mb: spacing.sm,
          }}
        >
          <Button
            ref={buttonRef}
            variant="contained"
            size="large"
            onClick={handleEnterSite}
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.common.white,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.primary.dark,
              px: spacing.lg,
              py: buttonSizes.large.padding,
              fontSize: buttonSizes.large.fontSize,
              flex: { xs: '1 1 100%', sm: '0 0 auto' },
              minWidth: { sm: '180px' },
              boxShadow: shadows.button,
              borderRadius: borderRadius.md,
              transition: transitions.medium,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.grey[50],
                boxShadow: shadows.button,
              },
            }}
          >
            {buttonText}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleSubscribe}
            sx={{
              borderColor: theme.palette.common.white,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.common.white,
              px: spacing.lg,
              py: buttonSizes.large.padding,
              fontSize: buttonSizes.medium.fontSize,
              flex: { xs: '1 1 100%', sm: '0 0 auto' },
              minWidth: { sm: '180px' },
              borderRadius: borderRadius.md,
              transition: transitions.medium,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.light
                    : theme.palette.common.white,
              },
            }}
          >
            {subscribeButtonText}
          </Button>
        </Box>
        {sponsorsTitle && (
          <Box sx={{ mt: spacing.sm }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: theme.palette.common.white,
                fontWeight: 600,
                mb: '4px',
                textAlign: 'center',
                fontSize: '1.1rem',
              }}
            >
              {sponsorsTitle}
            </Typography>

            {sponsorsSubtitle && (
              <Typography
                variant="body2"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.text.secondary
                      : theme.palette.primary.contrastText,
                  mb: spacing.xs,
                  textAlign: 'center',
                  maxWidth: '500px',
                  mx: 'auto',
                  fontSize: '0.85rem',
                }}
              >
                {sponsorsSubtitle}
              </Typography>
            )}

            <PartnerCarousel
              logos={eventSponsors}
              speed={15}
              maxLogoHeight={layout.logo.maxHeight.carousel}
              logoSize={layout.logo.partnerSize}
              align="center"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LandingSeasonal;
