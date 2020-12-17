import React, { ComponentType } from 'react';
import { compose } from 'redux';
import {
  withStyles,
  Paper,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import { Row } from '@Components';
import { Rows } from 'redux/reducers/board';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

interface BoardProps {
  rows: Rows;
}

const Board = ({ classes, rows }: WithStyles<typeof styles> & BoardProps) => {
  console.log(rows);
  return (
    <Paper className={classes.paper}>
      {rows
        .map((columns, rowKey) => {
          console.log(columns.size, columns.toJS(), rowKey);
          return <Row columns={columns} key={rowKey} />;
        })
        .toList()}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(withStyles(styles))(Board);
