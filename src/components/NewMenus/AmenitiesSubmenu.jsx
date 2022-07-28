import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { string, shape, func, bool } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import { ReactComponent as PanoIcon } from '../../assets/Icons/icon_360.svg';
import { ReactComponent as ImageIcon } from '../../assets/Icons/icon_image.svg';
import { ReactComponent as VideoIcon } from '../../assets/Icons/icon-play.svg';
import './LeftMenu.scss';
import TourAction from '../../stores/tour/actions';
import AmenitiesActions from '../../stores/amenities/actions';
import { selectedAmenitySelector } from '../../selectors/Amenities';
import { languageSelector } from '../../selectors/ThreeSixty';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

const AmenitiesSubmenu = ({
  openedMenu,
  changeOpenedMenu,
  amenities,
  isActive,
  setSelectedSubmenu,
  dispatch,
  selectedAmenity,
  setGalleryIndex,
  language,
  identifier,
  hideMenu
}) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'identifier');
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

  const loadAmenity = async (media, key, item) => {
    if (key === 'availability') {
      hideMenu();
    }
    await dispatch(AmenitiesActions.setSelectedAmenity(key));
    await dispatch(AmenitiesActions.setSelectedContent(item));
    await dispatch(ThreeSixtyAction.reset());
    if (media?.length > 0) {
      setGalleryIndex(0);
      await dispatch(TourAction.selectType(media[0].type));
      await dispatch(AmenitiesActions.setAmenity(media));
    } else {
      await dispatch(TourAction.selectType(item.type));
      await dispatch(AmenitiesActions.setAmenity([]));
    }

    setSelectedSubmenu(identifier);
  };

  React.useEffect(() => {
    if (openedMenu !== identifier && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  React.useEffect(() => {
    setGalleryIndex(0);
  }, [selectedAmenity]);

  const { content = [], name = {} } = amenities;

  const currentContent = useMemo(
    () => (Array.isArray(content) ? [...content] : [{ ...content }]),
    [content]
  );

  return (
    <>
      {currentContent.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu(identifier);
              if (openedMenu === identifier) {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            {name[language]}{' '}
            <DropdownIcon
              className={`dropdown-icon ${!isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {currentContent.map((item) => {
              const { thumbnail, room, key, media } = item;
              const hasPano = media?.some(({ type }) => type === 'pano');
              const hasImage = media?.some(({ type }) => type === '2d');
              const hasVideo = media?.some(({ type }) => type === 'video');
              return (
                <div
                  key={key}
                  className="amenity"
                  onClick={() => {
                    loadAmenity(media, key, item);
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
                    <div className="amenity-content-icons">
                      {hasVideo && (
                        <VideoIcon className="amenity-content-icon-type" />
                      )}
                      {hasPano && (
                        <PanoIcon className="amenity-content-icon-type" />
                      )}
                      {hasImage && (
                        <ImageIcon className="amenity-content-icon-type" />
                      )}
                    </div>
                    {room && (
                      <div className="amenity-content-name">
                        {room[language]}
                      </div>
                    )}
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
  amenities: shape({}).isRequired,
  isActive: bool.isRequired,
  setSelectedSubmenu: func.isRequired,
  selectedAmenity: string.isRequired,
  setGalleryIndex: func.isRequired,
  language: string.isRequired,
  identifier: string.isRequired,
  hideMenu: func.isRequired
};

const mapStateToProps = (state) => ({
  selectedAmenity: selectedAmenitySelector(state),
  language: languageSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AmenitiesSubmenu);
