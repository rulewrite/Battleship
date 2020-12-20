import { List } from 'immutable';
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
import {
  PointsRecords,
  PointFactory,
  PointsRecordFactory,
  Point,
} from '@Reducers/board';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

interface BoardProps {
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

const getLargestCellSize = (rows: PointsRecords): number => {
  return rows.reduce((largestCellSize, row) => {
    const size = row.get('points')?.size;
    if (largestCellSize < size) {
      return size;
    }
    return largestCellSize;
  }, 0);
};

const Board = ({ classes, rows }: WithStyles<typeof styles> & BoardProps) => {
  const largestCellSize = getLargestCellSize(rows);
  const gridItemStyle = getGridItemStyle(largestCellSize);

  return (
    <Paper className={classes.paper}>
      {rows.map((row) => {
        const key = row.get('key');
        const points = row.get('points');

        return <Row key={key} cells={points} gridItemStyle={gridItemStyle} />;
      })}
    </Paper>
  );
};

const withPointHeaders = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  ...otherProps
}: BoardProps) => {
  const pointHeaders = PointsRecordFactory({
    key: ' ',
    points: List(
      [...Array(getLargestCellSize(rows))].map((dumbValue, index) => {
        return PointFactory({
          key: String(index + 1),
        });
      })
    ),
  });

  const rowsWithPointHeaders = rows.unshift(pointHeaders);

  return <WrappedComponent {...otherProps} rows={rowsWithPointHeaders} />;
};

const withRowHeaders = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  ...otherProps
}: BoardProps) => {
  const rowKeys = rows.map((row) => row.get('key'));
  const rowHeaders = rowKeys.map((rowKey) =>
    PointFactory({
      key: rowKey,
    })
  );
  const rowWithRowHeaders = rows.map((row, rowIndex) => {
    const rowHeader = rowHeaders.get(rowIndex);

    const points = row.get('points');
    return row.set('points', points.unshift(rowHeader as Point));
  });

  return <WrappedComponent {...otherProps} rows={rowWithRowHeaders} />;
};

export default compose<ComponentType<BoardProps>>(
  withPointHeaders,
  withRowHeaders,
  withStyles(styles)
)(Board);
