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
import { PointsRecords } from '@Reducers/fleet';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

interface AppProps {
  rows: PointsRecords;
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
  connect((state: any): any => {
    return {
      rows: state.getIn(['fleet', 'pointsRecords']),
    };
  })
)(App);
