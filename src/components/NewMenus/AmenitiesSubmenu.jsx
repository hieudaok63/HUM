import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func, bool } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import { ReactComponent as PanoIcon } from '../../assets/Icons/icon_360.svg';
import { ReactComponent as ImageIcon } from '../../assets/Icons/icon_image.svg';
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
  selectedAmenity,
  setGalleryIndex
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

  const loadAmenity = async (media, key) => {
    if (media.length > 0) {
      await dispatch(TourAction.selectType(media[0].type));
      await dispatch(AmenitiesActions.setAmenity(media));
      await dispatch(AmenitiesActions.setSelectedAmenity(key));
      setGalleryIndex(0);
    }

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
            {amenities.map(({ thumbnail, room, key, media }) => {
              const hasPano = media.some(({ type }) => type === 'pano');
              return (
                <div
                  key={key}
                  className="amenity"
                  onClick={() => {
                    loadAmenity(media, key);
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
                    {hasPano ? (
                      <PanoIcon className="amenity-content-icon-type" />
                    ) : (
                      <ImageIcon className="amenity-content-icon-type" />
                    )}
                    <div className="amenity-content-name">{room.en}</div>
                  </div>
                </div>
              );
            })}
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
  selectedAmenity: string.isRequired,
  setGalleryIndex: func.isRequired
};

const mapStateToProps = (state) => ({
  selectedAmenity: selectedAmenitySelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesSubmenu);
