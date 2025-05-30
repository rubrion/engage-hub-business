import { Link as MuiLink } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import React, { useCallback } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

import { prefetch } from '../utils/prefetchRoute';

interface PrefetchLinkProps extends Omit<RouterLinkProps, 'component'> {
  prefetchImporter?: () => Promise<unknown>;
  prefetchOnViewport?: boolean;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  color?: string;
}

/**
 * Enhanced Link component that prefetches route bundles on hover/focus or viewport entry
 */
const PrefetchLink: React.FC<PrefetchLinkProps> = ({
  to,
  prefetchImporter,
  prefetchOnViewport = false,
  children,
  sx,
  color,
  ...props
}) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const handlePrefetch = useCallback(() => {
    if (prefetchImporter) {
      prefetch(prefetchImporter);
    }
  }, [prefetchImporter]);

  React.useEffect(() => {
    // If prefetchOnViewport is enabled, use IntersectionObserver to detect when link is visible
    if (prefetchOnViewport && prefetchImporter) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              handlePrefetch();
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' } // Start prefetching when within 200px
      );

      if (linkRef.current) {
        observer.observe(linkRef.current);
      }

      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  }, [prefetchOnViewport, prefetchImporter, handlePrefetch]);

  return (
    <MuiLink
      ref={linkRef}
      component={RouterLink}
      to={to}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      sx={sx}
      color={color}
      {...props}
    >
      {children}
    </MuiLink>
  );
};

export default PrefetchLink;
