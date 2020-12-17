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
  return (
    <Paper className={classes.paper}>
      {rows.map((row) => {
        const key = row.get('key');
        const columns = row.get('columns');

        return <Row columns={columns} key={key} />;
      })}
    </Paper>
  );
};

export default compose<ComponentType<BoardProps>>(withStyles(styles))(Board);
