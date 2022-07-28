import { InputBase } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const CustomMobileFilterSelectInput = withStyles(() =>
  createStyles({
    root: {
      width: '100%'
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#ededed',
      border: 'none',
      fontSize: 14,
      padding: '6.5px 12px',
      width: '100%',
      marginTop: 5
    }
  })
)(InputBase);

export default CustomMobileFilterSelectInput;
