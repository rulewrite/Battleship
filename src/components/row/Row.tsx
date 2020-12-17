import React from 'react';
import { Grid } from '@material-ui/core';
import { Sea } from '@Components';
import { Columns } from '@Reducers/board';

const Row = ({
  columns,
  gridWidthPercentage,
}: {
  columns: Columns;
  gridWidthPercentage: number;
}) => {
  return (
    <Grid container>
      {columns.map((column) => {
        const key = column.get('key');
        return (
          <Grid
            item
            key={key}
            style={{
              maxWidth: `${gridWidthPercentage}%`,
              flexBasis: `${gridWidthPercentage}%`,
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
