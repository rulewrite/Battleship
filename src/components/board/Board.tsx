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
import { withRowsHeader, withCellsHeader } from '@Hoc';
import { Cells } from '@Components/row/Row';
import { List, Record, RecordOf } from 'immutable';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

interface RowProps {
  key: null | string;
  cells: Cells;
}

export const RowFactory = Record<RowProps>({
  key: null,
  cells: List([]),
});

export type Rows = List<RecordOf<RowProps>>;

export interface BoardProps {
  includedRowsHeader?: boolean;
  cellsHeader?: Cells;
  rows: Rows;
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

export const getLargestCellSize = (rows: Rows): number => {
  return rows.reduce((largestCellSize, row) => {
    const size = row.get('cells')?.size;
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
        const cells = row.get('cells');

        return <Row key={key} cells={cells} gridItemStyle={gridItemStyle} />;
      })}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(
  withRowsHeader,
  withCellsHeader,
  withStyles(styles)
)(Board);
