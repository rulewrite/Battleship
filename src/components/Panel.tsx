import React, { ComponentType } from 'react';
import { compose } from 'redux';
import {
  withStyles,
  Paper,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({ paper: { padding: theme.spacing(2) } });

type PanelProps = WithStyles<typeof styles>;

const Panel: ComponentType<PanelProps> = ({ classes, children }) => {
  return <Paper className={classes.paper}>{children}</Paper>;
};

export default compose(withStyles(styles))(Panel);
