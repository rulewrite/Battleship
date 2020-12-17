import React, { ComponentType } from 'react';
import { compose } from 'redux';
import {
  withStyles,
  Paper,
  Grid,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import { Sea } from '@Components';
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
          console.log(columns.toJS(), rowKey);
          return (
            <Grid container key={rowKey}>
              {columns
                .map((column, columnKey) => {
                  return (
                    <Grid item xs key={`${rowKey}-${columnKey}`}>
                      <Sea>{`${rowKey}-${columnKey}`}</Sea>
                    </Grid>
                  );
                })
                .toList()}
            </Grid>
          );
        })
        .toList()}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(withStyles(styles))(Board);
