import { Box, keyframes, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { commonColors } from '../../theme/colors';

interface LogoAnimationProps {
  onAnimationComplete: () => void;
  duration?: number;
  isContentLoaded: boolean;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({
  onAnimationComplete,
  duration = 2500,
  isContentLoaded,
}) => {
  const theme = useTheme();
  const [show, setShow] = useState(true);
  const [showText, setShowText] = useState(false);
  const { getContent } = useLocalizedContent('common', 'ui.logoAnimation');

  // Animation keyframes
  const fadeIn = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  `;

  const fadeOut = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `;

  const bounce = keyframes`
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  `;

  const progressAnim = keyframes`
    0% {
      left: -30%;
    }
    100% {
      left: 100%;
    }
  `;

  // Show the text after a delay
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500); // Show text sooner for better feedback

    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    // Always start animation timer, but make it shorter if content is already loaded
    const timer = setTimeout(
      () => {
        setShow(false);
        onAnimationComplete();
      },
      isContentLoaded ? Math.min(duration, 1500) : duration
    );

    return () => clearTimeout(timer);
  }, [duration, onAnimationComplete, isContentLoaded]);

  // Create proper background color based on theme
  const backgroundColor =
    theme.palette.mode === 'dark'
      ? theme.palette.primary.dark // Darker blue for dark mode
      : theme.palette.primary.main; // Regular blue for light mode

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor, // Use the theme-appropriate background color
        zIndex: 9999,
        opacity: 1,
        animation: show ? 'none' : `${fadeOut} 0.4s ease-out forwards`,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          px: { xs: 2, sm: 0 }, // Add horizontal padding on small screens
        }}
      >
        {/* Logo Container */}
        <Box
          sx={{
            width: { xs: '140px', sm: '180px' }, // Smaller on mobile
            height: { xs: '140px', sm: '180px' }, // Smaller on mobile
            position: 'relative',
            animation: `${bounce} 2s ease-in-out infinite`,
            mb: { xs: 3, sm: 4 }, // Adjusted bottom margin
          }}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              filter: 'brightness(0) invert(1)', // Always make logo white
            }}
          />
        </Box>

        {/* Simplified container with exact positioning */}
        <Box
          sx={{
            position: 'relative',
            height: 'auto', // Changed from fixed height to auto
            minHeight: '60px', // Min height to ensure space for the component
            width: '100%',
            maxWidth: { xs: '95%', sm: '100%' }, // Add a max width for small screens
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto', // Center the box
            mb: { xs: 2, sm: 0 }, // Add bottom margin on small screens
          }}
        >
          {/* Text element - now white for better contrast */}
          <Typography
            variant="h4"
            component="div"
            align="center"
            sx={{
              color: commonColors.white,
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: { xs: 'normal', sm: 'nowrap' }, // Allow wrapping on small screens
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, // Responsive font size
              opacity: showText ? 1 : 0,
              visibility: showText ? 'visible' : 'hidden',
              animation: showText ? `${fadeIn} 0.8s ease-out forwards` : 'none',
              transition: 'opacity 0.5s ease-out',
              width: '100%',
              textAlign: 'center',
              px: 2, // Add horizontal padding
            }}
          >
            {getContent<string>('tagline')}
          </Typography>

          {/* Loading Indicator - white for better contrast */}
          <Box
            sx={{
              position: 'absolute',
              opacity: showText ? 0 : 1,
              visibility: showText ? 'hidden' : 'visible',
              transition: 'opacity 0.5s ease-out',
              width: { xs: '80%', sm: '240px' }, // Responsive width
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly more visible base
              borderRadius: '2px',
              overflow: 'hidden',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: commonColors.white,
                width: '30%',
                borderRadius: '2px',
                animation: `${progressAnim} 1s infinite linear`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LogoAnimation;
