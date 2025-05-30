import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { commonColors } from '../../../theme/colors';
import Navbar from '../Navbar';

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string | ReactNode;
  overline?: string | ReactNode;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary';
  imageSrc?: string;
  buttons?: { text: string; onClick?: () => void }[];
  socialIcons?: { icon: React.ReactNode; href: string; label: string }[];
  showNavbar?: boolean;
}

const ArrowDown = styled(motion.div)<{ show: boolean }>(({ theme, show }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  cursor: 'pointer',
  opacity: show ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
  visibility: show ? 'visible' : 'hidden',
  zIndex: 10,
  '&::before': {
    content: '""',
    display: 'block',
    width: 24,
    height: 24,
    borderLeft: `4px solid ${theme.palette.common.white}`,
    borderBottom: `4px solid ${theme.palette.common.white}`,
    transform: 'rotate(-45deg)',
    marginBottom: theme.spacing(1),
  },
}));

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  overline,
  buttonVariant = 'secondary',
  imageSrc,
  buttons = [],
  socialIcons = [],
  showNavbar = true,
}) => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);

  const handleScroll = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      window.scrollTo({
        top: nextSection.getBoundingClientRect().top + window.pageYOffset,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleWindowScroll = () => {
    setShowArrow(window.scrollY === 0);
  };

  useEffect(() => {
    setShowArrow(window.scrollY === 0);

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <>
      <Box
        ref={heroRef}
        sx={{
          backgroundImage:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
              : 'none',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pt: showNavbar ? { xs: 0, md: 0 } : 0,
        }}
      >
        {showNavbar && <Navbar transparent={true} />}

        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            pt: showNavbar ? { xs: 4, md: 6 } : 0,
            pb: { xs: 4, md: 6 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
            sx={{ minHeight: { md: '60vh' } }}
          >
            <Grid
              size={imageSrc ? { xs: 12, md: 6 } : { xs: 12, md: 10, lg: 8 }}
              sx={{
                order: { xs: 1, md: 1 }, // Text comes first on both mobile and desktop
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                px: { xs: 2, md: 0 }, // Add horizontal padding on mobile for better text spacing
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {typeof overline === 'string' ? (
                  <Typography
                    variant="overline"
                    sx={{
                      letterSpacing: '0.15em',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {overline}
                  </Typography>
                ) : (
                  overline
                )}

                {typeof title === 'string' ? (
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      mt: 2,
                      mb: 2,
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      maxWidth: '100%',
                      textAlign: 'left',
                    }}
                  >
                    {title}
                  </Typography>
                ) : (
                  title
                )}

                {typeof subtitle === 'string' ? (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontSize: '1.125rem',
                      lineHeight: 1.7,
                      maxWidth: '100%',
                      textAlign: 'left',
                    }}
                  >
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                )}

                {buttons.length > 0 && (
                  <Box
                    sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}
                  >
                    {buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant={index === 0 ? 'contained' : 'outlined'}
                        color={buttonVariant}
                        onClick={button.onClick}
                        sx={{
                          bgcolor:
                            index === 0
                              ? theme.palette.secondary.main
                              : 'transparent',
                          color: theme.palette.secondary.contrastText,
                          borderColor: theme.palette.common.white,
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            bgcolor:
                              index === 0
                                ? theme.palette.secondary.dark
                                : 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </Box>
                )}

                {socialIcons.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      mt: buttons.length > 0 ? 2 : 4,
                      opacity: 0.9,
                    }}
                  >
                    {socialIcons.map((social, index) => (
                      <IconButton
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        size="medium"
                        sx={{
                          mr: 2,
                          color: commonColors.white,
                          '&:hover': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            transform: 'translateY(-3px)',
                          },
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                )}
              </motion.div>
            </Grid>

            {imageSrc && (
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' }, // Center on mobile, right-aligned on desktop
                  alignItems: 'center',
                  order: { xs: 2, md: 2 }, // Image comes below text on mobile, to the right on desktop
                  mt: { xs: 4, md: 0 }, // Add top margin on mobile to separate from text
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 5,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        maxWidth: '100%',
                        width: '100%',
                        height: 'auto',
                        maxHeight: { xs: 250, md: 400 }, // Smaller on mobile to save space for text
                        objectFit: 'contain',
                        marginLeft: { xs: 0, md: 'auto' }, // No margin on mobile, push to right on desktop
                      }}
                      src={imageSrc}
                      alt="Hero image"
                    />
                  </motion.div>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>

        {showArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <ArrowDown
              show={showArrow}
              onClick={handleScroll}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </motion.div>
        )}
      </Box>
    </>
  );
};

export default HeroSection;
