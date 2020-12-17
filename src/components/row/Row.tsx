import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea } from '@Components';
import { Columns } from '@Reducers/board';

const Row = ({ columns }: { columns: Columns }) => {
  const GRID_WIDTH_PERCENT = 100 / columns.size;

  return (
    <Grid container>
      {columns.map((column) => {
        const key = column.get('key');
        return (
          <Grid
            item
            key={key}
            style={{
              maxWidth: `${GRID_WIDTH_PERCENT}%`,
              flexBasis: `${GRID_WIDTH_PERCENT}%`,
            }}
          >
            <Sea>{key}</Sea>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Row;
