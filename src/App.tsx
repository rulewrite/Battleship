import React, { ComponentType } from 'react';
import {
  Container,
  createStyles,
  Grid,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Board, Sea } from '@Components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RowFactory, Rows } from '@Components/Board';
import { PointsRecords } from '@Reducers/fleet';
import { List } from 'immutable';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

interface AppProps {
  rows: Rows;
}

const App = ({ classes, rows }: WithStyles<typeof styles> & AppProps) => {
  return (
    <Container component="main" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Board rows={rows} />
        </Grid>

        <Grid item xs={6}>
          <Sea>B</Sea>
        </Grid>
      </Grid>
    </Container>
  );
};

export default compose<ComponentType>(
  withStyles(styles),
  connect(
    (state: any): AppProps => {
      const pointsRecords: PointsRecords = state.getIn([
        'fleet',
        'pointsRecords',
      ]);

      if (!pointsRecords) {
        return {
          rows: List([]),
        };
      }

      return {
        rows: pointsRecords.map((pointsRecord) => {
          return RowFactory({
            key: pointsRecord.get('key'),
            cells: pointsRecord.get('points'),
          });
        }),
      };
    }
  )
)(App);
