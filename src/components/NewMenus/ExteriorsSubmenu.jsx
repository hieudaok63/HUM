import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';

const ExteriorsSubmenu = ({ openedMenu, changeOpenedMenu, exterior }) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'floorplans');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[exterior.length]
        ? amenitiesSize[exterior.length].show
        : amenitiesSize[3].show
    }`;
    setIsOpen(true);
  };

  const hideSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[exterior.length]
        ? amenitiesSize[exterior.length].hide
        : amenitiesSize[3].hide
    }`;
    setTimeout(() => {
      submenu.current.className = 'hidden';
      setIsOpen(false);
    }, 450);
  };

  React.useEffect(() => {
    if (openedMenu !== 'exterior' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  return (
    <>
      {exterior.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu('exterior');
              if (openedMenu === 'exterior') {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            Exteriors{' '}
            <DropdownIcon
              className={`dropdown-icon ${isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {exterior.map(({ thumbnail, room, key }) => (
              <div key={key} className="exterior">
                {thumbnail && (
                  <img src={thumbnail} alt={key} className="w-100" />
                )}
                <div className="exterior-content">
                  <div className="exterior-content-name">{room.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

ExteriorsSubmenu.propTypes = {
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  exterior: arrayOf(shape({})).isRequired
};

export default ExteriorsSubmenu;
