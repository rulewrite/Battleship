import { Button, withStyles } from '@material-ui/core';

const Cell = withStyles({
  root: {
    borderRadius: 0,
    width: '100%',
    minWidth: 'initial',
  },
})(Button);

export default Cell;
