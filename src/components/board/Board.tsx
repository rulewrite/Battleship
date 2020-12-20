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
import { PointsRecords, Points } from '@Reducers/board';
import { withRowsHeader, withCellsHeader } from '@Hoc';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

export interface BoardProps {
  includedRowsHeader?: boolean;
  cellsHeader?: Points;
  rows: PointsRecords;
}

const getGridItemStyle = (cellSize: number): CSSProperties => {
  if (!cellSize) {
    return {};
  }

  if (cellSize === Infinity) {
    return {};
  }

  const gridItemWidthPercentage = 100 / cellSize;
  return {
    maxWidth: `${gridItemWidthPercentage}%`,
    flexBasis: `${gridItemWidthPercentage}%`,
  };
};

export const getLargestCellSize = (rows: PointsRecords): number => {
  return rows.reduce((largestCellSize, row) => {
    const size = row.get('points')?.size;
    if (largestCellSize < size) {
      return size;
    }
    return largestCellSize;
  }, 0);
};

const Board = ({
  classes,
  rows,
  cellsHeader,
}: WithStyles<typeof styles> & BoardProps) => {
  const largestCellSize = getLargestCellSize(rows);
  const gridItemStyle = getGridItemStyle(largestCellSize);

  return (
    <Paper className={classes.paper}>
      {cellsHeader && <Row cells={cellsHeader} gridItemStyle={gridItemStyle} />}

      {rows.map((row) => {
        const key = row.get('key');
        const points = row.get('points');

        return <Row key={key} cells={points} gridItemStyle={gridItemStyle} />;
      })}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(
  withRowsHeader,
  withCellsHeader,
  withStyles(styles)
)(Board);
