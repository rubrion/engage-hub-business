import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { primaryColors, slateColors } from '../../theme/colors';
import {
  borderRadius,
  buttonSizes,
  shadows,
  spacing,
  transitions,
} from '../../theme/themeUtils';
import PartnerCarousel from './PartnerCarousel';

/**
 * Seasonal Banner Component
 * A compact banner version of the seasonal landing page
 * that appears on the home page during configured periods
 */
const SeasonalBanner: React.FC = () => {
  const theme = useTheme();
  const { getContent } = useLocalizedContent('screens', 'landingSeasonal');
  const [isVisible, setIsVisible] = useState(true);

  const overline = getContent<string>('overline');
  const title = getContent<string>('title');
  const subscribeButtonText = getContent<string>('subscribeButtonText');
  const location = getContent<string>('location');
  const date = getContent<string>('date');
  const subscriptionEndAlert = getContent<string>('subscriptionEndAlert');
  const sponsorsTitle = getContent<string>('sponsors.title');

  // Event sponsor logos
  const eventSponsors = [
    {
      src: '/event-sponsors/techcorp-logo.svg',
      alt: 'TechCorp',
      width: '120px',
      height: 'auto',
    },
    {
      src: '/event-sponsors/innovatelab-logo.svg',
      alt: 'InnovateLab',
      width: '120px',
      height: 'auto',
    },
    {
      src: '/event-sponsors/devhub-logo.svg',
      alt: 'DevHub',
      width: '120px',
      height: 'auto',
    },
    {
      src: '/event-sponsors/cloudtech-logo.svg',
      alt: 'CloudTech',
      width: '120px',
      height: 'auto',
    },
    {
      src: '/event-sponsors/datasystems-logo.svg',
      alt: 'DataSystems',
      width: '120px',
      height: 'auto',
    },
    {
      src: '/event-sponsors/nextgen-logo.svg',
      alt: 'NextGen',
      width: '120px',
      height: 'auto',
    },
  ];

  const handleSubscribe = () => {
    const subscriptionUrl = `${import.meta.env.VITE_LANDING_CAMPAIGN_BASE_URL}`;
    window.open(subscriptionUrl, '_blank');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const textColor = theme.palette.mode === 'dark' ? slateColors[50] : '#ffffff';
  const secondaryTextColor =
    theme.palette.mode === 'dark' ? slateColors[300] : slateColors[100];
  const buttonBgColor =
    theme.palette.mode === 'dark' ? primaryColors.blue.main : '#ffffff';
  const buttonTextColor =
    theme.palette.mode === 'dark' ? '#ffffff' : primaryColors.blue.dark;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'spring',
            stiffness: 260,
            damping: 25,
          }}
          style={{ position: 'relative' }}
        >
          {/* Close button - positioned outside banner at top-right corner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              position: 'absolute',
              top: -16,
              right: -8,
              zIndex: 20,
            }}
          >
            <IconButton
              onClick={handleDismiss}
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? slateColors[300]
                    : slateColors[600],
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border:
                  theme.palette.mode === 'dark'
                    ? `1px solid rgba(255, 255, 255, 0.2)`
                    : `1px solid rgba(0, 0, 0, 0.1)`,
                width: 32,
                height: 32,
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'rgba(255, 255, 255, 1)',
                  color:
                    theme.palette.mode === 'dark'
                      ? slateColors[100]
                      : slateColors[700],
                  transform: 'scale(1.1)',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 6px 16px rgba(0, 0, 0, 0.4)'
                      : '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              size="small"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </motion.div>

          <Paper
            elevation={0}
            sx={{
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? slateColors[800]
                  : primaryColors.blue.main,
              backgroundImage:
                'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
              borderRadius: borderRadius.lg,
              overflow: 'hidden',
              position: 'relative',
              border:
                theme.palette.mode === 'dark'
                  ? `1px solid ${slateColors[700]}`
                  : 'none',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `url("/home/start-hero.png")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center',
                opacity: 0.08,
                zIndex: 1,
              },
            }}
          >
            <Container
              maxWidth="lg"
              sx={{
                position: 'relative',
                zIndex: 2,
                py: { xs: spacing.sm, md: spacing.md },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'center' },
                  justifyContent: 'space-between',
                  gap: spacing.sm,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                {/* Content Section */}
                <Box sx={{ flex: 1, maxWidth: { md: '70%' } }}>
                  <Typography
                    variant="overline"
                    component="p"
                    sx={{
                      color: secondaryTextColor,
                      mb: '4px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {overline}
                  </Typography>

                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      color: textColor,
                      fontWeight: 700,
                      mb: spacing.xs,
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </Typography>

                  {/* Event details */}
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    sx={{ mb: 0 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon
                        sx={{
                          color: secondaryTextColor,
                          mr: 1,
                          fontSize: '1.1rem',
                        }}
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ color: secondaryTextColor, fontWeight: 500 }}
                      >
                        {date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon
                        sx={{
                          color: secondaryTextColor,
                          mr: 1,
                          fontSize: '1.1rem',
                        }}
                      />
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{ color: secondaryTextColor, fontWeight: 500 }}
                      >
                        {location}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* CTA Section */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: { md: '220px' },
                    height: { md: 'auto' },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubscribe}
                    sx={{
                      backgroundColor: buttonBgColor,
                      color: buttonTextColor,
                      px: spacing.xl,
                      py: buttonSizes.large.padding,
                      fontSize: buttonSizes.medium.fontSize,
                      fontWeight: 600,
                      boxShadow: shadows.button,
                      borderRadius: borderRadius.md,
                      transition: transitions.medium,
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        backgroundColor:
                          theme.palette.mode === 'dark'
                            ? primaryColors.blue.light
                            : slateColors[50],
                        transform: 'translateY(-2px)',
                        boxShadow: shadows.cardHover,
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    {subscribeButtonText}
                  </Button>
                </Box>
              </Box>

              {/* Subscription End Date Alert - Full width below main content */}
              {subscriptionEndAlert && (
                <Alert
                  severity="warning"
                  sx={{
                    mt: spacing.sm,
                    mb: spacing.xs,
                    backgroundColor: 'rgba(255, 152, 0, 0.15)',
                    color: textColor,
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                    borderRadius: borderRadius.sm,
                    '& .MuiAlert-icon': {
                      color: '#ff9800',
                    },
                    fontSize: '0.85rem',
                    py: 0.5,
                  }}
                  icon={false}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: '0.85rem' }}
                  >
                    {subscriptionEndAlert}
                  </Typography>
                </Alert>
              )}

              {/* Mini Sponsors Section - Bottom placement */}
              {sponsorsTitle && eventSponsors.length > 0 && (
                <Box sx={{ mt: spacing.xs, mx: -spacing.md }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: secondaryTextColor,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      mb: '4px',
                      display: 'block',
                      textAlign: 'left',
                      ml: spacing.md,
                    }}
                  >
                    {sponsorsTitle}
                  </Typography>
                  <PartnerCarousel
                    logos={eventSponsors}
                    speed={12}
                    maxLogoHeight={48}
                    logoSize={120}
                    align="center"
                    padding="0"
                  />
                </Box>
              )}
            </Container>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SeasonalBanner;
