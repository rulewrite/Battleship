import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea } from '@Components';
import { Columns } from 'redux/reducers/board';

const Row = ({ columns }: { columns: Columns }) => {
  const GRID_WIDTH_PERCENT = 100 / columns.size;

  return (
    <Grid container>
      {columns
        .map((column, columnKey) => {
          return (
            <Grid
              item
              key={columnKey}
              style={{
                maxWidth: `${GRID_WIDTH_PERCENT}%`,
                flexBasis: `${GRID_WIDTH_PERCENT}%`,
              }}
            >
              <Sea>{columnKey}</Sea>
            </Grid>
          );
        })
        .toList()}
    </Grid>
  );
};

export default Row;
