import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { useThemeContext } from '../../hooks/useThemeContext';
import ROUTES from '../../routes';
import { getImporterForPath } from '../../routes/importRegistry';
import { commonColors, slateColors } from '../../theme/colors';
import {
  borderRadius,
  layout,
  overlayColors,
  transitions,
} from '../../theme/themeUtils';
import {
  createScrollDirectionTracker,
  throttle,
} from '../../utils/animationUtils';
import { isHeroPage } from '../../utils/navigationUtils';
import PrefetchLink from '../PrefetchLink';
import MissingTranslation from '../translation/MissingTranslation';
import LanguageSwitcher from './LanguageSwitcher';

interface NavItem {
  label: string;
  path: string;
}

interface NavbarProps {
  transparent?: boolean;
  logoSrc?: string;
  logoText?: string;
  navItems?: NavItem[];
}

function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const scrollTracker = useRef(createScrollDirectionTracker());
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setVisible(true);
        lastScrollTop.current = currentScrollY;
        return;
      }

      const scrollingDown = currentScrollY > lastScrollTop.current;

      if (Math.abs(currentScrollY - lastScrollTop.current) > 10) {
        setVisible(!scrollingDown);
        lastScrollTop.current = currentScrollY;
      }
    }, 100);

    if (window.scrollY === 0) {
      setVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const resetVisibility = () => {
    scrollTracker.current.reset();
    lastScrollTop.current = 0;
    setVisible(true);
  };

  return { visible, resetVisibility };
}

function SmoothSlide(props: { children: React.ReactElement; in: boolean }) {
  const { children, in: show } = props;

  return (
    <Slide appear={false} direction="down" in={show} timeout={300}>
      {children}
    </Slide>
  );
}

const defaultNavItems: NavItem[] = [
  { label: 'home', path: ROUTES.PUBLIC.HOME.path },
  { label: 'projects', path: ROUTES.PROJECTS.LIST.path },
  { label: 'blog', path: ROUTES.BLOG.LIST.path },
  { label: 'services', path: ROUTES.PUBLIC.SERVICES.path },
  { label: 'contact', path: ROUTES.PUBLIC.CONTACT.path },
];

const Navbar: React.FC<NavbarProps> = ({
  transparent = false,
  logoSrc = '/logo.svg',
  logoText,
  navItems = defaultNavItems,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { themeMode, toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const [scrolled, setScrolled] = useState(true);
  const [beyondHero, setBeyondHero] = useState(false);
  const { getContent } = useLocalizedContent('navigation');
  const { getContent: getCommonContent } = useLocalizedContent('common');
  const location = useLocation();
  const { visible, resetVisibility } = useScrollDirection();

  const translations = {
    toggleTheme: getContent<string>('common.toggleTheme'),
    mobileMenu: getContent<string>('common.mobileMenu'),
    menu: Object.fromEntries(
      navItems.map((item) => [
        item.label,
        getContent<string>(`menu.${item.label}`),
      ])
    ),
    organization: {
      logoText: getCommonContent<string>('organization.logoText'),
    },
  };

  const displayLogoText = logoText || translations.organization.logoText;

  useEffect(() => {
    resetVisibility();
  }, [location.pathname, resetVisibility]);

  const isCurrentPageHero = React.useMemo(() => {
    return isHeroPage(location.pathname);
  }, [location.pathname]);

  const [hasScrolled, setHasScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }

      setScrolled(window.scrollY > 10);

      const navbarHeight =
        document.querySelector('.MuiAppBar-root')?.clientHeight || 80;
      setBeyondHero(
        window.scrollY >
          (isCurrentPageHero ? window.innerHeight - navbarHeight : 0)
      );
    }, 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCurrentPageHero, hasScrolled]);

  useEffect(() => {
    const checkTopPosition = () => {
      if (window.scrollY === 0) {
        resetVisibility();
      }
    };

    checkTopPosition();
    window.addEventListener('scroll', checkTopPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkTopPosition);
    };
  }, [resetVisibility]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const renderTranslation = (content: string | null, key: string) => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  const translatedNavItems = React.useMemo(() => {
    return navItems.map((item) => ({
      ...item,
      translatedLabel: renderTranslation(
        translations.menu[item.label],
        `navigation.menu.${item.label}`
      ),
    }));
  }, [navItems, translations.menu]);

  const useWhiteContent = React.useMemo(() => {
    const isOverHeroTop = isCurrentPageHero && !beyondHero && !scrolled;

    const hasPrimaryBackground = isCurrentPageHero && !beyondHero;

    return isOverHeroTop || hasPrimaryBackground;
  }, [isCurrentPageHero, beyondHero, scrolled]);

  const whiteColor = commonColors.white;
  const darkColor = slateColors[800];

  return (
    <>
      <SmoothSlide in={visible}>
        <AppBar
          position="fixed"
          color={useWhiteContent ? 'transparent' : 'inherit'}
          elevation={0}
          sx={{
            backgroundColor: (theme) => {
              if (isCurrentPageHero && !beyondHero) {
                return transparent && !scrolled && !hasScrolled
                  ? 'transparent'
                  : theme.palette.primary.main;
              }
              return themeMode === 'dark'
                ? overlayColors.dark.medium
                : overlayColors.light.medium;
            },
            backdropFilter: 'blur(8px)',
            transition:
              'background-color 0.2s ease-out, backdrop-filter 0.2s ease-out',
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'nowrap',
                minHeight: {
                  xs: `${layout.navbarHeight.xs}px`,
                  sm: `${layout.navbarHeight.sm}px`,
                },
                p: 0,
                pl: 2,
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Box
                component={PrefetchLink}
                to={ROUTES.PUBLIC.HOME.path}
                prefetchImporter={getImporterForPath(ROUTES.PUBLIC.HOME.path)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: 0.9,
                  },
                }}
              >
                <img
                  height={40}
                  alt="Logo"
                  src={logoSrc}
                  style={{
                    filter: useWhiteContent
                      ? 'brightness(0) invert(1)'
                      : themeMode === 'dark'
                        ? 'brightness(0) invert(1)'
                        : 'brightness(0)',
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: useWhiteContent
                      ? whiteColor
                      : themeMode === 'dark'
                        ? whiteColor
                        : darkColor,
                  }}
                >
                  {displayLogoText}
                </Typography>
              </Box>

              {isMobile ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LanguageSwitcher
                    sx={{
                      mr: 1,
                      color: useWhiteContent
                        ? whiteColor
                        : themeMode === 'dark'
                          ? whiteColor
                          : darkColor,
                    }}
                  />

                  <IconButton
                    color="inherit"
                    onClick={toggleTheme}
                    aria-label={translations.toggleTheme}
                    sx={{
                      mr: 1,
                      color: useWhiteContent
                        ? whiteColor
                        : themeMode === 'dark'
                          ? whiteColor
                          : darkColor,
                    }}
                  >
                    {themeMode === 'dark' ? (
                      <LightModeIcon />
                    ) : (
                      <DarkModeIcon />
                    )}
                  </IconButton>

                  <IconButton
                    color="inherit"
                    onClick={handleDrawerToggle}
                    aria-label={translations.mobileMenu}
                    sx={{
                      color: useWhiteContent
                        ? whiteColor
                        : themeMode === 'dark'
                          ? whiteColor
                          : darkColor,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  component="nav"
                  sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  {translatedNavItems.map((item) => (
                    <Button
                      key={item.label}
                      component={PrefetchLink}
                      to={item.path}
                      prefetchImporter={getImporterForPath(item.path)}
                      sx={{
                        color: useWhiteContent
                          ? whiteColor
                          : themeMode === 'dark'
                            ? whiteColor
                            : darkColor,
                        mx: 0.75,
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        fontWeight: 500,
                        height: '100%',
                        borderRadius: borderRadius.none,
                        boxShadow: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          boxShadow: 'none',
                          transform: 'none',
                        },
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          width: location.pathname === item.path ? '70%' : 0,
                          height: `${layout.dividerHeight}px`,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          margin: '0 auto',
                          backgroundColor: useWhiteContent
                            ? whiteColor
                            : themeMode === 'dark'
                              ? whiteColor
                              : (theme: Theme) => theme.palette.primary.main,
                          transition: transitions.medium,
                        },
                        '&:hover:after': {
                          width: '70%',
                        },
                      }}
                    >
                      {item.translatedLabel}
                    </Button>
                  ))}

                  <LanguageSwitcher
                    sx={{
                      ml: 1,
                      color: useWhiteContent
                        ? whiteColor
                        : themeMode === 'dark'
                          ? whiteColor
                          : darkColor,
                    }}
                  />

                  <IconButton
                    color="inherit"
                    onClick={toggleTheme}
                    aria-label={translations.toggleTheme}
                    sx={{
                      ml: 1,
                      color: useWhiteContent
                        ? whiteColor
                        : themeMode === 'dark'
                          ? whiteColor
                          : darkColor,
                    }}
                  >
                    {themeMode === 'dark' ? (
                      <LightModeIcon />
                    ) : (
                      <DarkModeIcon />
                    )}
                  </IconButton>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </SmoothSlide>

      {(!isCurrentPageHero || !transparent) && (
        <Toolbar
          sx={{
            minHeight: {
              xs: `${layout.navbarHeight.xs}px`,
              sm: `${layout.navbarHeight.sm}px`,
            },
          }}
        />
      )}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {displayLogoText}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <LanguageSwitcher />
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label="toggle theme"
              >
                {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Box>
          <List>
            {translatedNavItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={PrefetchLink}
                  to={item.path}
                  prefetchImporter={getImporterForPath(item.path)}
                  sx={{
                    textAlign: 'center',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: (theme) =>
                        `${theme.palette.primary.light}14`,
                    },
                  }}
                >
                  <ListItemText primary={item.translatedLabel} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
