import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import React from 'react';

interface ScrollToTopProps {
  threshold?: number;
  position?: {
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
}

class ScrollToTop extends React.Component<ScrollToTopProps> {
  static defaultProps = {
    threshold: 100,
    position: { right: 20, bottom: 20 },
    color: 'primary',
    size: 'medium',
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { threshold, position, color, size } = this.props;

    return (
      <ScrollToTopContent
        threshold={threshold!}
        position={position!}
        color={color!}
        size={size!}
        onClick={this.scrollToTop}
      />
    );
  }
}

function ScrollToTopContent({
  threshold,
  position,
  color,
  size,
  onClick,
}: Required<ScrollToTopProps> & { onClick: () => void }) {
  const trigger = useScrollTrigger({
    threshold,
    disableHysteresis: true,
  });

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: position.bottom,
          right: position.right,
          left: position.left,
          zIndex: 2,
        }}
        onClick={onClick}
      >
        <Fab
          color={color}
          size={size}
          aria-label="Scroll back to top"
          sx={{
            boxShadow:
              '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export default ScrollToTop;
