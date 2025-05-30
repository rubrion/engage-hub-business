import { Box, Button, ButtonProps, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import Section, { SectionProps } from './Section';

export interface CTASectionProps extends SectionProps {
  buttonText?: string | ReactNode;
  buttonVariant?: 'contained' | 'outlined' | 'text';
  buttonColor?: ButtonProps['color'];
  onButtonClick?: () => void;
  buttonPosition?: 'top' | 'bottom';
  description?: string | ReactNode;
  sx?: SxProps<Theme>;
}

const CTASection: React.FC<CTASectionProps> = ({
  buttonText,
  buttonVariant = 'contained',
  buttonColor = 'primary',
  onButtonClick,
  buttonPosition = 'bottom',
  children,
  sx,
  ...sectionProps
}) => {
  const buttonComponent = buttonText ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={buttonVariant}
          color={buttonColor}
          onClick={onButtonClick}
          size="large"
          sx={{
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {buttonText}
        </Button>
      </motion.div>
    </Box>
  ) : null;

  return (
    <Section sx={sx} {...sectionProps}>
      {buttonPosition === 'top' && buttonComponent}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
      {buttonPosition === 'bottom' && buttonComponent}
    </Section>
  );
};

export default CTASection;
