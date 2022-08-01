export default (theme) => {
  const {
    content = {
      backgroundColor: '#fafafa',
      inactiveFontColor: '#6c6c6c',
      activeFontColor: '#ec6b69',
      highlightColor: '#ec6b69',
      alertColor: '#ec6b69',
      svg: {
        inactive: 'brightness(0) invert(42.3%)',
        active:
          'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)'
      }
    }
  } = theme;
  return {
    mapContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: content.backgroundColor,
      flexWrap: 'nowrap',
      overflow: 'hidden'
    },
    map: {
      width: '100%',
      height: 310,
      marginBottom: 10,
      [theme.breakpoints.down('md')]: {
        height: 280
      },
      [theme.breakpoints.down('sm')]: {
        height: 170
      }
    }
  };
};
