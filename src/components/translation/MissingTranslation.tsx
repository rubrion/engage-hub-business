import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Tooltip } from '@mui/material';
import React from 'react';

import { useThemeContext } from '../../hooks/useThemeContext';
import { semanticColors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/themeUtils';

interface MissingTranslationProps {
  translationKey: string;
  namespace?: string;
  showTooltip?: boolean;
  compact?: boolean;
  className?: string;
  isDevelopment?: boolean;
}

/**
 * Component to display when a translation is missing
 */
const MissingTranslation: React.FC<MissingTranslationProps> = ({
  translationKey,
  namespace = '',
  showTooltip = true,
  compact = false,
  className,
  isDevelopment = process.env.NODE_ENV === 'development',
}) => {
  const { themeMode } = useThemeContext();
  const isDarkMode = themeMode === 'dark';

  const displayKey = namespace
    ? `${namespace}:${translationKey}`
    : translationKey;
  const tooltipTitle = `Missing translation: ${displayKey}`;

  // In production, just show a simple placeholder
  if (!isDevelopment) {
    return (
      <Box component="span" color="error.main">
        ...
      </Box>
    );
  }

  const content = (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: spacing.xs,
        px: compact ? spacing.xs / 2 : spacing.xs,
        py: compact ? spacing.xs / 4 : spacing.xs / 2,
        borderRadius: borderRadius.xs,
        fontSize: compact ? '0.7rem' : '0.75rem',
        fontFamily: 'monospace',
        color: isDarkMode
          ? semanticColors.error.main
          : semanticColors.error.dark,
        bgcolor: isDarkMode
          ? 'rgba(244, 67, 54, 0.1)'
          : 'rgba(211, 47, 47, 0.1)',
        border: `1px dashed ${isDarkMode ? semanticColors.error.main : semanticColors.error.dark}`,
        ':hover': {
          cursor: 'help',
        },
      }}
      className={className}
    >
      {!compact && <ErrorOutlineIcon fontSize="inherit" />}
      {compact ? '?' : displayKey}
    </Box>
  );

  if (showTooltip) {
    return <Tooltip title={tooltipTitle}>{content}</Tooltip>;
  }

  return content;
};

export default MissingTranslation;
