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
import { PointsRecords, PointFactory, Point, Points } from '@Reducers/board';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

interface BoardProps {
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

const getLargestCellSize = (rows: PointsRecords): number => {
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

const withCellsHeader = (WrappedComponent: ComponentType<BoardProps>) => (
  props: BoardProps
) => {
  const { rows, includedRowsHeader } = props;
  const cellsHeader = List(
    [...Array(getLargestCellSize(rows))].map((dumbValue, index) => {
      if (!includedRowsHeader) {
        return PointFactory({
          key: `${index + 1}`,
        });
      }

      if (index === 0) {
        return PointFactory({
          key: ' ',
        });
      }

      return PointFactory({
        key: `${index}`,
      });
    })
  );

  return <WrappedComponent {...props} cellsHeader={cellsHeader} />;
};

const withRowsHeader = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  cellsHeader,
  ...otherProps
}: BoardProps) => {
  const otherPropsWithIncludeRowsHeader = {
    ...otherProps,
    includedRowsHeader: true,
  };

  const rowKeys = rows.map((row) => row.get('key'));
  const rowsHeader = rowKeys.map((rowKey) =>
    PointFactory({
      key: rowKey,
    })
  );
  const rowWithRowsHeader = rows.map((row, rowIndex) => {
    const rowHeader = rowsHeader.get(rowIndex);

    const points = row.get('points');
    return row.set('points', points.unshift(rowHeader as Point));
  });

  if (!cellsHeader) {
    return (
      <WrappedComponent
        {...otherPropsWithIncludeRowsHeader}
        rows={rowWithRowsHeader}
      />
    );
  }

  const cellsHeaderWithRowHeader = cellsHeader.unshift(
    PointFactory({
      key: ' ',
    })
  );
  return (
    <WrappedComponent
      {...otherPropsWithIncludeRowsHeader}
      rows={rowWithRowsHeader}
      cellsHeader={cellsHeaderWithRowHeader}
    />
  );
};

export default compose<ComponentType<BoardProps>>(
  withRowsHeader,
  withCellsHeader,
  withStyles(styles)
)(Board);
