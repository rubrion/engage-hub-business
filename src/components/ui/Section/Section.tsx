import { Box, Container, ContainerProps, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

import SectionHeader, { SectionHeaderProps } from './SectionHeader';

export interface SectionProps extends Omit<SectionHeaderProps, 'align'> {
  id?: string;
  maxWidth?: ContainerProps['maxWidth'];
  spacing?: number;
  children?: React.ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  py?: number;
  align?: 'left' | 'center' | 'right';
  sx?: SxProps<Theme>;
}

const Section: React.FC<SectionProps> = ({
  id,
  overline,
  title,
  subtitle,
  align = 'center',
  maxWidth = 'lg',
  spacing = 6,
  backgroundColor,
  backgroundImage,
  py = 6,
  children,
  sx,
}) => {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        py,
        backgroundColor,
        backgroundImage: backgroundImage
          ? `url('${backgroundImage}')`
          : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        backgroundPosition: backgroundImage ? 'center' : undefined,
        position: 'relative',
        ...sx,
      }}
    >
      {/* Background decoration for dark mode */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          opacity: 0.05,
          zIndex: 0,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)'
              : 'none',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            overline={overline}
            title={title}
            subtitle={subtitle}
            align={align}
          />
        </motion.div>

        {children && <Box sx={{ mt: spacing }}>{children}</Box>}
      </Container>
    </Box>
  );
};

export default Section;
