import { Grid, GridProps } from '@mui/material';
import React from 'react';

import { gridSizes, spacing as themeSpacing } from '../../theme/themeUtils';

interface GridItemConfig {
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
}

interface GridLayoutProps {
  items: React.ReactNode[];
  itemProps?: GridItemConfig;
  containerProps?: Omit<GridProps, 'container'>;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  spacing?: number;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  items,
  itemProps = gridSizes.thirdWidth,
  spacing = themeSpacing.lg,
  justifyContent = 'center',
  containerProps,
}) => {
  return (
    <Grid
      container
      spacing={spacing}
      justifyContent={justifyContent}
      {...containerProps}
    >
      {items.map((item, index) => (
        <Grid key={index} size={itemProps}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridLayout;
