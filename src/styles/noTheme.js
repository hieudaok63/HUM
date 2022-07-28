const styles = (theme) => ({
  pageWrapperContainer: {
    width: '100vw',
    height: '100%',
    backgroundColor: 'white'
  },
  withMenuContainer: {
    width: 'calc(100vw - 180px)',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: 'calc(100% - 50px)',
      overflow: 'auto'
    }
  },
  withCollapsedMenuContainer: {
    width: 'calc(100vw - 48px)',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      height: 'calc(100% - 50px)',
      overflow: 'auto'
    }
  },
  noMenuContainer: {
    width: '100vw',
    height: '100%'
  }
});

export default styles;
