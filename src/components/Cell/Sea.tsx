import CellBase from './CellBase';
import { withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const Sea = withStyles({
  root: {
    border: '1px solid white',
    backgroundColor: blue[300],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
})(CellBase);

export default Sea;
