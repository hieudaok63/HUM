import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';
import TourAction from '../../stores/tour/actions';
import AmenitiesActions from '../../stores/amenities/actions';

const AmmenitiesSubmenu = ({
  openedMenu,
  changeOpenedMenu,
  ammenities,
  dispatch
}) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'ammenities');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[ammenities.length]
        ? amenitiesSize[ammenities.length].show
        : amenitiesSize[3].show
    }`;
    setIsOpen(true);
  };

  const hideSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[ammenities.length]
        ? amenitiesSize[ammenities.length].hide
        : amenitiesSize[3].hide
    }`;
    setTimeout(() => {
      submenu.current.className = 'hidden';
      setIsOpen(false);
    }, 450);
  };

  const loadAmenitie = async (type, images) => {
    await dispatch(TourAction.selectType(type));
    if (type === '2d') {
      if (images.length > 0) {
        await dispatch(AmenitiesActions.setAmenitieImage(images[0].image));
      }
    }
  };

  React.useEffect(() => {
    if (openedMenu !== 'ammenities' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  return (
    <>
      {ammenities.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu('ammenities');
              if (openedMenu === 'ammenities') {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            Ammenities{' '}
            <DropdownIcon
              className={`dropdown-icon ${!isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {ammenities.map(({ thumbnail, room, key, type, images }) => (
              <div
                key={key}
                className="ammenity"
                onClick={() => {
                  loadAmenitie(type, images);
                }}
              >
                {thumbnail && (
                  <img src={thumbnail} alt={key} className="w-100" />
                )}
                <div className="ammenity-content">
                  <div className="ammenity-content-name">{room.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

AmmenitiesSubmenu.propTypes = {
  dispatch: func.isRequired,
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  ammenities: arrayOf(shape({})).isRequired
};

export default connect(null, mapDispatchToProps)(AmmenitiesSubmenu);
