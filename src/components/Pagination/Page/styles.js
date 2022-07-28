import { hexToRgb } from '../../../utils';

const styles = (theme) => {
  const tabBackgroundRGB = hexToRgb(theme.leftMenu.backgroundColor);
  return {
    pageContainer: {
      height: 'calc(100% - 40px)',
      overflow: 'auto'
    },
    fullPageContainer: {
      height: '100%',
      overflow: 'auto'
    },
    callOutPageContainer: {
      height: '100%',
      overflow: 'auto'
    },
    pageContentContainer: {
      height: '100%',
      width: '100%'
    },
    maskPageContentContainer: {
      height: '100%',
      width: '100%',
      background: `rgba(${tabBackgroundRGB[0]}, ${tabBackgroundRGB[1]}, ${tabBackgroundRGB[2]}, 0.9)`
    },
    pageContentWithBgContainer: {
      height: '100%',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.down('lg')]: {
        width: '75%'
      },
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  };
};

export default styles;
