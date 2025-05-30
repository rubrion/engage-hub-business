import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { TeamMemberType } from '../../data/teamData';
import { useContentById } from '../../hooks/useContent';
import { useLocalizedContent } from '../../hooks/useLocalizedContent';
import { layout, spacing } from '../../theme/themeUtils';
import { CommonContent, ContentResource } from '../../types/content';
import MissingTranslation from '../translation/MissingTranslation';
import { Breadcrumbs, LoadingIndicator } from '../ui';
import EntityCard from '../ui/Card/EntityCard';
import PlaceholderImage from '../ui/PlaceholderImage';
import { BreadcrumbItem } from './ContentListPage';

export interface CTAButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'contained' | 'outlined';
  color?: 'primary' | 'secondary' | 'inherit';
}

export interface MetaDisplay {
  title: string;
  values: Array<{ label: string; value: React.ReactNode }>;
}

export interface SidebarConfig {
  metaSections?: MetaDisplay[];
  links?: Array<{ label: string; url: string }>;
  newsletter?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    onClick?: () => void;
  };
}

interface ContentDetailPageProps {
  resource: ContentResource;
  i18nBase: string;
  id: string;
  breadcrumbs?: BreadcrumbItem[];
  linkToList: string;
  sidebar?: SidebarConfig;

  cta?: {
    overline?: string;
    title: string;
    description?: string;
    buttons?: CTAButtonConfig[];
  };

  translationNamespace?: string;

  afterContent?: React.ReactNode;

  participants?: TeamMemberType[];

  categoryIconMap?: Record<string, typeof SvgIcon>;
}

/**
 * Generic content detail page that works with any content type
 */
function ContentDetailPage({
  resource,
  id,
  breadcrumbs,
  linkToList,
  sidebar,
  translationNamespace,
  afterContent,
  participants,
  categoryIconMap,
}: ContentDetailPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const namespace = translationNamespace || resource;

  const { getContent } = useLocalizedContent('screens', namespace);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    document: item,
    isLoading,
    isError,
    langUsed,
  } = useContentById<CommonContent>(resource, id);

  // Image handling effect - placed to ensure proper order of hooks
  useEffect(() => {
    if (!item?.image) return;

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
    };
    img.src = item.image as string;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [item?.image]);

  const translations = useMemo(
    () => ({
      loading: getContent<string>('loading.title'),
      notFound: {
        title: getContent<string>('notFound.title'),
        message: getContent<string>('notFound.message'),
        button: getContent<string>('notFound.button'),
      },
      details: {
        author: getContent<string>('details.author'),
        date: getContent<string>('details.date'),
        category: getContent<string>('details.category'),
        readTime: getContent<string>('details.readTime'),
        publishedOn: getContent<string>('details.publishedOn'),
        share: getContent<string>('details.share'),
        email: getContent<string>('details.email'),
        participants: getContent<string>('details.participants'),
        references: getContent<string>('details.references'),
      },
      navigation: {
        back: getContent<string>('navigation.back'),
        next: getContent<string>('navigation.next'),
        previous: getContent<string>('navigation.previous'),
      },
    }),
    [getContent]
  );

  const renderContent = (
    content: string | null,
    key: string
  ): React.ReactNode => {
    return (
      content ?? <MissingTranslation translationKey={key} showTooltip={true} />
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ my: spacing.lg }}>
        <LoadingIndicator message={translations.loading} fullHeight />
      </Container>
    );
  }

  if (isError || !item) {
    return (
      <Container maxWidth="lg" sx={{ my: spacing.lg, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {renderContent(
            translations.notFound.title,
            `screens.${namespace}.notFound.title`
          )}
        </Typography>
        <Typography variant="body1" paragraph>
          {renderContent(
            translations.notFound.message,
            `screens.${namespace}.notFound.message`
          ) || 'The requested item could not be found.'}
        </Typography>
        <Button
          component={RouterLink}
          to={linkToList}
          variant="contained"
          color="primary"
          sx={{ mt: spacing.md }}
        >
          {renderContent(
            translations.navigation.back,
            `screens.${namespace}.navigation.back`
          )}
        </Button>
      </Container>
    );
  }

  const isProject = resource === 'projects';
  const isPost = resource === 'blog';

  const hasValidImagePath = Boolean(
    item?.image && item.image.trim().length > 0
  );
  const canUseImage = hasValidImagePath && !imageError && imageLoaded;

  return (
    <>
      {hasValidImagePath ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              position: 'relative',
              height: {
                xs: `${layout.imageHeight.xs}px`,
                md: `${layout.imageHeight.md}px`,
              },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Background image when loaded, hidden until loaded */}
            {hasValidImagePath && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: canUseImage ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 1, // Lower than content container
                }}
              />
            )}

            {/* Placeholder image - shown when main image is loading or on error */}
            {(!imageLoaded || imageError) && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1, // Same as background image
                }}
              >
                <PlaceholderImage
                  type={
                    resource === 'blog'
                      ? 'blog'
                      : resource === 'projects'
                        ? 'project'
                        : 'generic'
                  }
                  width="100%"
                  height="100%"
                  iconSize="large"
                  category={item.category}
                  categoryIconMap={categoryIconMap}
                />
              </Box>
            )}

            <Container
              maxWidth="lg"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                height: '100%',
                pb: { xs: 3, md: 4 },
                color: theme.palette.common.white,
                position: 'relative',
                zIndex: 3,
              }}
            >
              <Grid container spacing={2} alignItems="flex-end">
                <Grid size={{ xs: 12, md: 8 }}>
                  {item.category && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Typography
                        variant="overline"
                        component="span"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: theme.palette.common.white,
                          px: 2,
                          py: 0.5,
                          borderRadius: theme.shape.borderRadius,
                          mb: 1.5,
                          display: 'inline-block',
                        }}
                      >
                        {item.category}
                      </Typography>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        mb: 1.5,
                        color: theme.palette.common.white,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </motion.div>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                        mt: { xs: 1, md: 0 },
                      }}
                    >
                      {item.meta?.author && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              mr: 1,
                              bgcolor: 'primary.main',
                            }}
                          >
                            {typeof item.meta.author === 'string'
                              ? item.meta.author.charAt(0)
                              : 'A'}
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.common.white }}
                          >
                            {typeof item.meta.author === 'string'
                              ? item.meta.author
                              : 'Author'}
                          </Typography>
                        </Box>
                      )}

                      {item.date && (
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.common.white }}
                        >
                          {new Date(item.date).toLocaleDateString(langUsed, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Typography>
                      )}

                      {langUsed && (
                        <Chip
                          label={langUsed.toUpperCase()}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: 'rgba(255,255,255,0.6)',
                            color: theme.palette.common.white,
                          }}
                        />
                      )}
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              position: 'relative',
              height: {
                xs: `${layout.imageHeight.xs}px`,
                md: `${layout.imageHeight.md}px`,
              },
              overflow: 'hidden',
            }}
          >
            <PlaceholderImage
              type={
                resource === 'blog'
                  ? 'blog'
                  : resource === 'projects'
                    ? 'project'
                    : 'generic'
              }
              width="100%"
              height="100%"
              iconSize="large"
              category={item.category}
              categoryIconMap={categoryIconMap}
            />

            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                zIndex: 2, // Higher than placeholder, lower than content
              }}
            >
              <Container
                maxWidth="lg"
                sx={{
                  pb: { xs: 3, md: 4 },
                  color: theme.palette.common.white,
                  position: 'relative',
                  zIndex: 3, // Higher than the background overlay
                }}
              >
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid size={{ xs: 12, md: 8 }}>
                    {item.category && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Typography
                          variant="overline"
                          component="span"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: theme.palette.common.white,
                            px: 2,
                            py: 0.5,
                            borderRadius: theme.shape.borderRadius,
                            mb: 1.5,
                            display: 'inline-block',
                          }}
                        >
                          {item.category}
                        </Typography>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                          fontWeight: 'bold',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                          mb: 1.5,
                          color: theme.palette.common.white,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </motion.div>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: 2,
                          justifyContent: { xs: 'flex-start', md: 'flex-end' },
                          mt: { xs: 1, md: 0 },
                        }}
                      >
                        {item.meta?.author && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                mr: 1,
                                bgcolor: 'primary.main',
                              }}
                            >
                              {typeof item.meta.author === 'string'
                                ? item.meta.author.charAt(0)
                                : 'A'}
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.common.white }}
                            >
                              {typeof item.meta.author === 'string'
                                ? item.meta.author
                                : 'Author'}
                            </Typography>
                          </Box>
                        )}

                        {item.date && (
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.common.white }}
                          >
                            {new Date(item.date).toLocaleDateString(langUsed, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                        )}

                        {langUsed && (
                          <Chip
                            label={langUsed.toUpperCase()}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: 'rgba(255,255,255,0.6)',
                              color: theme.palette.common.white,
                            }}
                          />
                        )}
                      </Box>
                    </motion.div>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </motion.div>
      )}

      {breadcrumbs && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Box
            sx={{
              bgcolor: theme.palette.background.default,
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 1.5,
            }}
          >
            <Breadcrumbs items={breadcrumbs} />
          </Box>
        </motion.div>
      )}

      <Box sx={{ bgcolor: theme.palette.background.default, py: spacing.lg }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
            sx={{ width: '100%' }}
            direction={isMobile ? 'column-reverse' : 'row'}
          >
            <Grid size={{ xs: 12, md: sidebar ? 8 : 12 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3 },
                    boxShadow: theme.shadows[1],
                    borderRadius: theme.shape.borderRadius,
                    bgcolor: theme.palette.background.paper,
                  }}
                >
                  <Box
                    sx={{
                      typography: 'body1',
                      color: 'text.primary',
                      '& a': { color: 'primary.main' },
                      '& h1, & h2, & h3, & h4, & h5, & h6': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.body }} />
                  </Box>

                  <Divider sx={{ my: 2.5 }} />

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      {item.category && (
                        <Chip
                          label={item.category}
                          size="small"
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      )}
                    </Box>
                  </Box>

                  {isPost && item.meta?.email && (
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        {renderContent(
                          translations.details.email,
                          `screens.${namespace}.details.email`
                        )}
                        :
                      </Typography>
                      <Link href={`mailto:${item.meta.email}`} color="primary">
                        {item.meta.email}
                      </Link>
                    </Box>
                  )}
                </Paper>
              </motion.div>

              {isProject && participants && participants.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      {translations.details.participants}
                    </Typography>
                    <Grid container spacing={3} sx={{ width: '100%' }}>
                      {participants.map((member, index) => (
                        <Grid
                          size={{ xs: 6, sm: 6, md: 4 }}
                          key={`participant-${index}`}
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.9 + index * 0.1,
                            }}
                          >
                            <EntityCard
                              avatar={member.image || ''}
                              name={member.name}
                              subtitle={member.role}
                              description={member.bio}
                              links={{
                                linkedin: member.linkedin,
                                github: member.github,
                                website: member.website,
                              }}
                              variant="member"
                              size="compact"
                            />
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              )}

              {afterContent && <Box sx={{ mt: 4 }}>{afterContent}</Box>}
            </Grid>

            {sidebar && (
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Box sx={{ mb: { xs: 3, md: 0 } }}>
                    {sidebar.metaSections &&
                      sidebar.metaSections.map((section, sectionIndex) => (
                        <Paper
                          key={`meta-section-${sectionIndex}`}
                          sx={{
                            mb: 3,
                            p: 2.5,
                            boxShadow: theme.shadows[1],
                            borderRadius: theme.shape.borderRadius,
                            bgcolor: theme.palette.background.paper,
                          }}
                        >
                          <Typography
                            variant="h6"
                            gutterBottom
                            color="text.primary"
                            sx={{ fontWeight: 600 }}
                          >
                            {section.title}
                          </Typography>
                          <List dense>
                            {section.values.map((item, index) => (
                              <ListItem
                                key={`meta-item-${index}`}
                                sx={{ px: 0 }}
                              >
                                <Box sx={{ width: '100%' }}>
                                  {item.label && (
                                    <Typography
                                      variant="subtitle2"
                                      fontWeight="bold"
                                      component="div"
                                      color="text.secondary"
                                    >
                                      {item.label}
                                    </Typography>
                                  )}
                                  <Typography
                                    variant="body2"
                                    component="div"
                                    color="text.primary"
                                  >
                                    {item.value}
                                  </Typography>
                                </Box>
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      ))}

                    {sidebar.links && sidebar.links.length > 0 && (
                      <Paper
                        sx={{
                          mb: 3,
                          p: 2.5,
                          boxShadow: theme.shadows[1],
                          borderRadius: theme.shape.borderRadius,
                          bgcolor: theme.palette.background.paper,
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          Links
                        </Typography>
                        <List dense>
                          {sidebar.links.map((link, index) => (
                            <ListItem key={`link-${index}`} sx={{ px: 0 }}>
                              <Link
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="primary"
                              >
                                {link.label}
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    )}

                    {sidebar.newsletter && (
                      <Paper
                        sx={{
                          p: 2.5,
                          boxShadow: theme.shadows[1],
                          borderRadius: theme.shape.borderRadius,
                          bgcolor: theme.palette.background.paper,
                        }}
                      >
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="text.primary"
                          sx={{ fontWeight: 600 }}
                        >
                          {sidebar.newsletter.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          paragraph
                          color="text.secondary"
                        >
                          {sidebar.newsletter.description}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          component={RouterLink}
                          to={sidebar.newsletter.buttonLink}
                          onClick={sidebar.newsletter.onClick}
                        >
                          {sidebar.newsletter.buttonText}
                        </Button>
                      </Paper>
                    )}
                  </Box>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ContentDetailPage;
