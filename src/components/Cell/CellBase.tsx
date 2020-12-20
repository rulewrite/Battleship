import { Button, withStyles } from '@material-ui/core';

const CellBase = withStyles({
  root: {
    width: '100%',
    minWidth: 'initial',
  },
})(Button);

export default CellBase;
