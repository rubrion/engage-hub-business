import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export interface SectionHeaderProps {
  overline: string | ReactNode;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  overline,
  title,
  subtitle,
  align = 'center',
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: align, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Handle overline - can be string or ReactNode */}
        {typeof overline === 'string' ? (
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              letterSpacing: '0.15em',
              fontSize: '0.75rem',
              display: 'block',
              mb: 1,
            }}
          >
            {overline}
          </Typography>
        ) : (
          overline
        )}

        {/* Handle title - can be string or ReactNode */}
        {typeof title === 'string' ? (
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mt: 1,
              mb: 2,
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              ...(align === 'center' && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px',
                },
              }),
              ...(align === 'left' && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: 0,
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px',
                },
              }),
              ...(align === 'right' && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  right: 0,
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '2px',
                },
              }),
            }}
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </motion.div>

      {/* Handle subtitle - can be string or ReactNode */}
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {typeof subtitle === 'string' ? (
            <Typography
              variant="body1"
              sx={{
                mt: 4,
                maxWidth: '700px',
                mx: align === 'center' ? 'auto' : 0,
                color: 'text.secondary',
                lineHeight: 1.7,
              }}
            >
              {subtitle.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < subtitle.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </Typography>
          ) : (
            subtitle
          )}
        </motion.div>
      )}
    </Box>
  );
};

export default SectionHeader;
