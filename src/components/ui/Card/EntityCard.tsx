import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { cardLayout, transitions } from '../../../theme/themeUtils';
import PlaceholderImage from '../PlaceholderImage';

export interface EntityCardProps {
  avatar?: string;
  name: string;
  subtitle?: string;
  description?: string;
  links?: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  variant?: 'member' | 'partner';
  size?: 'default' | 'compact';
  avatarSize?: number;
  forceAvatarLayout?: boolean;
}

const EntityCard: React.FC<EntityCardProps> = ({
  avatar,
  name,
  subtitle,
  description,
  links,
  variant = 'member',
  size = 'default',
  avatarSize,
  forceAvatarLayout = false,
}) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const showExpandedContent = isHovered || isTouched;

  const isCompact = size === 'compact';
  const hasValidImagePath = Boolean(avatar && avatar.trim().length > 0);
  const canUseImage = hasValidImagePath && !imageError;
  const hasLinks = Boolean(links?.linkedin || links?.github || links?.website);

  const useAvatarLayout = isCompact || forceAvatarLayout;

  useEffect(() => {
    if (!hasValidImagePath) return;

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
    };
    img.src = avatar as string;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [hasValidImagePath, avatar]);

  const handleTouchCard = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTouched((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    if (!isTouched) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getAvatarSize = () => {
    if (avatarSize) return avatarSize;
    if (isCompact) return theme.spacing(cardLayout.heights.compact.avatar);
    return theme.spacing(cardLayout.heights.default.avatar);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: transitions.medium,
        boxShadow: showExpandedContent
          ? cardLayout.elevation.hovered
          : cardLayout.elevation.default,
        transform: showExpandedContent
          ? cardLayout.transform.raised
          : cardLayout.transform.none,
        cursor: 'pointer',
        position: 'relative',
        maxWidth: isCompact ? (theme) => theme.spacing(38) : undefined,
        minHeight: isCompact ? cardLayout.heights.compact.card : undefined,
        border: isTouched
          ? `${cardLayout.borderWidth}px solid ${theme.palette.primary.main}`
          : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchCard}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsTouched((prevState) => !prevState);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isTouched}
    >
      {!useAvatarLayout && variant !== 'member' && (
        <Box
          sx={{
            position: 'relative',
            paddingTop:
              variant === 'partner'
                ? cardLayout.mediaAspectRatio.partner
                : cardLayout.mediaAspectRatio.member,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin:
                variant === 'partner'
                  ? cardLayout.margin.partner
                  : cardLayout.margin.default,
              padding:
                variant === 'partner'
                  ? '16px' // Internal padding within gray background
                  : '0px',
              backgroundColor:
                variant === 'partner'
                  ? theme.palette.mode === 'light'
                    ? '#e0e0e0'
                    : 'transparent'
                  : 'transparent',
              borderRadius:
                variant === 'partner' ? theme.shape.borderRadius : 0,
              overflow: 'hidden',
              opacity:
                canUseImage && imageLoaded
                  ? cardLayout.opacity.collapsed
                  : cardLayout.opacity.expanded,
              transition: transitions.medium,
              zIndex: canUseImage && imageLoaded ? 0 : 1,
            }}
          >
            <PlaceholderImage
              type={variant === 'partner' ? 'service' : 'team'}
              aspectRatio={variant === 'partner' ? '1/1' : '4/3'}
              title={name}
              iconSize="large"
              height="100%"
              width="100%"
            />
          </Box>

          {canUseImage && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor:
                  variant === 'partner'
                    ? theme.palette.mode === 'light'
                      ? '#e0e0e0'
                      : 'transparent'
                    : 'rgba(0, 0, 0, 0.03)',
                margin:
                  variant === 'partner'
                    ? cardLayout.margin.partner
                    : cardLayout.margin.default,
                padding: variant === 'partner' ? '16px' : '0px',
                borderRadius:
                  variant === 'partner' ? theme.shape.borderRadius : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: imageLoaded
                  ? cardLayout.opacity.expanded
                  : cardLayout.opacity.collapsed,
                transition: transitions.medium,
                zIndex: imageLoaded ? 1 : 0,
              }}
            >
              <img
                src={avatar}
                alt={name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onError={() => setImageError(true)}
              />
            </Box>
          )}
        </Box>
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          pt: useAvatarLayout
            ? cardLayout.spacing.contentPadding
            : isCompact
              ? cardLayout.spacing.compactContentPadding
              : variant === 'partner'
                ? 0.5 // Much reduced top padding for partner cards
                : cardLayout.spacing.contentPadding,
          pb: useAvatarLayout
            ? cardLayout.spacing.contentPadding
            : isCompact
              ? cardLayout.spacing.compactContentPadding
              : cardLayout.spacing.contentPadding,
          display: 'flex',
          flexDirection: 'column',
          textAlign: useAvatarLayout ? 'center' : 'left',
          alignItems: useAvatarLayout ? 'center' : 'flex-start',
          justifyContent: 'space-between',
          px:
            useAvatarLayout && isCompact
              ? cardLayout.spacing.compactContentPadding
              : cardLayout.spacing.contentPadding,
        }}
      >
        {useAvatarLayout && variant === 'member' && (
          <Avatar
            src={avatar}
            alt={name}
            sx={{
              width: getAvatarSize(),
              height: getAvatarSize(),
              mb: cardLayout.spacing.avatarMargin,
              '& .MuiAvatar-img': { objectFit: 'cover' },
            }}
          >
            {!canUseImage && <PersonIcon fontSize="large" />}
          </Avatar>
        )}

        <Box
          sx={{
            width: '100%',
            mb: 0,
            minHeight: isCompact
              ? theme.spacing(cardLayout.heights.compact.nameSubtitleContainer)
              : theme.spacing(cardLayout.heights.default.nameSubtitleContainer),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:
              useAvatarLayout && variant !== 'partner'
                ? 'center'
                : 'flex-start',
            textAlign:
              useAvatarLayout && variant !== 'partner' ? 'center' : 'left',
          }}
        >
          <Typography
            gutterBottom={false}
            variant={isCompact ? 'h6' : 'h5'}
            component="h2"
            noWrap={false}
            sx={{
              fontWeight: isCompact ? 600 : 'bold',
              mb:
                variant === 'partner'
                  ? 0.25
                  : cardLayout.spacing.nameTitleSpacing,
              textAlign:
                useAvatarLayout && variant !== 'partner' ? 'center' : 'left',
              wordBreak: 'break-word',
              overflow: 'hidden',
              width: '100%',
              maxWidth: isCompact ? '100%' : undefined,
              height: isCompact
                ? theme.spacing(cardLayout.heights.compact.name)
                : cardLayout.heights.default.name,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              WebkitLineClamp: cardLayout.webkitLines.name,
              WebkitBoxOrient: 'vertical',
              lineHeight: isCompact ? cardLayout.lineHeight.compact : 'inherit',
              alignSelf:
                useAvatarLayout && variant !== 'partner'
                  ? 'center'
                  : 'flex-start',
              textOverflow: 'ellipsis',
              mx: useAvatarLayout && variant !== 'partner' ? 'auto' : 0,
            }}
          >
            {name}
          </Typography>

          {subtitle && (
            <Typography
              variant={isCompact ? 'caption' : 'subtitle1'}
              color="primary"
              gutterBottom={false}
              noWrap={isCompact}
              sx={{
                textTransform: isCompact ? 'uppercase' : 'none',
                letterSpacing: isCompact ? '0.5px' : 'inherit',
                fontWeight: isCompact ? 500 : 'inherit',
                textAlign:
                  useAvatarLayout && variant !== 'partner' ? 'center' : 'left',
                overflow: isCompact ? 'hidden' : 'visible',
                textOverflow: isCompact ? 'ellipsis' : undefined,
                width: '100%',
                mb: 0,
                mt:
                  variant === 'partner'
                    ? 0.1
                    : cardLayout.spacing.subtitleMargin,
                mx: useAvatarLayout && variant !== 'partner' ? 'auto' : 0,
                alignSelf:
                  useAvatarLayout && variant !== 'partner'
                    ? 'center'
                    : 'flex-start',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: showExpandedContent
              ? isCompact
                ? theme.spacing(cardLayout.heights.compact.description)
                : theme.spacing(cardLayout.heights.default.description)
              : 0,
            backgroundColor: 'transparent',
            borderRadius: theme.shape.borderRadius,
            px: isTouched ? cardLayout.spacing.compactContentPadding : 0,
            transition: transitions.medium,
          }}
        >
          {description && (
            <Typography
              variant="body2"
              component="p"
              sx={{
                mb: isCompact
                  ? cardLayout.spacing.descriptionMargin
                  : variant === 'partner'
                    ? 0.25
                    : cardLayout.spacing.contentPadding,
                maxHeight: showExpandedContent
                  ? `${isCompact ? '3em' : cardLayout.content.maxHeight}px`
                  : '0px',
                opacity: showExpandedContent
                  ? cardLayout.opacity.expanded
                  : cardLayout.opacity.collapsed,
                overflow: 'hidden',
                transition: `${transitions.medium}, opacity ${cardLayout.animation.duration}s ease`,
                display: '-webkit-box',
                WebkitLineClamp: isCompact
                  ? cardLayout.webkitLines.descriptionCompact
                  : cardLayout.webkitLines.descriptionDefault + 3, // Increase by 3 lines for more bio text space
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                fontSize: isCompact
                  ? theme.typography.caption.fontSize
                  : undefined,
                textAlign: useAvatarLayout ? 'center' : 'left',
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        {hasLinks && (
          <Box
            sx={{
              display: 'flex',
              gap: isCompact
                ? cardLayout.socialLinksGap.compact
                : cardLayout.socialLinksGap.default,
              justifyContent: useAvatarLayout ? 'center' : 'flex-start',
              mt: showExpandedContent
                ? isCompact
                  ? cardLayout.spacing.expandedMargin
                  : 'auto'
                : 0,
              height: showExpandedContent
                ? isCompact
                  ? cardLayout.heights.compact.socialLinksExpanded
                  : cardLayout.heights.default.socialLinksExpanded
                : cardLayout.heights.compact.socialLinksCollapsed,
              opacity: showExpandedContent
                ? cardLayout.opacity.expanded
                : cardLayout.opacity.collapsed,
              overflow: 'hidden',
              transition: `${transitions.medium}, opacity ${cardLayout.animation.duration}s ease`,
              width: '100%',
              backgroundColor: 'transparent',
              borderRadius: theme.shape.borderRadius,
              px: 0, // Remove padding for icon links to align with bio text
              alignItems: 'flex-start',
            }}
          >
            {links?.linkedin && (
              <IconButton
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="primary"
                aria-label="LinkedIn profile"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: isCompact
                    ? cardLayout.iconPadding.compact
                    : cardLayout.iconPadding.default,
                  ml: useAvatarLayout
                    ? 0
                    : isTouched
                      ? cardLayout.spacing.contentPadding - 1
                      : cardLayout.spacing.contentPadding - 1,
                }}
              >
                <LinkedInIcon fontSize={isCompact ? 'small' : 'medium'} />
              </IconButton>
            )}
            {links?.github && (
              <IconButton
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="primary"
                aria-label="GitHub profile"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: isCompact
                    ? cardLayout.iconPadding.compact
                    : cardLayout.iconPadding.default,
                }}
              >
                <GitHubIcon fontSize={isCompact ? 'small' : 'medium'} />
              </IconButton>
            )}
            {links?.website && (
              <IconButton
                href={links.website}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="primary"
                aria-label="Personal website"
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: isCompact
                    ? cardLayout.iconPadding.compact
                    : cardLayout.iconPadding.default,
                }}
              >
                <LanguageIcon fontSize={isCompact ? 'small' : 'medium'} />
              </IconButton>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EntityCard;
