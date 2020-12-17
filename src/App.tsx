import React from 'react';
import {
  Container,
  createStyles,
  Grid,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Cell, Sea } from '@Components';
import { compose } from 'redux';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

const App = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <Container component="main" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Cell>A</Cell>
        </Grid>

        <Grid item xs={6}>
          <Sea>B</Sea>
        </Grid>
      </Grid>
    </Container>
  );
};

export default compose(withStyles(styles))(App);
