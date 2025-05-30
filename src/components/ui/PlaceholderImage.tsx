import AgricultureIcon from '@mui/icons-material/Agriculture';
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import CloudIcon from '@mui/icons-material/Cloud';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import DevicesIcon from '@mui/icons-material/Devices';
import TransportationIcon from '@mui/icons-material/DirectionsBus';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FactoryIcon from '@mui/icons-material/Factory';
import GamesIcon from '@mui/icons-material/Games';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HomeIcon from '@mui/icons-material/Home';
import ImageIcon from '@mui/icons-material/Image';
import LandscapeIcon from '@mui/icons-material/Landscape';
import PersonIcon from '@mui/icons-material/Person';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SportsIcon from '@mui/icons-material/Sports';
import StorageIcon from '@mui/icons-material/Storage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import { Box, SvgIcon } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { borderRadius, layout } from '../../theme/themeUtils';
import { useThemeValues } from '../../theme/useThemeValues';

export type PlaceholderType =
  | 'blog'
  | 'project'
  | 'generic'
  | 'service'
  | 'team'
  | 'web'
  | 'mobile'
  | 'design'
  | 'marketing'
  | 'consulting'
  | 'cloud'
  | 'ai'
  | 'data'
  | 'security'
  | 'ecommerce'
  | 'software'
  | 'support'
  | 'integration'
  | 'analytics'
  | 'ai-project'
  | 'fellowship'
  | 'event'
  | 'hackathon'
  | 'education'
  | 'podcast'
  | 'video-content'
  | 'energy'
  | 'healthcare'
  | 'finance'
  | 'smart-cities'
  | 'agriculture'
  | 'transportation'
  | 'entertainment'
  | 'communication'
  | 'manufacturing'
  | 'real-estate'
  | 'tourism'
  | 'sports'
  | 'food'
  | 'environment'
  | 'social-impact';

interface PlaceholderImageProps {
  type?: PlaceholderType;
  title?: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  iconSize?: 'small' | 'medium' | 'large';
  customIcon?: React.ReactNode;
  category?: string;
  categoryIconMap?: Record<string, typeof SvgIcon>;
  iconComponent?: typeof SvgIcon;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  type = 'generic',
  title,
  width = '100%',
  height = 'auto',
  aspectRatio = '16/9',
  iconSize = 'large',
  customIcon,
  category,
  categoryIconMap,
}) => {
  const { color, isDarkMode, theme } = useThemeValues();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const iconSizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const iconSizeInPx = iconSizeMap[iconSize] || 40;

  const getBgColor = () => {
    switch (type) {
      case 'blog':
        return isDarkMode
          ? `${theme.palette.primary.dark}15`
          : `${theme.palette.primary.light}08`;
      case 'project':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}08`;
      case 'service':
        return isDarkMode
          ? `${theme.palette.primary.main}12`
          : `${theme.palette.primary.light}08`;
      case 'team':
        return isDarkMode
          ? `${theme.palette.secondary.main}15`
          : `${theme.palette.secondary.light}08`;
      // Service categories with consistent color template
      case 'web':
        return isDarkMode
          ? `${theme.palette.primary.dark}15`
          : `${theme.palette.primary.light}10`;
      case 'mobile':
        return isDarkMode
          ? `${theme.palette.info.dark}15`
          : `${theme.palette.info.light}10`;
      case 'design':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}10`;
      case 'marketing':
        return isDarkMode
          ? `${theme.palette.success.dark}15`
          : `${theme.palette.success.light}10`;
      case 'consulting':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}10`;
      case 'cloud':
        return isDarkMode
          ? `${theme.palette.info.dark}15`
          : `${theme.palette.info.light}10`;
      case 'ai':
        return isDarkMode
          ? `${theme.palette.secondary.dark}20`
          : `${theme.palette.secondary.light}15`;
      case 'data':
        return isDarkMode
          ? `${theme.palette.info.dark}18`
          : `${theme.palette.info.light}12`;
      case 'security':
        return isDarkMode
          ? `${theme.palette.error.dark}15`
          : `${theme.palette.error.light}08`;
      case 'ecommerce':
        return isDarkMode
          ? `${theme.palette.success.dark}15`
          : `${theme.palette.success.light}08`;
      case 'software':
        return isDarkMode
          ? `${theme.palette.primary.dark}18`
          : `${theme.palette.primary.light}12`;
      case 'support':
        return isDarkMode
          ? `${theme.palette.info.main}15`
          : `${theme.palette.info.light}08`;
      case 'integration':
        return isDarkMode
          ? `${theme.palette.warning.dark}15`
          : `${theme.palette.warning.light}08`;
      case 'analytics':
        return isDarkMode
          ? `${theme.palette.info.dark}20`
          : `${theme.palette.info.light}15`;
      // Project-specific categories
      case 'energy':
        return isDarkMode
          ? `${theme.palette.warning.dark}15`
          : `${theme.palette.warning.light}10`;
      case 'healthcare':
        return isDarkMode
          ? `${theme.palette.error.dark}12`
          : `${theme.palette.error.light}08`;
      case 'finance':
        return isDarkMode
          ? `${theme.palette.success.dark}15`
          : `${theme.palette.success.light}10`;
      case 'smart-cities':
        return isDarkMode
          ? `${theme.palette.info.dark}18`
          : `${theme.palette.info.light}12`;
      case 'agriculture':
        return isDarkMode
          ? `${theme.palette.success.dark}18`
          : `${theme.palette.success.light}12`;
      case 'transportation':
        return isDarkMode
          ? `${theme.palette.primary.dark}15`
          : `${theme.palette.primary.light}10`;
      case 'entertainment':
        return isDarkMode
          ? `${theme.palette.secondary.dark}18`
          : `${theme.palette.secondary.light}12`;
      case 'communication':
        return isDarkMode
          ? `${theme.palette.info.dark}15`
          : `${theme.palette.info.light}10`;
      case 'manufacturing':
        return isDarkMode
          ? `${theme.palette.warning.dark}18`
          : `${theme.palette.warning.light}12`;
      case 'real-estate':
        return isDarkMode
          ? `${theme.palette.primary.dark}12`
          : `${theme.palette.primary.light}08`;
      case 'tourism':
        return isDarkMode
          ? `${theme.palette.secondary.dark}15`
          : `${theme.palette.secondary.light}10`;
      case 'sports':
        return isDarkMode
          ? `${theme.palette.error.dark}15`
          : `${theme.palette.error.light}10`;
      case 'food':
        return isDarkMode
          ? `${theme.palette.warning.dark}15`
          : `${theme.palette.warning.light}10`;
      case 'environment':
        return isDarkMode
          ? `${theme.palette.success.dark}20`
          : `${theme.palette.success.light}15`;
      case 'social-impact':
        return isDarkMode
          ? `${theme.palette.secondary.dark}20`
          : `${theme.palette.secondary.light}15`;
      default:
        return isDarkMode ? color('background.paper') : color('grey.100');
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'blog':
        return color('primary.main');
      case 'project':
        return color('secondary.main');
      case 'service':
        return color('primary.main');
      case 'team':
        return color('secondary.main');
      // Service categories with consistent color template
      case 'web':
        return color('primary.dark');
      case 'mobile':
        return color('info.dark');
      case 'design':
        return color('secondary.dark');
      case 'marketing':
        return color('success.dark');
      case 'consulting':
        return color('secondary.dark');
      case 'cloud':
        return color('info.main');
      case 'ai':
        return color('secondary.dark');
      case 'data':
        return color('info.dark');
      case 'security':
        return color('error.main');
      case 'ecommerce':
        return color('success.main');
      case 'software':
        return color('primary.dark');
      case 'support':
        return color('info.main');
      case 'integration':
        return color('warning.dark');
      case 'analytics':
        return color('info.dark');
      // Project-specific categories
      case 'energy':
        return color('warning.dark');
      case 'healthcare':
        return color('error.dark');
      case 'finance':
        return color('success.dark');
      case 'smart-cities':
        return color('info.dark');
      case 'agriculture':
        return color('success.dark');
      case 'transportation':
        return color('primary.dark');
      case 'entertainment':
        return color('secondary.dark');
      case 'communication':
        return color('info.dark');
      case 'manufacturing':
        return color('warning.dark');
      case 'real-estate':
        return color('primary.dark');
      case 'tourism':
        return color('secondary.dark');
      case 'sports':
        return color('error.dark');
      case 'food':
        return color('warning.dark');
      case 'environment':
        return color('success.dark');
      case 'social-impact':
        return color('secondary.dark');
      default:
        return isDarkMode ? color('grey.400') : color('grey.500');
    }
  };

  // Choose the appropriate icon component
  const getIconComponent = () => {
    if (category && categoryIconMap && categoryIconMap[category]) {
      return categoryIconMap[category];
    }
    switch (type) {
      case 'blog':
        return ArticleIcon;
      case 'project':
        return WorkIcon;
      case 'service':
        return BusinessIcon;
      case 'team':
        return PersonIcon;
      case 'web':
        return CodeIcon;
      case 'mobile':
        return DevicesIcon;
      case 'design':
        return DesignServicesIcon;
      case 'marketing':
        return BusinessIcon;
      case 'consulting':
        return PresentToAllIcon;
      case 'cloud':
        return CloudIcon;
      case 'ai':
        return SmartToyIcon;
      case 'data':
        return StorageIcon;
      case 'security':
        return SecurityIcon;
      case 'ecommerce':
        return ShoppingCartIcon;
      case 'software':
        return DeveloperModeIcon;
      case 'support':
        return SupportAgentIcon;
      case 'integration':
        return ApiIcon;
      case 'analytics':
        return BarChartIcon;
      // Project-specific categories
      case 'energy':
        return ElectricBoltIcon;
      case 'healthcare':
        return HealthAndSafetyIcon;
      case 'finance':
        return BusinessIcon;
      case 'smart-cities':
        return LandscapeIcon;
      case 'agriculture':
        return AgricultureIcon;
      case 'transportation':
        return TransportationIcon;
      case 'entertainment':
        return GamesIcon;
      case 'communication':
        return CampaignIcon;
      case 'manufacturing':
        return FactoryIcon;
      case 'real-estate':
        return HomeIcon;
      case 'tourism':
        return TravelExploreIcon;
      case 'sports':
        return SportsIcon;
      case 'food':
        return RestaurantIcon;
      case 'environment':
        return LandscapeIcon;
      case 'social-impact':
        return VolunteerActivismIcon;
      default:
        return ImageIcon;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <Box
      sx={{
        width,
        height,
        aspectRatio,
        backgroundColor: getBgColor(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: getIconColor(),
        borderRadius: borderRadius.xs,
        overflow: 'hidden',
        minHeight: `${layout.minContentHeight}px`,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        opacity: isLoaded ? 1 : 0.8,
      }}
      role="img"
      aria-label={title || `${type} placeholder image`}
    >
      {customIcon || (
        <SvgIcon
          component={IconComponent}
          sx={{
            fontSize: iconSizeInPx,
            width: iconSizeInPx,
            height: iconSizeInPx,
            display: 'block',
            transition: 'color 0.3s ease',
          }}
        />
      )}
      {title && (
        <Box
          component="span"
          sx={{
            mt: 1,
            px: 2,
            maxWidth: '100%',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Box>
      )}
    </Box>
  );
};

export default PlaceholderImage;
