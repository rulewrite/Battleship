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
import { Cell, Sea } from '@Components';
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
      <Grid container>
        <Grid item xs>
          <Cell>B</Cell>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
        <Grid item xs>
          <Sea>A</Sea>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(withStyles(styles))(Board);
