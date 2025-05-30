import { GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';

import { CONTACT_EMAIL } from '../../config/emails';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import ROUTES from '../../routes';
import { getImporterForPath } from '../../routes/importRegistry';
import { spacing } from '../../theme/themeUtils';
import PrefetchLink from '../PrefetchLink';
import MissingTranslation from '../translation/MissingTranslation';

interface FooterNavItem {
  label: string;
  path: string;
}

const defaultFooterNavItems: FooterNavItem[] = [
  { label: 'home', path: ROUTES.PUBLIC.HOME.path },
  { label: 'projects', path: ROUTES.PROJECTS.LIST.path },
  { label: 'blog', path: ROUTES.BLOG.LIST.path },
  { label: 'services', path: ROUTES.PUBLIC.SERVICES.path },
  { label: 'contact', path: ROUTES.PUBLIC.CONTACT.path },
];

interface FooterProps {
  navItems?: FooterNavItem[];
  organizationName?: string;
}

const Footer: React.FC<FooterProps> = ({
  navItems = defaultFooterNavItems,
  organizationName,
}) => {
  const currentYear = new Date().getFullYear();
  const { getContent: getCommonContent } = useLocalizedContent('common');
  const { getContent: getNavContent } = useLocalizedContent('navigation');

  const translations = {
    tagline: getCommonContent<string>('footer.tagline'),
    navigation: getCommonContent<string>('footer.navigation'),
    contact: getCommonContent<string>('footer.contact'),
    rights: getCommonContent<string>('footer.rights'),
    privacy: getCommonContent<string>('footer.links.privacy'),
    terms: getCommonContent<string>('footer.links.terms'),
    contactInfo: {
      email: getCommonContent<string>('footer.contactInfo.email'),
      address: getCommonContent<string>('footer.contactInfo.address'),
    },
    social: {
      instagram: getCommonContent<string>('social.instagram'),
      linkedin: getCommonContent<string>('social.linkedin'),
      twitter: getCommonContent<string>('social.twitter'),
      github: getCommonContent<string>('social.github'),
      links: {
        instagram: getCommonContent<string>('social.links.instagram'),
        linkedin: getCommonContent<string>('social.links.linkedin'),
        twitter: getCommonContent<string>('social.links.twitter'),
        github: getCommonContent<string>('social.links.github'),
      },
    },
    menu: Object.fromEntries(
      navItems.map((item) => [
        item.label,
        getNavContent<string>(`menu.${item.label}`),
      ])
    ),
    organization: {
      name: getCommonContent<string>('organization.name'),
      logoText: getCommonContent<string>('organization.logoText'),
    },
  };

  const displayOrganizationName =
    organizationName || translations.organization.name;

  const renderContent = (
    content: string | null,
    key: string
  ): React.ReactNode => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: spacing.xl,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={spacing.lg} justifyContent="space-between">
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {renderContent(
                translations.organization.logoText,
                'organization.logoText'
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {renderContent(translations.tagline, 'footer.tagline')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {renderContent(translations.navigation, 'footer.navigation')}
            </Typography>
            <Box>
              {navItems.map((item) => (
                <PrefetchLink
                  key={item.label}
                  to={item.path}
                  prefetchImporter={getImporterForPath(item.path)}
                  prefetchOnViewport={true}
                  color="inherit"
                  sx={{
                    display: 'block',
                    mb: 1,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {renderContent(
                    translations.menu[item.label],
                    `navigation.menu.${item.label}`
                  )}
                </PrefetchLink>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {renderContent(translations.contact, 'footer.contact')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: {CONTACT_EMAIL || translations.contactInfo.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {translations.contactInfo.address}
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton
                component="a"
                href={translations.social.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translations.social.instagram}
                sx={{ color: 'text.secondary' }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                component="a"
                href={translations.social.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translations.social.linkedin}
                sx={{ color: 'text.secondary' }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component="a"
                href={translations.social.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translations.social.twitter}
                sx={{ color: 'text.secondary' }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href={translations.social.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={translations.social.github}
                sx={{ color: 'text.secondary' }}
              >
                <GitHub />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: spacing.lg }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {displayOrganizationName}.{' '}
            {renderContent(translations.rights, 'footer.rights')}
          </Typography>
          <Box>
            <PrefetchLink
              to="#"
              color="inherit"
              sx={{
                mx: spacing.xs,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {renderContent(translations.privacy, 'footer.links.privacy')}
            </PrefetchLink>
            <PrefetchLink
              to="#"
              color="inherit"
              sx={{
                mx: spacing.xs,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {renderContent(translations.terms, 'footer.links.terms')}
            </PrefetchLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
