import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func, number, bool } from 'prop-types';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';
import {
  floorplansSectionNameSelector,
  selectedFloorplanSelector
} from '../../selectors/Tour';
import TourAction from '../../stores/tour/actions';
import PanoramaAction from '../../stores/panorama/actions';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import AmenitiesActions from '../../stores/amenities/actions';
import { ThreeSixty } from '@material-ui/icons';
import { debounce } from 'lodash';

const INTERVAL = 1000;

const FloorplansSubmenu = ({
  openedMenu,
  changeOpenedMenu,
  floorplans,
  selectedFloorplan,
  isActive,
  setSelectedSubmenu,
  dispatch,
  floorplansSectionName
}) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'floorplans');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    if (submenu.current !== null) {
      submenu.current.className = `submenu-container ${
        amenitiesSize[floorplans.length]
          ? amenitiesSize[floorplans.length].show
          : amenitiesSize[3].show
      }`;
      setIsOpen(true);
    }
  };

  const hideSubmenu = () => {
    if (submenu.current !== null) {
      submenu.current.className = `submenu-container ${
        amenitiesSize[floorplans.length]
          ? amenitiesSize[floorplans.length].hide
          : amenitiesSize[3].hide
      }`;
      setTimeout(() => {
        submenu.current.className = 'hidden';
        setIsOpen(false);
      }, 450);
    }
  };

  React.useEffect(() => {
    showSubmenu();
  }, []);

  React.useEffect(() => {
    if (openedMenu !== 'floorplans' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu, submenu.current]);

  const setSelectedFloorplan = React.useCallback(
    debounce(
      async (floorplan) => {
        await dispatch(ThreeSixtyAction.changingFloorplanFromMenu(true));
        await dispatch(TourAction.selectType('three-sixty'));
        await dispatch(AmenitiesActions.reset());
        await dispatch(TourAction.selectFloorplan(floorplan));
        await dispatch(ThreeSixtyAction.setThreeSixtyData());
        setSelectedSubmenu('floorplans');
      },
      INTERVAL,
      { leading: true, trailing: false, maxWait: INTERVAL }
    ),
    []
  );

  return (
    <>
      {floorplans.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu('floorplans');
              if (openedMenu === 'floorplans') {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            {floorplansSectionName}{' '}
            <DropdownIcon
              className={`dropdown-icon ${!isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {floorplans.map(
              (
                {
                  displayName,
                  floorPlanId,
                  bedrooms,
                  bathrooms,
                  parking,
                  area,
                  unit,
                  thumbnail
                },
                i
              ) => (
                <div
                  key={floorPlanId}
                  className="floorplan"
                  onClick={() => {
                    setSelectedFloorplan(i);
                  }}
                >
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt={displayName}
                      className="w-100 floorplan-thumbnail"
                    />
                  )}
                  <div
                    className={`floorplan-content ${selectedFloorplan === i &&
                      isActive &&
                      'floorplan-content-active'}`}
                  >
                    {selectedFloorplan === i && isActive && (
                      <div className="floorplan-content-active-indicator" />
                    )}
                    <div className="floorplan-content-name">{displayName}</div>
                    <div className="floorplan-content-features">
                      {bedrooms && (
                        <>
                          <BedroomIcon className="floorplan-content-features-icon" />
                          <div className="floorplan-content-features-value">
                            {bedrooms}
                          </div>
                        </>
                      )}
                      {bathrooms && (
                        <>
                          <BathroomIcon className="floorplan-content-features-icon" />
                          <div className="floorplan-content-features-value">
                            {bathrooms}
                          </div>
                        </>
                      )}
                      {parking && (
                        <>
                          <CarIcon className="floorplan-content-features-icon" />
                          <div className="floorplan-content-features-value">
                            {parking}
                          </div>
                        </>
                      )}
                      {area && unit && (
                        <>
                          <AreaIcon className="floorplan-content-features-icon" />
                          <div className="floorplan-content-features-value">
                            {`${area} ${unit}`}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

FloorplansSubmenu.propTypes = {
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired,
  selectedFloorplan: number.isRequired,
  dispatch: func.isRequired,
  isActive: bool.isRequired,
  setSelectedSubmenu: func.isRequired,
  floorplansSectionName: string.isRequired
};

const mapStateToProps = (state) => ({
  selectedFloorplan: selectedFloorplanSelector(state),
  floorplansSectionName: floorplansSectionNameSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorplansSubmenu);
