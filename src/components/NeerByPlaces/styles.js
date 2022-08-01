const styles = (theme) => ({
  avatarContainer: {
    height: 68,
    width: 48
  },
  avatar: {
    backgroundColor: '#FAFAFA',
    width: 48,
    height: 48,
    cursor: 'pointer',
    margin: '0 auto',
    border: '2px solid',
    [theme.breakpoints.down('md')]: {
      width: 36,
      height: 36,
      border: '1px solid'
    },
    [theme.breakpoints.down('sm')]: {
      width: 24,
      height: 24,
      border: '1px solid'
    },
    '& img': {
      objectFit: 'contain',
      width: '100%',
      height: '65%'
    },
    '&.selected': {
      backgroundColor: '#ED6B6A',
      '& img': {
        filter: 'brightness(0) invert(1)'
      }
    },
    '&:hover': {
      backgroundColor: '#ED6B6A',
      '& img': {
        filter: 'brightness(0) invert(1)'
      }
    }
  },
  avatarTitle: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5
  },
  placeTitle: {
    margin: 0,
    fontSize: 21,
    fontWeight: 'bold'
  },
  durationContainer: {
    padding: '10px 0px'
  },
  duration: {
    fontSize: 16,
    fontWeight: 300,
    '&:before': {
      color: '#4a4a4a',
      content: `&#8226`
    }
  },
  durationText: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: 16
  },
  nearbyPlacesContainer: {
    height: 'calc(100% - 360px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 226px)'
    },
    flexWrap: 'nowrap'
  },
  nearbyListContainer: {
    height: 'calc(100% - 92px)',
    marginTop: 10,
    overflowY: 'auto'
  },
  neerByList: {
    fontSize: 16,
    fontWeight: 300,
    padding: '10px 48px 16px 60px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 58px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 46px'
    }
  },
  durationIcon: {
    widht: 15,
    height: 15
  },
  noCategories: {
    marginTop: 30,
    '& h3': {
      color: '#6C6C6C',
      fontSize: 21
    },
    '& p': {
      color: '#4A4A4A',
      fontSize: 16
    }
  },
  selectedCategory: {
    padding: '5px 48px',
    [theme.breakpoints.down('md')]: {
      padding: '5px 36px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 24px'
    }
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 5
  },
  categoryButtonsContainer: {
    padding: '10px 48px 16px 48px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 36px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 24px'
    }
  },
  categoryButtonContainer: {
    width: '24%'
  },
  nearbyList: {
    fontSize: 16,
    fontWeight: 300,
    padding: '10px 48px 16px 60px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 58px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px 46px'
    }
  }
});

export default styles;
