import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import PlaceholderImage, { PlaceholderType } from '../PlaceholderImage';

export interface ServiceItemType {
  id?: number | string;
  title: string;
  icon?: string;
  description: string;
  features?: string[];
  /**
   * Explicitly define the type of placeholder to use.
   * This overrides the automatic detection based on title/description keywords.
   * Valid types include: 'web', 'mobile', 'design', 'marketing', 'service',
   * 'consulting', 'cloud', 'ai', 'data', 'security', 'ecommerce', 'software',
   * 'support', 'integration', 'analytics', 'ai-project', 'fellowship',
   * 'event', 'hackathon', 'education', 'podcast', 'video-content'
   */
  placeholderType?: PlaceholderType;
}

interface ServiceCardProps {
  service: ServiceItemType;
  elevation?: number;
  imageHeight?: number | string;
  variant?: 'default' | 'compact';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  elevation = 1,
  imageHeight = 140,
  variant = 'default',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getServiceType = ():
    | 'web'
    | 'mobile'
    | 'design'
    | 'marketing'
    | 'service'
    | 'consulting'
    | 'cloud'
    | 'ai'
    | 'data'
    | 'security'
    | 'ecommerce'
    | 'software'
    | 'support'
    | 'integration'
    | 'analytics' => {
    if (!service.title) return 'service';

    const lowerTitle = service.title.toLowerCase();
    const lowerDescription = service.description?.toLowerCase() || '';

    // Check both title and description for keywords
    const textToCheck = lowerTitle + ' ' + lowerDescription;

    // Web development
    if (
      textToCheck.includes('web') ||
      textToCheck.includes('site') ||
      textToCheck.includes('website') ||
      textToCheck.includes('landing page')
    )
      return 'web';

    // Mobile development
    if (
      textToCheck.includes('mobile') ||
      textToCheck.includes('app') ||
      textToCheck.includes('android') ||
      textToCheck.includes('ios') ||
      textToCheck.includes('iphone')
    )
      return 'mobile';

    // Design services
    if (
      textToCheck.includes('design') ||
      textToCheck.includes('ui') ||
      textToCheck.includes('ux') ||
      textToCheck.includes('user interface') ||
      textToCheck.includes('branding') ||
      textToCheck.includes('logo')
    )
      return 'design';

    // Marketing services
    if (
      textToCheck.includes('marketing') ||
      textToCheck.includes('seo') ||
      textToCheck.includes('content') ||
      textToCheck.includes('social') ||
      textToCheck.includes('digital marketing') ||
      textToCheck.includes('advertising')
    )
      return 'marketing';

    // AI and Machine Learning
    if (
      textToCheck.includes('ai') ||
      textToCheck.includes('artificial intelligence') ||
      textToCheck.includes('machine learning') ||
      textToCheck.includes('ml') ||
      textToCheck.includes('automation')
    )
      return 'ai';

    // Data services
    if (
      textToCheck.includes('data') ||
      textToCheck.includes('analytics') ||
      textToCheck.includes('big data') ||
      textToCheck.includes('database') ||
      textToCheck.includes('bi') ||
      textToCheck.includes('business intelligence')
    )
      return 'data';

    // Cloud services
    if (
      textToCheck.includes('cloud') ||
      textToCheck.includes('aws') ||
      textToCheck.includes('azure') ||
      textToCheck.includes('google cloud') ||
      textToCheck.includes('hosting') ||
      textToCheck.includes('serverless')
    )
      return 'cloud';

    // E-commerce
    if (
      textToCheck.includes('ecommerce') ||
      textToCheck.includes('e-commerce') ||
      textToCheck.includes('shop') ||
      textToCheck.includes('online store') ||
      textToCheck.includes('marketplace')
    )
      return 'ecommerce';

    // Security
    if (
      textToCheck.includes('security') ||
      textToCheck.includes('cybersecurity') ||
      textToCheck.includes('secure') ||
      textToCheck.includes('protection') ||
      textToCheck.includes('firewall')
    )
      return 'security';

    // Consulting
    if (
      textToCheck.includes('consulting') ||
      textToCheck.includes('strategy') ||
      textToCheck.includes('business') ||
      textToCheck.includes('advisory')
    )
      return 'consulting';

    // Software Development
    if (
      textToCheck.includes('software') ||
      textToCheck.includes('development') ||
      textToCheck.includes('programming') ||
      textToCheck.includes('coding')
    )
      return 'software';

    // Support & Maintenance
    if (
      textToCheck.includes('support') ||
      textToCheck.includes('maintenance') ||
      textToCheck.includes('service desk') ||
      textToCheck.includes('help desk')
    )
      return 'support';

    // Integration
    if (
      textToCheck.includes('integration') ||
      textToCheck.includes('api') ||
      textToCheck.includes('connect') ||
      textToCheck.includes('middleware')
    )
      return 'integration';

    // Analytics
    if (
      textToCheck.includes('analytics') ||
      textToCheck.includes('metrics') ||
      textToCheck.includes('report') ||
      textToCheck.includes('dashboard')
    )
      return 'analytics';

    // Default fallback
    return 'service';
  };

  const canUseIcon = Boolean(service.icon && !imageError);

  useEffect(() => {
    if (!service.icon) return;

    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
    };
    img.src = service.icon;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [service.icon]);

  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Always render the placeholder first */}
      <Box
        sx={{
          height: imageHeight,
          position: 'relative',
        }}
      >
        {/* Always render the placeholder */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: canUseIcon && imageLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
            zIndex: canUseIcon && imageLoaded ? 0 : 1,
          }}
        >
          <PlaceholderImage
            type={service.placeholderType || getServiceType()}
            title={service.title}
            height={imageHeight}
            iconSize="large"
            aspectRatio="auto"
          />
        </Box>

        {/* Render the actual icon if available */}
        {canUseIcon && (
          <CardMedia
            component="div"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: imageHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.light',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: imageLoaded ? 1 : 0,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 80,
                width: 80,
                objectFit: 'contain',
              }}
              src={service.icon}
              alt={service.title}
              onError={() => setImageError(true)}
            />
          </CardMedia>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {service.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          sx={{ mb: 2 }}
        >
          {service.description}
        </Typography>

        {service.features &&
          service.features.length > 0 &&
          variant !== 'compact' && (
            <Typography variant="body2" component="div">
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Typography>
          )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
