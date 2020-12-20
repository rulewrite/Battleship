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
import { Rows, ColumnFactory, RowFactory, Column } from '@Reducers/board';

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

const getLargestColumnSize = (rows: Rows): number => {
  return rows.reduce((largestColumnSize, row) => {
    const size = row.get('columns')?.size;
    if (largestColumnSize < size) {
      return size;
    }
    return largestColumnSize;
  }, 0);
};

const Board = ({ classes, rows }: WithStyles<typeof styles> & BoardProps) => {
  const largestColumnSize = getLargestColumnSize(rows);
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

const withColumnHeaders = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  ...otherProps
}: BoardProps) => {
  const columnKey = ' ';
  const columnHeaders = RowFactory({
    key: columnKey,
    columns: List(
      [...Array(getLargestColumnSize(rows))].map((dumbValue, index) => {
        return ColumnFactory({
          key: String(index + 1),
        });
      })
    ),
  });

  const rowsWithColumnHeaders = rows.unshift(columnHeaders);

  return <WrappedComponent {...otherProps} rows={rowsWithColumnHeaders} />;
};

const withRowHeaders = (WrappedComponent: ComponentType<BoardProps>) => ({
  rows,
  ...otherProps
}: BoardProps) => {
  const rowKeys = rows.map((row) => row.get('key'));
  const rowHeaders = rowKeys.map((rowKey) =>
    ColumnFactory({
      key: rowKey,
    })
  );
  const rowWithRowHeaders = rows.map((row, rowIndex) => {
    const rowHeader = rowHeaders.get(rowIndex);

    const columns = row.get('columns');
    return row.set('columns', columns.unshift(rowHeader as Column));
  });

  return <WrappedComponent {...otherProps} rows={rowWithRowHeaders} />;
};

export default compose<ComponentType<BoardProps>>(
  withColumnHeaders,
  withRowHeaders,
  withStyles(styles)
)(Board);
