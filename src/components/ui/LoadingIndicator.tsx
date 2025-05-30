import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export interface LoadingIndicatorProps {
  message?: string;
  fullHeight?: boolean;
  size?: number;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...',
  fullHeight = false,
  size = 40,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: fullHeight ? '50vh' : '100%',
        position: fullHeight ? 'relative' : 'static',
        left: 0,
        top: 0,
        padding: 4,
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingIndicator;
