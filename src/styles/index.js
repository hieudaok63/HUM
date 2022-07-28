const themeStyles = (theme) => {
  console.log(theme);
  const {
    leftMenu = {
      backgroundColor: '#fafafa',
      inactiveFontColor: '#6c6c6c',
      activeFontColor: '#ec6b69',
      svgInactiveColor: '#6c6c6c',
      svgActiveColor: '#ec6b69',
      alertColor: '#ec6b69',
      svg: {
        inactive: 'brightness(0) invert(42.3%)',
        active:
          'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)'
      }
    },
    rightMenu = {
      backgroundColor: '#fafafa',
      inactiveFontColor: '#6c6c6c',
      activeFontColor: '#ec6b69',
      svgActiveColor: '#ec6b69',
      svgInactiveColor: '#6c6c6c',
      alertColor: '#ec6b69',
      inactiveTabColor: '#6c6c6c',
      tabsBackgroundColor: '#ededed',
      svg: {
        inactive: 'brightness(0) invert(42.3%)',
        active:
          'invert(65%) sepia(82%) saturate(2200%) hue-rotate(316deg) brightness(109%) contrast(70%)'
      }
    },
    fontFamily = 'Roboto'
  } = theme;
  const fontFamilies = {
    Roboto: `'Roboto', sans-serif`,
    'Nunito Sans': `'Nunito Sans', sans-serif`,
    'Titillium Web': `'Titillium Web', sans-serif`,
    Dosis: `'Dosis', sans-serif`,
    Tinos: `'Tinos', serif`
  };
  return {
    // LOGIN
    mainContainerLogin: {
      width: '100%',
      height: '100%',
      '& img': {
        height: 80,
        [theme.breakpoints.down('xs')]: {
          height: 55
        }
      }
    },
    mobileMainContainer: {
      width: '100vw',
      height: 'calc(100% - 50px)'
    },
    errorMessage: {
      height: 20,
      color: 'red',
      textAlign: 'center'
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      [theme.breakpoints.down('xs')]: {
        width: '90%'
      }
    },
    formControlLogin: {
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    forgotPasswordButton: {
      border: 'none',
      background: 'transparent'
    },
    athumLogoLogin: {
      width: 100
    },
    buttonContainerLogin: {
      [theme.breakpoints.down('xs')]: {
        marginTop: 24
      }
    },
    endAdornmentLogin: {
      position: 'absolute',
      right: 0
    },

    // LOBBY
    mainContainer: {
      width: '100%',
      height: '100%'
    },
    loaderContainer: {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 89,
      backgroundColor: 'rgba(255, 255, 255, 0.69)'
    },
    modalContainer: {
      width: 400,
      height: 200,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 32,
      '&.calc': {
        height: 203,
        '& h2': {
          color: '#4A4A4A',
          fontSize: 14,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'left'
        },
        '& p': {
          color: '#6C6C6C',
          fontSize: 14,
          fontWeight: 300
        }
      },
      '& h2': {
        color: '#6c6c6c',
        fontSize: 18,
        fontWeight: 300,
        width: '100%',
        textAlign: 'left'
      },
      [theme.breakpoints.down('sm')]: {
        width: '90vw',
        height: 200,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        background: '#fafafa',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
        outline: 'none',
        padding: 32,
        overflow: 'auto',
        '& h2': {
          color: '#6c6c6c',
          fontSize: 16,
          fontWeight: 300,
          width: '100%',
          textAlign: 'left'
        }
      }
    },
    closeIcon: {
      position: 'absolute',
      top: 10,
      right: 10
    },
    cancelButton: {
      color: '#ffffff',
      border: 'none',
      width: '40%',
      height: 40,
      outline: 'none',
      padding: '6px 12px',
      fontSize: 14,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      borderRadius: 60,
      backgroundColor: '#000000',
      '&:hover': {
        backgroundColor: '#000000'
      },
      '&:active': {
        backgroundColor: '#000000',
        outline: 'none'
      },
      '&:focus': {
        backgroundColor: '#000000',
        outline: 'none'
      }
    },
    deleteButton: {
      color: '#C8270C',
      width: '40%',
      height: 40,
      outline: 'none',
      padding: '6px 12px',
      fontSize: 14,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      borderRadius: 60,
      borderColor: '#C8270C',
      backgroundColor: 'transparent',
      '&:hover': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent'
      },
      '&:active': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      },
      '&:focus': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      }
    },
    deleteButtonCalc: {
      borderRadius: 60,
      background: '#FFFFFF',
      color: '#ED6B6A',
      textTransform: 'none',
      height: 40,
      width: 141,
      minWidth: 141,
      marginLeft: 15,
      marginRight: 5,
      border: 'none',
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      '&:focus': {
        outline: 'none'
      },
      '&.coral': {
        background: '#ED6B6A',
        color: '#FFFFFF',
        marginLeft: 10,
        '& img': {
          width: 15,
          height: 12,
          filter: 'brightness(0) invert(1)',
          marginLeft: 5
        }
      }
    },

    // LEFT MENU
    menuContainer: {
      width: 180,
      height: '100%',
      padding: '10px 0',
      backgroundColor: leftMenu.backgroundColor,
      color: leftMenu.inactiveFontColor,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
      zIndex: 99,
      '& img': {
        maxHeight: 100
      },
      '&.projects': {
        width: 180
      },
      '&.collapsed-projects': {
        width: 48
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    collapsedMenuContainer: {
      width: 48,
      height: '100%',
      padding: '10px 0',
      backgroundColor: leftMenu.backgroundColor,
      color: leftMenu.inactiveFontColor,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
      zIndex: 99,
      '& img': {
        maxHeight: 30
      },
      '&.projects': {
        width: 180
      },
      '&.collapsed-projects': {
        width: 48
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    menuItemActive: {
      fontFamily: fontFamilies[fontFamily],
      color: leftMenu.activeFontColor,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
      paddingLeft: 13,
      paddingRight: 13,
      fontWeight: 'bold',
      height: 40,
      '& img': {
        marginRight: 5
      },
      '&.sales': {
        fontSize: 14,
        margin: '0px 0px'
      }
    },
    menuItem: {
      fontFamily: fontFamilies[fontFamily],
      color: leftMenu.inactiveFontColor,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
      paddingLeft: 13,
      paddingRight: 13,
      height: 40,
      '& img': {
        marginRight: 5
      },
      '&.sales': {
        fontSize: 14,
        margin: '0px 0px'
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    logout: {
      color: leftMenu.inactiveFontColor,
      marginLeft: 29,
      marginTop: 8,
      marginBottom: 8
    },
    mobileMenuContainer: {
      height: 50,
      position: 'relative',
      backgroundColor: leftMenu.backgroundColor,
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    mobileMenuItemActive: {
      width: '60%',
      color: leftMenu.inactiveFontColor,
      display: 'flex',
      position: 'relative',
      justifyContent: 'flex-start',
      alignItems: 'center',
      '& img': {
        marginRight: 5
      }
    },
    dropdownIcon: {
      right: 5,
      filter: leftMenu.svg.inactive
    },
    mobileMenuBack: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    mobileMenu: {
      width: '100%',
      backgroundColor: leftMenu.backgroundColor,
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
      position: 'absolute',
      top: 50,
      left: 0,
      overflow: 'auto',
      zIndex: 100,
      height: 'calc(100% - 50px)'
    },
    menuIcon: {
      filter: leftMenu.svg.inactive,
      width: 20,
      height: 20,
      '&.sales': {
        width: 20,
        height: 20
      }
    },
    menuIconActive: {
      filter: leftMenu.svg.active,
      width: 20,
      height: 20,
      '&.sales': {
        width: 20,
        height: 20
      }
    },
    athumLogo: {
      width: 100,
      marginBottom: 10
    },
    brandContainer: {
      maxHeight: 'calc(100% - 60px)'
    },
    menuItemsContainer: {
      maxHeight: 'calc(100% - 100px)',
      overflow: 'auto',
      width: '100%'
    },

    // PROJECT MENU
    menuProjectItemsContainer: {
      maxHeight: '100%',
      overflow: 'auto',
      width: '100%'
    },
    menuProjectsContainer: {
      width: '100%'
    },
    menuProjectItem: {
      color: leftMenu.inactiveFontColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8,
      padding: 0,
      width: '100%',
      '& img': {
        marginRight: 5,
        marginLeft: 16
      },
      '& .icon': {
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    menuProjectsItemsContainer: {
      maxHeight: 'calc(100% - 44px)',
      overflow: 'auto',
      width: '100%',
      paddingTop: 0
    },
    userAvatarMenu: {
      borderBottom: '0.7px solid rgba(237, 237, 237, 0.3)',
      paddingBottom: '10px',
      cursor: 'pointer',
      height: 38
    },
    avatarMenu: {
      width: '100%'
    },
    projectsMenu: {
      borderBottom: '0.7px solid rgba(237, 237, 237, 0.3)',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    projectsMobileMenu: {
      display: 'none',
      borderTop: '0.7px solid rgba(237, 237, 237, 0.3)',
      paddingBottom: '10px',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        position: 'absolute',
        bottom: 0
      }
    },
    projectLogo: {
      width: 16,
      height: 18,
      objectFit: 'contain'
    },
    projectName: {
      '& span': {
        fontWeight: 'bold',
        fontSize: 14
      }
    },
    switchContainer: {
      '& .switch-properties-container': {
        fontWeight: 500,
        fontSize: 12,
        color: leftMenu.inactiveFontColor,
        height: 40,
        padding: '13px 0 13px 13px'
      },
      '& .switch-properties-current': {
        padding: '0 0 13px 13px',
        height: 40,
        fontSize: 14,
        color: leftMenu.activeFontColor,
        fontWeight: 'bold',
        '& img': {
          width: 20,
          height: 20,
          objectFit: 'contain',
          marginRight: 5
        }
      }
    },
    logosContainer: {
      borderTop: '0.7px solid rgba(237, 237, 237, 0.3)',
      paddingTop: '15px',
      '& .project': {
        height: 33
      },
      '& .athum': {
        width: 80,
        height: 33
      }
    },
    switchIcon: {
      width: 16,
      height: 16,
      marginRight: 5,
      filter: leftMenu.svg.inactive
    },

    // PRIVATE_PANEL
    privatePanelContainer: {
      height: '100%',
      width: 400,
      paddingTop: 8,
      background: rightMenu.tabsBackgroundColor,
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.15)',
      zIndex: 1,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    hiddenPrivatePanelContainer: {
      display: 'none'
    },
    mobilePrivatePanelContainer: {
      display: 'none',
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: 101,
      top: 0,
      paddingTop: 8,
      background: rightMenu.backgroundColor,
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
    tabsContainer: {
      padding: '0 8px'
    },
    activeTab: {
      background: rightMenu.backgroundColor,
      borderRadius: '6px 6px 0 0',
      color: rightMenu.activeFontColor,
      fontSize: 14,
      width: '30%',
      height: 40,
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        width: '25%'
      }
    },
    activeTabIndicator: {
      background: rightMenu.activeFontColor,
      height: 3
    },
    noTabIndicator: {
      background: rightMenu.inactiveTabColor,
      height: 3
    },
    tab: {
      background: rightMenu.inactiveTabColor,
      borderRadius: '6px 6px 0 0',
      color: rightMenu.inactiveFontColor,
      fontSize: 14,
      width: '30%',
      height: 40,
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        width: '25%'
      }
    },
    showPrivatePanelButton: {
      position: 'absolute',
      zIndex: 99,
      background: rightMenu.background,
      height: 40,
      width: 40,
      borderRadius: '6px 0 0 6px',
      top: 8,
      right: 0,
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    privatePanelButton: {
      color: rightMenu.inactiveFontColor,
      fontSize: 24,
      cursor: 'pointer'
    },
    sessionPrivatePanelButton: {
      color: rightMenu.inactiveFontColor,
      fontSize: 24,
      cursor: 'pointer'
    },
    activeSessionPrivatePanelButton: {
      color: rightMenu.activeFontColor,
      fontSize: 24,
      cursor: 'pointer'
    },
    tabContentContainer: {
      height: 'calc(100% - 40px)',
      background: rightMenu.backgroundColor,
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)'
    },
    mobilePrivatePanelMenuContainer: {
      display: 'none',
      position: 'absolute',
      right: 12,
      top: 12,
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    },
    mobilePrivatePanelMenu: {
      color: leftMenu.inactiveFontColor,
      fontSize: 24
    },
    hiddenCall: {
      display: 'none'
    },
    mobileSessionPanelOpen: {
      height: 160
    },
    mobileSessionPanel: {
      height: 40
    },
    hiddenMobilePrivatePanelMenu: {
      display: 'none'
    },
    hiddenMobilePrivatePanelContainer: {
      display: 'none'
    },
    noSelectedTabContentContainer: {
      display: 'none'
    },
    selectedTabContentContainer: {
      height: '100%'
    },
    chatBadgeIndicator: {
      top: 4,
      right: 4,
      width: 6,
      height: 6,
      borderRadius: 6,
      border: 'none',
      position: 'absolute',
      background: rightMenu.activeFontColor
    },
    sessionOptions: {
      color: rightMenu.inactiveFontColor,
      fontSize: 14,
      margin: '20px 20px 10px 20px'
    },
    sessionOptionsIcon: {
      filter: 'brightness(0) invert(42.3%)',
      width: 24,
      height: 24,
      marginRight: 5
    },
    meetingsPrivatePanelContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      color: rightMenu.inactiveFontColor,
      paddingBottom: 16,
      '& h2': {
        width: '100%',
        margin: 0,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 16,
        paddingBottom: 13
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'auto',
        maxHeight: '97%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        color: rightMenu.inactiveFontColor,
        paddingBottom: 16,
        marginBottom: 10,
        '& h2': {
          width: '100%',
          margin: 0,
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 'bold',
          paddingTop: 5,
          paddingLeft: 16,
          paddingBottom: 13
        }
      }
    },
    noMeetingsContainer: {
      backgroundColor: rightMenu.backgroundColor,
      width: '100%',
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: 17,
      '& h4': {
        fontSize: 14,
        fontWeight: 300,
        textAlign: 'center',
        marginBottom: 20,
        width: 300
      }
    },
    nextSessionClient: {
      fontWeight: 'bold'
    },
    nextMeetingContainer: {
      backgroundColor: rightMenu.backgroundColor,
      width: '100%',
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: 17,
      '& h4': {
        fontSize: 14,
        fontWeight: 300,
        textAlign: 'center',
        marginBottom: 20,
        width: 300
      }
    },
    buttonIcon: {
      marginRight: 7,
      filter: rightMenu.svg.inactive
    },
    playIcon: {
      color: rightMenu.activeFontColor
    },
    startSessionButtonText: {
      color: rightMenu.activeFontColor
    },
    meetingsListContainer: {
      width: '100%',
      height: 'auto',
      maxHeight: 400,
      overflow: 'auto',
      marginBottom: 17,
      '& h3': {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 14,
        marginTop: 24
      }
    },
    dayMeetingsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 20,
      '& p': {
        color: rightMenu.activeFontColor,
        width: '100%',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 14
      }
    },
    dayMeetingsDetail: {
      backgroundColor: rightMenu.backgroundColor,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      padding: 14
    },
    meetingIconsContainer: {
      width: 120,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '& img': {
        cursor: 'pointer'
      }
    },
    emptyIcon: {
      width: 24,
      height: 24
    },
    buttonContainer: {
      width: 220
    },
    pricesPrivatePanelContainer: {
      height: '100%',
      position: 'relative'
    },
    reducedPricesPrivatePanelContainer: {
      height: 'calc(100% - 300px)',
      [theme.breakpoints.down('xs')]: {
        height: '100%'
      }
    },
    formControl: {
      padding: 12,
      paddingBottom: 0,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    searchFormControl: {
      padding: 12,
      paddingBottom: 0,
      [theme.breakpoints.down('xs')]: {
        width: 'calc(100% - 50px)'
      }
    },
    endAdornment: {
      position: 'absolute',
      right: 0
    },
    filtersAndSorts: {
      padding: '0 12px',
      width: '100%'
    },
    layoutsDetailsContainer: {
      width: '100%',
      height: 'calc(100% - 159px)',
      overflow: 'auto',
      [theme.breakpoints.down('md')]: {
        height: 'calc(100% - 139px)'
      }
    },
    layoutPrice: {
      fontSize: 16,
      fontWeight: 300,
      color: rightMenu.inactiveFontColor
    },
    firstLayoutDetailsContainer: {
      padding: '16px 12px',
      borderBottom: '0.7px solid rgba(237, 237, 237, 0.8)',
      borderTop: '0.7px solid rgba(237, 237, 237, 0.8)'
    },
    layoutDetailsContainer: {
      padding: '16px 12px',
      borderBottom: '0.7px solid rgba(237, 237, 237, 0.8)'
    },
    unitName: {
      paddingLeft: 24,
      fontSize: 14,
      fontWeight: 'bold',
      color: rightMenu.inactiveFontColor
    },
    detailsWithIcons: {
      paddingLeft: 24,
      marginTop: 10,
      marginBottom: 10
    },
    floorplanSpecification: {
      marginRight: 10,
      fontSize: 14,
      fontWeight: 300,
      color: rightMenu.inactiveFontColor
    },
    layoutName: {
      maxWidth: '40%',
      fontSize: 14,
      fontWeight: 300,
      color: rightMenu.inactiveFontColor,
      cursor: 'pointer'
    },
    featureList: {
      paddingLeft: 40,
      margin: 0,
      '& li': {
        color: rightMenu.inactiveFontColor,
        fontSize: 14,
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 300
      }
    },
    filterSelect: {
      marginRight: 20
    },
    pricePanelIcon: {
      color: rightMenu.inactiveFontColor
    },
    pricesEditionContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      background: theme.rightMenu.backgroundColor,
      borderTop: '0.7px solid rgba(237, 237, 237, 0.8)',
      height: 65,
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        bottom: 40
      }
    },
    pricesEditionButton: {
      width: 215,
      height: 40,
      background: theme.rightMenu.backgroundColor,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.3)',
      borderRadius: 40,
      border: 'none',
      cursor: 'pointer',
      color: theme.rightMenu.activeFontColor,
      fontWeight: 'bold',
      fontSize: 14
    },
    editPrices: {
      color: theme.rightMenu.activeFontColor,
      marginRight: 10
    },
    pricesCloseButton: {
      width: 40,
      height: 40,
      background: theme.rightMenu.backgroundColor,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.3)',
      borderRadius: 40,
      border: 'none',
      cursor: 'pointer',
      color: theme.rightMenu.activeFontColor,
      fontWeight: 'bold',
      fontSize: 14
    },
    closePricesEdition: {
      color: theme.rightMenu.activeFontColor
    },
    pricesUpdateButton: {
      width: 215,
      height: 40,
      background: theme.rightMenu.activeFontColor,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.3)',
      borderRadius: 40,
      border: 'none',
      cursor: 'pointer',
      color: theme.rightMenu.backgroundColor,
      fontWeight: 'bold',
      fontSize: 14
    },
    savePrices: {
      color: theme.rightMenu.backgroundColor,
      marginRight: 10
    },
    '@keyframes fadeOut': {
      from: { opacity: 1 },
      to: { opacity: 0 }
    },
    pricesUpdated: {
      position: 'absolute',
      zIndex: 2,
      top: 10,
      background: theme.rightMenu.activeFontColor,
      width: '90%',
      padding: 10,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.3)',
      color: '#FAFAFA',
      borderRadius: 5,
      animationName: '$fadeOut',
      animationDuration: '3.2s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite'
    },
    undoIcon: {
      fontSize: 16,
      marginRight: 10,
      color: theme.rightMenu.inactiveFontColor,
      cursor: 'pointer'
    },
    disabledUndoIcon: {
      fontSize: 16,
      marginRight: 10,
      color: theme.rightMenu.inactiveFontColor,
      cursor: 'pointer',
      opacity: 0.5
    },
    pricesModalContainer: {
      background: '#FAFAFA',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      width: 410,
      height: 254,
      border: 'none',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      outline: 'none',
      padding: 20,
      [theme.breakpoints.down('sm')]: {
        width: 311,
        height: 263
      }
    },
    pricesModalContent: {
      height: '100%'
    },
    priceModalTitle: {
      color: theme.rightMenu.inactiveFontColor,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 14
    },
    priceModalParagraph: {
      color: theme.rightMenu.inactiveFontColor,
      fontSize: 16,
      fontWeight: 300,
      marginBottom: 14
    },
    successUpdateIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 40,
      border: '1px solid #68A129',
      marginBottom: 14
    },
    successUpdateIcon: {
      color: '#68A129'
    },
    modalConfirmationButton: {
      background: theme.rightMenu.backgroundColor,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      borderRadius: 60,
      color: theme.rightMenu.activeFontColor,
      fontSize: 14,
      fontWeight: 'bold',
      border: 'none',
      outline: 'none',
      height: 40,
      width: 172,
      '&:focus': {
        outline: 'none'
      }
    },
    modalCancelButton: {
      background: 'transparent',
      border: 'none',
      color: theme.rightMenu.inactiveFontColor,
      fontSize: 14,
      fontWeight: 'bold',
      outline: 'none',
      height: 40,
      '&:focus': {
        outline: 'none'
      }
    },

    // MODALS
    createMeetingModalContainer: {
      width: 950,
      height: '60vh',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: theme.rightMenu.backgroundColor,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 32,
      '& h2': {
        color: theme.rightMenu.activeFontColor,
        fontSize: 21,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
      },
      [theme.breakpoints.down('sm')]: {
        width: '90vw',
        height: '70vh'
      },
      [theme.breakpoints.down('xs')]: {
        width: '98vw',
        height: '98vh',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        background: theme.rightMenu.backgroundColor,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
        outline: 'none',
        padding: 32,
        overflow: 'auto',
        '& h2': {
          color: theme.rightMenu.activeFontColor,
          fontSize: 21,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'left'
        }
      }
    },
    createMeetingModalFormContainer: {
      height: '95%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    createMeetingModalFormControl: {
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    createdMeetingContainer: {
      height: '95%',
      '& h3': {
        fontSize: 21,
        fontWeight: 300,
        textAlign: 'center',
        width: 480
      },
      [theme.breakpoints.down('sm')]: {
        height: '95%',
        '& h3': {
          fontSize: 18,
          fontWeight: 300,
          textAlign: 'center',
          width: '100%'
        }
      }
    },
    createMeetingModalButtonContainer: {
      width: 300,
      marginBottom: 20,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    changePropertyModalContainer: {
      width: 400,
      height: 203,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 20,
      '& h2': {
        color: '#4a4a4a',
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
      },
      '& h3': {
        color: '#6c6c6c',
        fontSize: 16,
        fontWeight: 300,
        width: '100%',
        textAlign: 'left'
      },
      [theme.breakpoints.down('sm')]: {
        width: 287,
        height: 243,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        background: '#fafafa',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
        outline: 'none',
        padding: 15,
        overflow: 'auto',
        '& h2': {
          color: '#6c6c6c',
          fontSize: 16,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'left'
        },
        '& h3': {
          color: '#6c6c6c',
          fontSize: 16,
          fontWeight: 300,
          width: '100%',
          textAlign: 'left'
        }
      }
    },
    changePropertyCancelButton: {
      color: '#4a4a4a',
      border: 'none',
      width: 90,
      height: 40,
      outline: 'none',
      padding: '6px 0',
      fontSize: 14,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: '#transparent'
      },
      '&:active': {
        backgroundColor: '#transparent',
        outline: 'none'
      },
      '&:focus': {
        backgroundColor: '#transparent',
        outline: 'none'
      }
    },
    changePropertyDeleteButton: {
      color: '#C8270C',
      width: 165,
      height: 40,
      outline: 'none',
      padding: '6px 12px',
      fontSize: 14,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      borderRadius: 60,
      border: '2px solid #C8270C',
      backgroundColor: 'transparent',
      '&:hover': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent'
      },
      '&:active': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      },
      '&:focus': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      }
    },
    modalPreviewContainer: {
      width: 624,
      height: 675,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 30,
      [theme.breakpoints.down('lg')]: {
        width: 532,
        height: 575,
        padding: '35px 25px'
      },
      [theme.breakpoints.down('sm')]: {
        width: 388,
        height: 459,
        padding: '20px 15px'
      },
      [theme.breakpoints.down('xs')]: {
        width: 296,
        height: 382,
        padding: '20px 15px'
      },
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
      }
    },
    cameraSelect: {
      marginTop: 0,
      marginBottom: 0,
      justifyContent: 'space-between'
    },
    buttons: {
      width: '100%',
      marginTop: 10,
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        marginTop: 7,
        flexDirection: 'column',
        justifyContent: 'center'
      }
    },
    previewCameraContainer: {
      // height: '85%'
    },
    previewCamera: {
      height: 'calc(100% - 170px)',
      width: '100%',
      background: 'rgba(71, 71, 71, 0.69)',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      '& video': {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    },
    buttonAsLinkTop: {
      border: 'none',
      background: 'none',
      padding: '10px 0',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    buttonAsLinkBottom: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block',
        border: 'none',
        background: 'none',
        padding: '10px 0'
      }
    },
    webcamContainer: {
      marginTop: 10,
      height: 416,
      width: '100%',
      position: 'relative',
      [theme.breakpoints.down('lg')]: {
        height: 336
      },
      [theme.breakpoints.down('sm')]: {
        height: 265
      },
      [theme.breakpoints.down('xs')]: {
        height: 194
      },
      '& video': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        transform: 'scale(-1, 1)',
        borderRadius: 10
      }
    },
    flipButton: {
      position: 'absolute',
      left: 10,
      bottom: 20,
      height: 40,
      width: 40,
      background: 'rgba(71, 71, 71, 0.69)',
      backdropFilter: 'blur(10px)',
      '&:focus': {
        outline: 'none'
      }
    },
    joinVideoButtonContainer: {
      width: 235,
      [theme.breakpoints.down('sm')]: {
        width: 330
      },
      [theme.breakpoints.down('xs')]: {
        width: 250
      }
    },
    errorMobileModalContainer: {
      width: '98vw',
      height: '98vh',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 32,
      overflow: 'auto',
      textAlign: 'center',
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        width: '100%'
      },
      '& .failed': {
        width: 40,
        height: 40
      }
    },
    errorModalContainer: {
      width: 450,
      height: '50vh',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 32,
      textAlign: 'center',
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        width: '100%'
      },
      '& .failed': {
        width: 75,
        height: 75
      }
    },
    modalLeaveMeetingContainer: {
      width: 420,
      height: 335,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#fafafa',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      outline: 'none',
      padding: 32,
      '& h2': {
        color: '#4a4a4a',
        fontSize: 21,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left'
      },
      '& h3': {
        color: '#6c6c6c',
        fontSize: 21,
        fontWeight: 300,
        width: '100%',
        textAlign: 'left'
      },
      [theme.breakpoints.down('sm')]: {
        width: 287,
        height: 243,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        background: '#fafafa',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
        outline: 'none',
        padding: 15,
        overflow: 'auto',
        '& h2': {
          color: '#6c6c6c',
          fontSize: 16,
          fontWeight: 'bold',
          width: '100%',
          textAlign: 'left'
        },
        '& h3': {
          color: '#6c6c6c',
          fontSize: 16,
          fontWeight: 300,
          width: '100%',
          textAlign: 'left'
        }
      }
    },
    leaveMeetingCancelButton: {
      color: '#4a4a4a',
      border: 'none',
      width: 90,
      height: 40,
      outline: 'none',
      padding: '6px 0',
      fontSize: 14,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: '#transparent'
      },
      '&:active': {
        backgroundColor: '#transparent',
        outline: 'none'
      },
      '&:focus': {
        backgroundColor: '#transparent',
        outline: 'none'
      }
    },
    leaveMeetingDeleteButton: {
      color: '#C8270C',
      width: 165,
      height: 40,
      outline: 'none',
      padding: '6px 12px',
      fontSize: 14,
      boxShadow: '0px 2px 4px rgba(138, 138, 138, 0.5)',
      borderRadius: 60,
      border: '2px solid #C8270C',
      backgroundColor: 'transparent',
      '&:hover': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent'
      },
      '&:active': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      },
      '&:focus': {
        border: '2px solid #C8270C',
        backgroundColor: 'transparent',
        outline: 'none'
      }
    },

    // CLIENT ERROR
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 99,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#ffffff'
    },
    header: {
      height: 140,
      padding: 30,
      '& img': {
        height: 47
      },
      [theme.breakpoints.down('xs')]: {
        height: 100
      }
    },
    contentContainer: {
      height: '100%',
      position: 'absolute',
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      '& p': {
        fontWeight: 300,
        fontSize: 21
      }
    },
    contentFullContainer: {
      width: '85%',
      [theme.breakpoints.down('xs')]: {
        height: 'calc(100% - 100px)'
      },
      [theme.breakpoints.up('sm')]: {
        width: 408
      },
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem'
      },
      '& p': {
        textAlign: 'center',
        fontWeight: 300,
        fontSize: 21
      }
    },
    errorFormContainer: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        width: '90%',
        paddingBottom: 10
      }
    },
    fullMeetingForm: {
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      }
    },

    // FORGOT PASSWORD
    forgotPasswordMainContainer: {
      width: '100%',
      height: '100%',
      '& img': {
        height: 80,
        [theme.breakpoints.down('xs')]: {
          height: 55
        }
      }
    },
    forgotPasswordFormContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },

    // ERROR PAGE
    errorContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 99,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#ffffff',
      overflow: 'auto'
    },
    errorContentContainer: {
      [theme.breakpoints.down('xs')]: {
        height: 'calc(70% - 100px)'
      },
      '& h2': {
        color: '#ed6b6a',
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      '& p': {
        fontWeight: 300,
        fontSize: 21
      }
    },
    linksContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 120,
      '& a': {
        color: '#000000',
        fontWeight: 'bold',
        textDecoration: 'underline'
      }
    },

    // RESCHEDULE
    rescheduleContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 99,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      background: '#ffffff',
      padding: 10,
      overflow: 'auto',
      '& h2': {
        color: '#6c6c6c',
        margin: 0,
        fontSize: 24,
        fontWeight: 300,
        width: 400,
        textAlign: 'center',
        marginBottom: 34,
        marginTop: 34,
        [theme.breakpoints.down('sm')]: {
          fontSize: 21,
          width: 300,
          marginBottom: 12,
          marginTop: 12
        }
      },
      '& p': {
        color: '#4a4a4a',
        margin: 0,
        fontSize: 18,
        fontWeight: 300,
        width: 300,
        marginBottom: 24,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
          marginBottom: 12,
          padding: '0 40px'
        }
      },
      '& img': {
        width: 130,
        objectFit: 'contain'
      }
    },
    rescheduleFormContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
      width: '90%',
      [theme.breakpoints.up('sm')]: {
        width: 300
      }
    },
    formControlContainer: {
      width: '100%'
    },
    rescheduleButtonContainer: {
      marginTop: 36,
      marginBottom: 36,
      [theme.breakpoints.up('sm')]: {
        width: 300
      }
    },
    rescheduleAthumLogo: {
      width: 100,
      maxHeight: 100
    },

    // SETTINGS
    settingsMainContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      paddingTop: '1.5vh',
      position: 'relative'
    },
    settingsErrorMessage: {
      height: 20,
      marginBottom: 10,
      color: 'red',
      textAlign: 'center'
    },
    correctMessage: {
      height: 20,
      marginBottom: 10,
      color: 'green',
      textAlign: 'center'
    },
    settingsFormContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    settingsButtonContainer: {
      width: 300,
      [theme.breakpoints.down('xs')]: {
        width: '90%'
      }
    },
    settingsFormControl: {
      width: 300,
      [theme.breakpoints.down('xs')]: {
        width: '90%'
      }
    },

    // SHARED SESSION
    sharedSessionContainer: {
      color: theme.content.inactiveFontColor,
      width: 'calc(100% - 400px)',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: theme.content.backgroundColor,
      overflow: 'hidden',
      '& h2': {
        width: '100%',
        margin: 0,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 16,
        paddingBottom: 13
      },
      '&.active': {
        border: '3px solid #68a129'
      },
      [theme.breakpoints.down('sm')]: {
        color: theme.content.inactiveFontColor,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.content.backgroundColor,
        marginBottom: 10,
        overflow: 'hidden',
        '& h2': {
          width: '100%',
          margin: 0,
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 'bold',
          paddingTop: 5,
          paddingLeft: 16,
          paddingBottom: 13
        },
        '&.active': {
          width: '98%',
          height: 'calc(100% - 40px)',
          border: '3px solid #68a129'
        },
        '&.inCall': {
          height: 'calc(100% - 160px)'
        }
      }
    },
    fullSharedSessionContainer: {
      color: theme.content.inactiveFontColor,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: theme.content.backgroundColor,
      overflow: 'hidden',
      '& h2': {
        width: '100%',
        margin: 0,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingLeft: 16,
        paddingBottom: 13
      },
      '&.active': {
        border: '3px solid #68a129'
      },
      [theme.breakpoints.down('sm')]: {
        color: theme.content.inactiveFontColor,
        width: '98%',
        height: 'calc(97% - 85px)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.content.backgroundColor,
        marginBottom: 10,
        overflow: 'hidden',
        '& h2': {
          width: '100%',
          margin: 0,
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 'bold',
          paddingTop: 5,
          paddingLeft: 16,
          paddingBottom: 13
        },
        '&.active': {
          border: '3px solid #68a129'
        },
        '&.noCall': {
          height: 'calc(97% - 30px)'
        }
      }
    },
    sharedSessionContentContainer: {
      height: '100%'
    },
    sharedSessionTabsContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 48,
      background: theme.content.tabsBackgroundColor
    },
    sharedSessionTabContentContainer: {
      position: 'relative',
      height: 'calc(100% - 48px)'
    },
    subSectionContainer: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    layoutSubSectionContainer: {
      width: '100%',
      height: 'calc(100% - 50px)',
      position: 'relative'
    },
    noTabsContainer: {
      height: '100%'
    },
    buttonsContainer: {
      padding: '10px 48px 16px 48px',
      [theme.breakpoints.down('md')]: {
        padding: '10px 36px'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '10px 24px'
      }
    },
    backAndTitleContainer: {
      width: 'auto'
    },
    title: {
      margin: 0,
      fontSize: 21,
      fontWeight: 'bold',
      color: theme.content.activeFontColor
    },
    icon: {
      fontSize: 30,
      cursor: 'pointer',
      color: theme.content.inactiveFontColor
    },
    backButton: {
      background: '#FAFAFA',
      boxShadow: '0px 1px 2px rgba(138, 138, 138, 0.5)',
      borderRadius: 20,
      width: 90,
      height: 40,
      position: 'absolute',
      top: 5,
      left: 5,
      zIndex: 1,
      cursor: 'pointer',
      color: '#4a4a4a',
      fontSize: 14
    },
    backIcon: {
      color: '#4a4a4a',
      fontSize: 20
    },
    toggleMenuIcon: {
      color: theme.leftMenu.inactiveFontColor
    }
  };
};

export default themeStyles;
