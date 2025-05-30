import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  SvgIcon,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { prefetch } from '../../../utils/prefetchRoute';
import PlaceholderImage from '../PlaceholderImage';

export interface ContentItem {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  tags?: string[];
  ctaLink: string;
  ctaText: string;
  date?: string;
  author?: string;
  featured?: boolean;
  iconComponent?: typeof SvgIcon;
  prefetchImporter?: () => Promise<unknown>;
}

export interface ContentCardProps {
  item: ContentItem;
  elevation?: number;
  imageAspectRatio?: string;
  showCategory?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  categoryIconMap?: Record<string, typeof SvgIcon>;
}

const ContentCard: React.FC<ContentCardProps> = ({
  item,
  elevation = 1,
  imageAspectRatio = '56.25%',
  showCategory = true,
  variant = 'default',
  categoryIconMap,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const contentText = item.description;

  const hasValidImagePath = Boolean(item.image && item.image.trim().length > 0);

  const canUseImage = hasValidImagePath && !imageError;

  const getContentType = (): 'blog' | 'project' | 'generic' => {
    if (
      item.ctaLink.includes('/blog/') ||
      item.category?.toLowerCase().includes('blog')
    ) {
      return 'blog';
    }
    if (
      item.ctaLink.includes('/projects/') ||
      item.category?.toLowerCase().includes('project')
    ) {
      return 'project';
    }
    return 'generic';
  };

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
    img.src = item.image as string;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [hasValidImagePath, item.image]);

  const handlePrefetch = () => {
    if (item.prefetchImporter) {
      prefetch(item.prefetchImporter);
    }
  };

  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
      onMouseEnter={handlePrefetch}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: imageAspectRatio,
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: canUseImage && imageLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
            zIndex: canUseImage && imageLoaded ? 0 : 1,
          }}
        >
          <PlaceholderImage
            type={getContentType()}
            iconSize="large"
            width="100%"
            height="100%"
            category={item.category}
            categoryIconMap={categoryIconMap}
          />
        </Box>

        {canUseImage && (
          <CardMedia
            component="img"
            image={item.image}
            alt={item.title}
            onError={() => setImageError(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: imageLoaded ? 1 : 0,
            }}
          />
        )}

        {variant === 'featured' && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 'bold',
              zIndex: 2,
            }}
          >
            Featured
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        {showCategory && item.category && (
          <Typography
            variant="overline"
            color="text.secondary"
            component="div"
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            {categoryIconMap &&
              item.category &&
              categoryIconMap[item.category] && (
                <SvgIcon
                  component={categoryIconMap[item.category]}
                  sx={{ mr: 0.5 }}
                />
              )}
            {item.category}
          </Typography>
        )}

        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            fontSize: variant === 'compact' ? '1.1rem' : '1.25rem',
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {item.title}
        </Typography>

        {variant !== 'compact' && contentText && (
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ mb: 2 }}
          >
            {contentText}
          </Typography>
        )}

        {item.date && (
          <Typography variant="caption" color="text.secondary">
            {item.date}
            {item.author && ` • By ${item.author}`}
          </Typography>
        )}

        {item.tags && item.tags.length > 0 && (
          <Box sx={{ mt: 2, mb: 1 }}>
            {item.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={item.ctaLink}
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            fontWeight: 500,
            fontSize: variant === 'featured' ? '0.9rem' : '0.75rem',
          }}
          onMouseEnter={handlePrefetch}
          onFocus={handlePrefetch}
        >
          {item.ctaText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContentCard;
