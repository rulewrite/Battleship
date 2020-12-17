import React, { ComponentType, CSSProperties } from 'react';
import { compose } from 'redux';
import {
  withStyles,
  Paper,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import { Row } from '@Components';
import { Rows } from '@Reducers/board';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

interface BoardProps {
  rows: Rows;
}

const getGridItemStyle = (gridWidthPercentage: number): CSSProperties => {
  if (gridWidthPercentage < 1) {
    return {};
  }

  return {
    maxWidth: `${gridWidthPercentage}%`,
    flexBasis: `${gridWidthPercentage}%`,
  };
};

const Board = ({ classes, rows }: WithStyles<typeof styles> & BoardProps) => {
  const largestColumnSize = rows.reduce((largestColumnSize, row) => {
    const size = row.get('columns')?.size;
    if (largestColumnSize < size) {
      return size;
    }
    return largestColumnSize;
  }, 0);

  const gridWidthPercentage = 100 / largestColumnSize;

  const gridItemStyle = getGridItemStyle(gridWidthPercentage);

  return (
    <Paper className={classes.paper}>
      {rows.map((row) => {
        const key = row.get('key');
        const columns = row.get('columns');

        return (
          <Row key={key} columns={columns} gridItemStyle={gridItemStyle} />
        );
      })}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(withStyles(styles))(Board);
