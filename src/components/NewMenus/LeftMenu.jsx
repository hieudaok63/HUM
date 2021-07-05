import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as AthumLogo } from '../../assets/athum-logo-minified.svg';
import './LeftMenu.scss';
import FloorplansSubmenu from './FloorplansSubmenu';
import ExteriorsSubmenu from './ExteriorsSubmenu';
import AmenitiesSubmenu from './AmenitiesSubmenu';

const LeftMenu = ({
  reduceLogo,
  expandedLogo,
  backgroundColor,
  floorplans,
  exterior,
  amenities
}) => {
  const [openedMenu, setOpenedMenu] = React.useState('floorplans');
  const [selectedSubmenu, setSelectedSubmenu] = React.useState('floorplans');
  const minifiedMenu = React.useRef(null);
  const menu = React.useRef(null);

  const showMenu = () => {
    minifiedMenu.current.className = 'minified-menu minified-left-fade-out';
    menu.current.className = 'menu left-fade-in';
    setTimeout(() => {
      minifiedMenu.current.className = 'hidden';
    }, 450);
  };

  const hideMenu = () => {
    if (menu.current) {
      menu.current.className = 'menu left-fade-out';
      setTimeout(() => {
        menu.current.className = 'hidden';
        minifiedMenu.current.className = 'minified-menu minified-left-fade-in';
      }, 450);
    }
  };

  const changeOpenedMenu = (newOpenedMenu) => {
    if (openedMenu === newOpenedMenu) {
      setOpenedMenu('');
    } else {
      setOpenedMenu(newOpenedMenu);
    }
  };

  return (
    <>
      <div onClick={showMenu} className="minified-menu" ref={minifiedMenu}>
        <div className="minified-menu-title">
          <h1>Explore Property</h1>
        </div>
        <div className="minified-menu-logo">
          <img src={reduceLogo} alt="Logo" />
        </div>
      </div>
      <div ref={menu} className="hidden">
        <div className="menu-header" style={{ backgroundColor }}>
          <img src={expandedLogo} alt="Logo" />
          <CloseIcon onClick={hideMenu} className="close-icon" />
        </div>
        <div className="w-100">
          <FloorplansSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            floorplans={floorplans}
            isActive={selectedSubmenu === 'floorplans'}
            setSelectedSubmenu={setSelectedSubmenu}
          />
          <ExteriorsSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            exterior={exterior}
            isActive={selectedSubmenu === 'exterior'}
            setSelectedSubmenu={setSelectedSubmenu}
          />
          <AmenitiesSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            amenities={amenities}
            isActive={selectedSubmenu === 'amenities'}
            setSelectedSubmenu={setSelectedSubmenu}
          />
        </div>
      </div>
      <AthumLogo className="athum-logo" />
    </>
  );
};

LeftMenu.propTypes = {
  reduceLogo: string.isRequired,
  expandedLogo: string.isRequired,
  backgroundColor: string,
  floorplans: arrayOf(shape({})),
  exterior: arrayOf(shape({})),
  amenities: arrayOf(shape({}))
};

LeftMenu.defaultProps = {
  backgroundColor: '#FFFFFF',
  floorplans: [],
  exterior: [],
  amenities: []
};

export default LeftMenu;
