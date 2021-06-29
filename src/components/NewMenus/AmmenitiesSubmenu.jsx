import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';

const AmmenitiesSubmenu = ({ openedMenu, changeOpenedMenu, ammenities }) => {
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
            {ammenities.map(({ thumbnail, room, key }) => (
              <div key={key} className="ammenity">
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

AmmenitiesSubmenu.propTypes = {
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  ammenities: arrayOf(shape({})).isRequired
};

export default AmmenitiesSubmenu;
