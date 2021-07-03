import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func, bool } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';
import TourAction from '../../stores/tour/actions';
import AmenitiesActions from '../../stores/amenities/actions';
import { selectedAmenitySelector } from '../../selectors/Amenities';

const AmenitiesSubmenu = ({
  openedMenu,
  changeOpenedMenu,
  amenities,
  isActive,
  setSelectedSubmenu,
  dispatch,
  selectedAmenity
}) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'amenities');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[amenities.length]
        ? amenitiesSize[amenities.length].show
        : amenitiesSize[3].show
    }`;
    setIsOpen(true);
  };

  const hideSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[amenities.length]
        ? amenitiesSize[amenities.length].hide
        : amenitiesSize[3].hide
    }`;
    setTimeout(() => {
      submenu.current.className = 'hidden';
      setIsOpen(false);
    }, 450);
  };

  const loadAmenity = async (type, media, key) => {
    await dispatch(TourAction.selectType(type));
    if (type === '2d') {
      if (media.length > 0) {
        await dispatch(AmenitiesActions.setAmenityImage(media[0].image));
      }
    }

    if (type === 'pano') {
      if (media.length > 0) {
        await dispatch(AmenitiesActions.setAmenityImage(media[0].image));
        await dispatch(AmenitiesActions.createPanorama());
      }
    }
    await dispatch(AmenitiesActions.setSelectedAmenity(key));
    setSelectedSubmenu('amenities');
  };

  React.useEffect(() => {
    if (openedMenu !== 'amenities' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  return (
    <>
      {amenities.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu('amenities');
              if (openedMenu === 'amenities') {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            Amenities{' '}
            <DropdownIcon
              className={`dropdown-icon ${!isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {amenities.map(({ thumbnail, room, key, type, media }) => (
              <div
                key={key}
                className="amenity"
                onClick={() => {
                  loadAmenity(type, media, key);
                }}
              >
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={key}
                    className="w-100 amenity-thumbnail"
                  />
                )}
                <div
                  className={`amenity-content ${selectedAmenity === key &&
                    isActive &&
                    'amenity-content-active'}`}
                >
                  {selectedAmenity === key && (
                    <div className="amenity-content-active-indicator" />
                  )}
                  <div className="amenity-content-name">{room.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

AmenitiesSubmenu.propTypes = {
  dispatch: func.isRequired,
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  amenities: arrayOf(shape({})).isRequired,
  isActive: bool.isRequired,
  setSelectedSubmenu: func.isRequired,
  selectedAmenity: string.isRequired
};

const mapStateToProps = (state) => ({
  selectedAmenity: selectedAmenitySelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesSubmenu);
