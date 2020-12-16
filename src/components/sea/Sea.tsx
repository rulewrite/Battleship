import { Button, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const Sea = withStyles(() => {
  return {
    root: {
      borderRight: '1px solid white',
      borderRadius: 0,
      backgroundColor: blue[300],
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  };
})(Button);

export default Sea;
