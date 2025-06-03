import { Box, styled, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TeamMemberType } from '../../data/teamData';
import { animationDurations, cardLayout } from '../../theme/themeUtils';
import { debugLog } from '../../utils/debugControl';
import EntityCard from './Card/EntityCard';

interface TeamSliderProps {
  members: TeamMemberType[];
  maxItems?: number;
  avatarSize?: number;
  cardGap?: number | string;
  showBio?: boolean;
}

const ArrowLeft = styled(motion.div)<{ show: boolean }>(({ theme, show }) => ({
  position: 'absolute',
  top: '145px', // Fixed position at middle of compact card (290px/2 = 145px)
  left: theme.spacing(cardLayout.slider.arrowSide),
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  opacity: show ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
  visibility: show ? 'visible' : 'hidden',
  zIndex: 10,
  backgroundColor: cardLayout.slider.arrowBackgroundDefault,
  borderRadius: '50%',
  width: cardLayout.slider.arrowSize,
  height: cardLayout.slider.arrowSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: cardLayout.slider.arrowBackgroundHover,
  },
  '&::before': {
    content: '""',
    display: 'block',
    width: cardLayout.slider.arrowIndicatorSize,
    height: cardLayout.slider.arrowIndicatorSize,
    borderLeft: `${cardLayout.slider.arrowIndicatorBorderWidth}px solid ${theme.palette.common.white}`,
    borderTop: `${cardLayout.slider.arrowIndicatorBorderWidth}px solid ${theme.palette.common.white}`,
    transform: `rotate(-45deg) translate(${cardLayout.slider.arrowIndicatorTranslate}px, 0)`,
  },
}));

const ArrowRight = styled(motion.div)<{ show: boolean }>(({ theme, show }) => ({
  position: 'absolute',
  top: '145px', // Fixed position at middle of compact card (290px/2 = 145px)
  right: theme.spacing(cardLayout.slider.arrowSide),
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  opacity: show ? 1 : 0,
  transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
  visibility: show ? 'visible' : 'hidden',
  zIndex: 10,
  backgroundColor: cardLayout.slider.arrowBackgroundDefault,
  borderRadius: '50%',
  width: cardLayout.slider.arrowSize,
  height: cardLayout.slider.arrowSize,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: cardLayout.slider.arrowBackgroundHover,
  },
  '&::before': {
    content: '""',
    display: 'block',
    width: cardLayout.slider.arrowIndicatorSize,
    height: cardLayout.slider.arrowIndicatorSize,
    borderRight: `${cardLayout.slider.arrowIndicatorBorderWidth}px solid ${theme.palette.common.white}`,
    borderTop: `${cardLayout.slider.arrowIndicatorBorderWidth}px solid ${theme.palette.common.white}`,
    transform: `rotate(45deg) translate(-${cardLayout.slider.arrowIndicatorTranslate}px, 0)`,
  },
}));

const TeamSlider: React.FC<TeamSliderProps> = ({
  members,
  maxItems,
  avatarSize = 120,
  cardGap = 1,
  showBio = false,
}) => {
  const theme = useTheme();
  const railRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const displayMembers = maxItems ? members.slice(0, maxItems) : members;
  const CARD_WIDTH = cardLayout.cardWidth;

  const getGapPixels = useCallback((): number => {
    if (typeof cardGap === 'string') {
      const parsed = parseFloat(cardGap);
      return isNaN(parsed) ? 16 : parsed;
    }
    return typeof cardGap === 'number' ? cardGap * 8 : 16;
  }, [cardGap]);

  const updateArrowVisibility = useCallback(() => {
    if (!railRef.current) return;

    const container = railRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    debugLog('Scroll debug:', {
      scrollLeft,
      scrollWidth,
      clientWidth,
      maxScroll,
      canScrollLeft: scrollLeft > cardLayout.scrollThreshold,
      canScrollRight: scrollLeft < maxScroll - cardLayout.scrollThreshold,
    });

    setShowLeftArrow(scrollLeft > cardLayout.scrollThreshold);
    setShowRightArrow(scrollLeft < maxScroll - cardLayout.scrollThreshold);
  }, []);

  const updatePagination = useCallback(() => {
    if (!railRef.current) return;

    const container = railRef.current;
    const containerWidth = container.clientWidth;
    const gapSize = getGapPixels();

    const cardsPerView = Math.floor(containerWidth / (CARD_WIDTH + gapSize));
    const pages = Math.ceil(displayMembers.length / cardsPerView);

    setTotalPages(pages);

    const scrollLeft = container.scrollLeft;
    const cardWithGap = CARD_WIDTH + gapSize;
    const pageWidth = cardsPerView * cardWithGap;

    let currentPageCalc = Math.round(scrollLeft / pageWidth);

    currentPageCalc = Math.max(0, Math.min(currentPageCalc, pages - 1));

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (scrollLeft >= maxScroll - cardLayout.scrollThreshold) {
      currentPageCalc = pages - 1;
    }

    debugLog('Page calculation:', {
      scrollLeft,
      pageWidth,
      cardsPerView,
      calculatedPage: Math.round(scrollLeft / pageWidth),
      finalPage: currentPageCalc,
      totalPages: pages,
      isAtEnd: scrollLeft >= maxScroll - cardLayout.scrollThreshold,
    });

    setCurrentPage(currentPageCalc);
    updateArrowVisibility();
  }, [displayMembers.length, getGapPixels, updateArrowVisibility, CARD_WIDTH]);

  const handleScroll = useCallback(() => {
    updatePagination();
  }, [updatePagination]);

  const navigateLeft = useCallback(() => {
    if (!railRef.current) return;

    const container = railRef.current;
    const gapSize = getGapPixels();
    const scrollAmount = CARD_WIDTH + gapSize;
    const newScrollLeft = Math.max(0, container.scrollLeft - scrollAmount);

    debugLog('Navigate left:', {
      current: container.scrollLeft,
      scrollAmount,
      newScrollLeft,
    });

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(updatePagination, animationDurations.short);
  }, [getGapPixels, updatePagination, CARD_WIDTH]);

  const navigateRight = useCallback(() => {
    if (!railRef.current) return;

    const container = railRef.current;
    const gapSize = getGapPixels();
    const scrollAmount = CARD_WIDTH + gapSize;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScrollLeft = Math.min(
      maxScroll,
      container.scrollLeft + scrollAmount
    );

    debugLog('Navigate right:', {
      current: container.scrollLeft,
      scrollAmount,
      maxScroll,
      newScrollLeft,
      willActuallyScroll: newScrollLeft > container.scrollLeft,
    });

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(updatePagination, animationDurations.short);
  }, [getGapPixels, updatePagination, CARD_WIDTH]);

  const navigateToPage = useCallback(
    (pageIndex: number) => {
      if (!railRef.current) return;

      const container = railRef.current;
      const containerWidth = container.clientWidth;
      const gapSize = getGapPixels();
      const cardsPerView = Math.floor(containerWidth / (CARD_WIDTH + gapSize));
      const cardWithGap = CARD_WIDTH + gapSize;
      const pageWidth = cardsPerView * cardWithGap;
      const targetScroll = pageIndex * pageWidth;

      debugLog('Navigate to page:', {
        pageIndex,
        cardsPerView,
        pageWidth,
        targetScroll,
      });

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });

      setTimeout(() => {
        updatePagination();
      }, animationDurations.short);
    },
    [getGapPixels, updatePagination, CARD_WIDTH]
  );

  useEffect(() => {
    const container = railRef.current;
    if (!container) return;

    updatePagination();

    const resizeObserver = new ResizeObserver(() => {
      updatePagination();
    });
    resizeObserver.observe(container);

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, updatePagination]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        ref={railRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          py: 2,
          pb: 4,
          gap: `${getGapPixels()}px`,
          cursor: 'grab',
          touchAction: 'pan-x',
          userSelect: 'none',
          '&:active': {
            cursor: 'grabbing',
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {displayMembers.map((member, index) => (
          <Box
            key={member.id || member.name || index}
            sx={{
              width: cardLayout.cardWidth,
              flexShrink: 0,
            }}
          >
            <EntityCard
              avatar={member.image}
              name={member.name}
              subtitle={member.role}
              description={showBio ? member.bio : undefined}
              links={{
                linkedin: member.linkedin,
                github: member.github,
                website: member.website || member.contact,
              }}
              variant="member"
              size="compact"
              avatarSize={avatarSize}
            />
          </Box>
        ))}
      </Box>

      <ArrowLeft
        show={showLeftArrow}
        onClick={navigateLeft}
        animate={{
          x: showLeftArrow ? [0, -5, 0] : 0,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        aria-label="Navigate to previous members"
        role="button"
        tabIndex={showLeftArrow ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateLeft();
          }
        }}
      />

      <ArrowRight
        show={showRightArrow}
        onClick={navigateRight}
        animate={{
          x: showRightArrow ? [0, 5, 0] : 0,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        aria-label="Navigate to next members"
        role="button"
        tabIndex={showRightArrow ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateRight();
          }
        }}
      />

      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: cardLayout.slider.paginationMarginTop,
            gap: cardLayout.slider.paginationGap,
          }}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={`page-dot-${index}`}
              role="button"
              tabIndex={0}
              aria-label={`Page ${index + 1} of ${totalPages}`}
              onClick={() => navigateToPage(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigateToPage(index);
                }
              }}
              sx={{
                width: cardLayout.slider.paginationDotSize,
                height: cardLayout.slider.paginationDotSize,
                borderRadius: '50%',
                backgroundColor:
                  index === currentPage
                    ? theme.palette.primary.main
                    : theme.palette.grey[400],
                opacity: index === currentPage ? 1 : 0.5,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TeamSlider;
