import { Box, useTheme } from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { debounce } from '../../utils/animationUtils';

interface Logo {
  src: string;
  alt: string;
  width: string;
  height: string;
}

interface PartnerCarouselProps {
  logos: Logo[];
  speed?: number;
  maxLogoHeight?: number;
  padding?: string;
  align?: 'center' | 'start' | 'end' | 'stretch';
  logoSize?: number; // New prop for consistent logo size
}

const PartnerCarousel: React.FC<PartnerCarouselProps> = ({
  logos = [],
  speed = 20,
  maxLogoHeight = 60, // Increased default height
  padding = '0 40px',
  align = 'center',
  logoSize = 160, // Default fixed size for logos
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const totalWidthRef = useRef(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const shouldAnimateRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationOffset, setAnimationOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [, setLoadedImages] = useState(0);
  const isReadyRef = useRef(false);
  const expectedImageCount = useMemo(() => logos.length, [logos.length]);

  const displayItems = useMemo(() => {
    if (logos.length === 0) return [];
    if (!shouldAnimate) return logos;
    return [...logos, ...logos, ...logos];
  }, [logos, shouldAnimate]);

  const startRAF = useCallback(() => {
    if (animationRef.current) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastTimeRef.current;
      const pixelsPerMs = totalWidthRef.current / (speed * 1000);

      offsetRef.current =
        (offsetRef.current + elapsed * pixelsPerMs) % totalWidthRef.current;

      setAnimationOffset(offsetRef.current);

      lastTimeRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = null;
    animationRef.current = requestAnimationFrame(animate);
  }, [speed]);

  const stopRAF = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const resetAnimation = useCallback(() => {
    offsetRef.current = 0;
    setAnimationOffset(0);
    stopRAF();

    if (
      shouldAnimateRef.current &&
      isReadyRef.current &&
      totalWidthRef.current > 0
    ) {
      startRAF();
    }
  }, [startRAF, stopRAF]);

  const recalculateDimensions = useCallback(() => {
    if (!containerRef.current || !innerRef.current || logos.length === 0)
      return;

    const containerWidth = containerRef.current.clientWidth;

    const originalFlexWrap = innerRef.current.style.flexWrap;
    const originalVisibility = innerRef.current.style.visibility;
    const originalPosition = innerRef.current.style.position;

    innerRef.current.style.flexWrap = 'nowrap';
    innerRef.current.style.visibility = 'hidden';
    innerRef.current.style.position = 'absolute';
    innerRef.current.style.width = 'auto';

    const itemsWidth = innerRef.current.scrollWidth;

    innerRef.current.style.flexWrap = originalFlexWrap;
    innerRef.current.style.visibility = originalVisibility;
    innerRef.current.style.position = originalPosition;
    innerRef.current.style.width = '';

    const originalItemsWidth = shouldAnimateRef.current
      ? itemsWidth / 3
      : itemsWidth;

    if (originalItemsWidth !== totalWidthRef.current) {
      totalWidthRef.current = originalItemsWidth;
      setTotalWidth(originalItemsWidth);
    }

    const newShouldAnimate = originalItemsWidth > containerWidth;

    if (newShouldAnimate !== shouldAnimateRef.current) {
      shouldAnimateRef.current = newShouldAnimate;
      setShouldAnimate(newShouldAnimate);

      resetAnimation();
    }
  }, [logos.length, resetAnimation]);

  const handleImageLoad = useCallback(() => {
    setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= expectedImageCount && !isReadyRef.current) {
        isReadyRef.current = true;
        setTimeout(recalculateDimensions, 50);
      }
      return newCount;
    });
  }, [expectedImageCount, recalculateDimensions]);

  const debouncedRecalculate = useMemo(
    () => debounce(recalculateDimensions, 100),
    [recalculateDimensions]
  );

  useEffect(() => {
    if (logos.length === 0) return;
    setLoadedImages(0);
    isReadyRef.current = false;
  }, [logos]);

  useEffect(() => {
    if (!containerRef.current || logos.length === 0) return;

    const resizeObserver = new ResizeObserver(debouncedRecalculate);
    resizeObserver.observe(containerRef.current);

    window.addEventListener('resize', debouncedRecalculate);
    window.addEventListener('orientationchange', debouncedRecalculate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedRecalculate);
      window.removeEventListener('orientationchange', debouncedRecalculate);
      stopRAF();
    };
  }, [logos.length, debouncedRecalculate, stopRAF]);

  useEffect(() => {
    if (shouldAnimate && isReadyRef.current && totalWidthRef.current > 0) {
      startRAF();
    } else {
      stopRAF();
    }

    return () => {
      stopRAF();
    };
  }, [shouldAnimate, totalWidth, speed, startRAF, stopRAF]);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'transparent', // Remove background from entire carousel
        py: 2,
        '&::before, &::after': shouldAnimate
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              width: '100px',
              height: '100%',
              zIndex: 2,
            }
          : {},
        '&::before': shouldAnimate
          ? {
              left: 0,
              background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)`,
            }
          : {},
        '&::after': shouldAnimate
          ? {
              right: 0,
              background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)`,
            }
          : {},
      }}
      ref={containerRef}
    >
      <Box
        ref={innerRef}
        sx={{
          display: 'flex',
          alignItems: align,
          justifyContent: shouldAnimate ? 'flex-start' : 'center',
          flexWrap: 'nowrap',
          width: shouldAnimate ? 'fit-content' : '100%',
          gap: 4,
          transform: shouldAnimate
            ? `translateX(-${animationOffset}px)`
            : 'none',
          willChange: shouldAnimate ? 'transform' : 'auto',
        }}
      >
        {displayItems.map((logo, index) => {
          const cloneGroup = Math.floor(index / logos.length);
          const originalIndex = index % logos.length;
          const uniqueKey = shouldAnimate
            ? `logo-${originalIndex}-clone-${cloneGroup}`
            : `logo-${originalIndex}`;

          return (
            <Box
              key={uniqueKey}
              sx={{
                padding: padding,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: logoSize,
                height: maxLogoHeight + 40, // Increased buffer around the logo
              }}
            >
              {/* Inner wrapper for hover scaling to avoid affecting the track animation */}
              <Box
                sx={{
                  transition: 'transform 0.3s ease',
                  transform:
                    hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: logoSize,
                  height: maxLogoHeight + 20,
                  padding: 2,
                  backgroundColor: 'transparent',
                  borderRadius: 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  onLoad={handleImageLoad}
                  onError={handleImageLoad}
                  style={{
                    maxHeight: maxLogoHeight,
                    width: 'auto',
                    height: 'auto',
                    maxWidth: logoSize - 16, // Slightly less restrictive
                    objectFit: 'contain',
                    opacity: hoveredIndex === index ? 1 : 0.6,
                    transition: 'all 0.3s ease, filter 0.3s ease',
                    filter:
                      hoveredIndex === index
                        ? isDarkMode
                          ? `drop-shadow(0 2px 6px rgba(255,255,255,0.3)) drop-shadow(0 1px 3px rgba(255,255,255,0.25)) drop-shadow(0 0px 2px rgba(255,255,255,0.2)) grayscale(0)`
                          : `drop-shadow(0 2px 6px rgba(0,0,0,0.3)) drop-shadow(0 1px 3px rgba(0,0,0,0.25)) drop-shadow(0 0px 2px rgba(0,0,0,0.2)) grayscale(0)`
                        : `grayscale(100%) brightness(0.9) drop-shadow(0 1px 2px rgba(0,0,0,0.05))`,
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PartnerCarousel;
