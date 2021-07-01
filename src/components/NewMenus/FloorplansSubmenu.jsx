import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func, number, bool } from 'prop-types';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';
import { selectedFloorplanSelector } from '../../selectors/Tour';
import TourAction from '../../stores/tour/actions';
import PanoramaAction from '../../stores/panorama/actions';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import AmenitiesActions from '../../stores/amenities/actions';

const FloorplansSubmenu = ({
  openedMenu,
  changeOpenedMenu,
  floorplans,
  selectedFloorplan,
  isActive,
  setSelectedSubmenu,
  dispatch
}) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'floorplans');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[floorplans.length]
        ? amenitiesSize[floorplans.length].show
        : amenitiesSize[3].show
    }`;
    setIsOpen(true);
  };

  const hideSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[floorplans.length]
        ? amenitiesSize[floorplans.length].hide
        : amenitiesSize[3].hide
    }`;
    setTimeout(() => {
      submenu.current.className = 'hidden';
      setIsOpen(false);
    }, 450);
  };

  React.useEffect(() => {
    if (openedMenu !== 'floorplans' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  const setSelectedFloorplan = async (floorplan) => {
    await dispatch(TourAction.selectType('three-sixty'));
    await dispatch(AmenitiesActions.reset());
    await dispatch(TourAction.selectFloorplan(floorplan));
    await dispatch(PanoramaAction.destroyPanorama());
    await dispatch(ThreeSixtyAction.setThreeSixtyData());
    const panoramaInfo = await dispatch(PanoramaAction.createPanoramaInfo());

    if (!panoramaInfo.isError) {
      await dispatch(PanoramaAction.setPanorama());
    }

    setSelectedSubmenu('floorplans');
  };

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
            Floorplans{' '}
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
                    {selectedFloorplan === i && (
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
  setSelectedSubmenu: func.isRequired
};

const mapStateToProps = (state) => ({
  selectedFloorplan: selectedFloorplanSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorplansSubmenu);
