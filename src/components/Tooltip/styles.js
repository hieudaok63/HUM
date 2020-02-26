import { createStyles } from '@material-ui/core/styles';

const styles = (theme) =>
  createStyles({
    tooltipBody: {
      backgroundColor: '#fff',
      minWidth: '290px',
      maxWidth: '420px',
      position: 'relative',
      borderRadius: 6,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'column'
    },
    tooltipTitle: {
      color: '#f04',
      padding: '20px',
      margin: 0
    },
    tooltipContent: {
      color: '#000',
      paddingLeft: '20px',
      paddingRight: '20px',
      '& p': {
        fontFamily: 'Roboto',
        fontSize: '20px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.14',
        letterSpacing: 'normal',
        color: '#4a4a4a'
      }
    },
    tooltipFooter: {
      backgroundColor: '#fff',
      display: 'flex',
      padding: 5,
      borderRadius: 6,
      width: '100%',
      alignItems: 'center'
    },
    leftButton: {
      background: 'none',
      border: 'none',
      textTransform: 'uppercase',
      color: '#999',
      marginRight: 0,
      padding: '1.1rem',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        outline: 'none'
      },
      '&:active': {
        outline: 'none'
      }
    },
    rightButton: {
      background: 'none',
      border: 'none',
      textTransform: 'uppercase',
      color: '#ed6c6b',
      marginRight: 0,
      padding: '1.1rem',
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        outline: 'none'
      },
      '&:active': {
        outline: 'none'
      }
    },
    tooltipClose: {
      position: 'absolute',
      top: 5,
      right: 5,
      outline: 'none',
      cursor: 'pointer',
      '&:hover': {
        outline: 'none'
      },
      '&:active': {
        outline: 'none'
      }
    }
  });

export default styles;
