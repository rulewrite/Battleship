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
import { Rows, ColumnRecord } from '@Reducers/board';

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
  const rowKeys = rows.map((row) => row.get('key'));
  const rowHeaders = rowKeys.map((rowKey) =>
    ColumnRecord({
      key: rowKey,
    })
  );
  const rowWithRowHeaders = rows.map((row, rowIndex) => {
    const rowHeader = rowHeaders.get(rowIndex);
    if (!rowHeader) {
      return row;
    }

    const columns = row.get('columns');
    return row.set('columns', columns.unshift(rowHeader));
  });

  const largestColumnSize = getLargestColumnSize(rowWithRowHeaders);
  const gridWidthPercentage = 100 / largestColumnSize;
  const gridItemStyle = getGridItemStyle(gridWidthPercentage);

  const columnHeaders = List([
    ColumnRecord({
      key: ' ',
    }),
  ]).concat(
    [...Array(getLargestColumnSize(rows))].map((dumbValue, index) =>
      ColumnRecord({
        key: String(index + 1),
      })
    )
  );

  return (
    <Paper className={classes.paper}>
      <Row columns={columnHeaders} gridItemStyle={gridItemStyle} />

      {rowWithRowHeaders.map((row) => {
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
