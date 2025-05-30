import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import ScrollToTop from '../components/ui/ScrollToTop';
import { isHeroPage, shouldScrollToTop } from '../utils/navigationUtils';

interface BaseLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  transparentNavbar?: boolean;
  showFooter?: boolean;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  showNavbar = true,
  transparentNavbar = false,
  showFooter = true,
}) => {
  const location = useLocation();

  const hasHeroSection = isHeroPage(location.pathname);

  useEffect(() => {
    if (shouldScrollToTop(location.pathname)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {showNavbar && !hasHeroSection && (
        <Navbar transparent={transparentNavbar} />
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {showFooter && <Footer />}
      <ScrollToTop />
    </Box>
  );
};

export default BaseLayout;
