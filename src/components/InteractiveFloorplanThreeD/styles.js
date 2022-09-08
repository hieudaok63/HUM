import { hexToRgb } from '../../utils';

const styles = () => {
  const selectedBackgroundRGB = hexToRgb('#163142');
  return {
    filters: {
      height: 54,
      marginLeft: 50
    },
    floorplansContainer: {
      width: '100%',
      height: 'calc(100% - 105px)',
      position: 'relative'
    },
    floorsContainer: {
      width: 125,
      height: '100%',
      border: 'thin solid rgba(142, 142, 142, 0.25)'
    },
    floorsAndUnitsContainer: {
      height: 'calc(100% - 40px)',
      overflow: 'auto'
    },
    svgContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
      borderTop: 'thin solid rgba(142, 142, 142, 0.25)'
    },
    mobileSvgContainer: {
      width: '100%',
      height: 'calc(100% - 60px)',
      position: 'relative'
    },
    mobileSvgPanel: {
      height: 60,
      padding: '5px 10px'
    },
    filteredFloorplansContainer: {
      width: 188,
      height: '100%',
      border: 'thin solid rgba(142, 142, 142, 0.25)'
    },
    floorplanInfoContainer: {
      width: 270,
      height: 350,
      position: 'absolute',
      zIndex: 2,
      background: ' rgba(0, 0, 0, 0.8)',
      boxShadow: '0px 1px 2px rgba(138, 138, 138, 0.5)'
    },
    overlayContainer: {
      position: 'absolute',
      zIndex: 5,
      background: 'rgba(138, 138, 138, 0.2)',
      height: '100%'
    },
    selectedFloorplanInfoContainer: {
      width: 270,
      height: 310,
      background: '#FAFAFA',
      borderRadius: 10,
      boxShadow: '0px 1px 2px rgba(138, 138, 138, 0.5)'
    },
    floorsTitleContainer: {
      fontSize: 12,
      fontWeight: 500,
      color: '#6C6C6C',
      height: 40,
      width: '100%',
      padding: 5,
      borderBottom: 'thin solid #EDEDED',
      '& p': {
        margin: 0
      }
    },
    floorContainer: {
      height: 40,
      width: '100%',
      padding: 8,
      borderBottom: 'thin solid #EDEDED',
      fontSize: 12,
      fontWeight: 300,
      color: '#6C6C6C',
      cursor: 'pointer',
      '& p': {
        margin: 0,
        '& span': {
          fontWeight: 500,
          marginRight: 15
        }
      }
    },
    selectedFloorContainer: {
      height: 40,
      width: '100%',
      padding: 8,
      background: `rgba(${selectedBackgroundRGB[0]}, ${selectedBackgroundRGB[1]}, ${selectedBackgroundRGB[2]}, 0.3)`,
      borderBottom: `thin solid #163142`,
      borderTop: `thin solid #163142`,
      fontSize: 12,
      fontWeight: 300,
      color: '#163142',
      '& p': {
        margin: 0,
        '& span': {
          fontWeight: 500,
          marginRight: 15
        }
      }
    },
    filteredFloorContainer: {
      height: 58,
      width: '100%',
      padding: 8,
      borderBottom: 'thin solid #EDEDED',
      fontSize: 12,
      fontWeight: 300,
      color: '#6C6C6C',
      cursor: 'pointer',
      '& p': {
        margin: 0,
        '& span': {
          fontWeight: 500,
          marginRight: 5
        }
      }
    },
    mobileFilteredFloorContainer: {
      height: 60,
      width: '100%',
      padding: '8px 40px',
      borderBottom: 'thin solid #EDEDED',
      fontSize: 12,
      fontWeight: 300,
      color: '#6C6C6C',
      cursor: 'pointer',
      '& p': {
        margin: 0,
        '& span': {
          fontWeight: 500,
          marginRight: 5
        }
      }
    },
    filterIcon: {
      marginRight: 5,
      height: 16,
      width: 16
    },
    floorplanThumbnail: {
      width: '95%',
      height: 185,
      objectFit: 'contain',
      margin: '8px 0px'
    },
    floorplanTitleContainer: {
      height: 48,
      background: '#3DD0AE',
      marginBottom: 5,
      padding: '0px 12px',
      '& span': {
        fontWeight: 700,
        fontSize: 20
      }
    },
    featuresContainer: {
      width: '100%',
      margin: '8px 0px',
      padding: '0px 12px'
    },
    featureContainer: {
      width: 40,
      color: '#ffffff',
      '& p': {
        margin: 0,
        fontWeight: 500,
        fontSize: 12
      }
    },
    floorplanPrice: {
      height: 54,
      marginTop: 8,
      background: '#000000',
      color: '#ffffff',
      '& p': {
        paddingLeft: 12,
        fontWeight: 400,
        fontSize: 18,
        margin: 0
      }
    },
    floorplanAvailability: {
      color: ' #3ECFAF',
      '& p': {
        paddingLeft: 12,
        fontWeight: 400,
        fontSize: '12px !important',
        margin: 0
      }
    },
    mobileOverlay: {
      position: 'absolute',
      zIndex: 4,
      width: '100%',
      height: '100%',
      background: 'white'
    },
    mobileOverlayTitleContainer: {
      width: 'calc(100% - 80px)',
      marginTop: 10,
      marginBottom: 10,
      '& p': {
        margin: 0,
        fontSize: 16,
        fontWeight: 700,
        color: '#4A4A4A'
      }
    },
    filterLabelAndFieldBed: {
      width: 105,
      marginRight: 8
    },
    filterLabelAndFieldBath: {
      width: 105,
      marginRight: 8
    },
    filterLabelAndFieldArea: {
      width: 210,
      marginRight: 8
    },
    filterLabelAndFieldPrice: {
      width: 280,
      marginRight: 8
    },
    mobileFilterLabelAndField: {
      width: 'calc(100% - 80px)',
      margin: '10px 5px'
    },
    filterLabel: {
      '& p': {
        margin: 0,
        fontSize: 14
      }
    },
    floorSelectContainer: {
      width: 'calc(100% - 80px)'
    }
  };
};

export default styles;
