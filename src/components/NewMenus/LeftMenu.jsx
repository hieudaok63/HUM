import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as AthumLogo } from '../../assets/athum-logo-minified.svg';
import './LeftMenu.scss';
import FloorplansSubmenu from './FloorplansSubmenu';
import ExteriorsSubmenu from './ExteriorsSubmenu';
import AmmenitiesSubmenu from './AmmenitiesSubmenu';

const LeftMenu = ({
  reduceLogo,
  expandedLogo,
  backgroundColor,
  floorplans,
  exterior,
  amenities
}) => {
  const [openedMenu, setOpenedMenu] = React.useState('');
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

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const { target } = e;
      if (
        !menu.current?.contains(target) &&
        menu.current.className !== 'hidden'
      ) {
        hideMenu();
      }
    };

    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const changeOpenedMenu = (newOpenedMenu) => {
    if (openedMenu === newOpenedMenu) {
      setOpenedMenu('');
    } else {
      setOpenedMenu(newOpenedMenu);
    }
  };

  return (
    <>
      <div onMouseEnter={showMenu} className="minified-menu" ref={minifiedMenu}>
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
          />
          <ExteriorsSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            exterior={exterior}
          />
          <AmmenitiesSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            ammenities={amenities}
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
  floorplans: arrayOf(shape({})).isRequired,
  exterior: arrayOf(shape({})).isRequired,
  amenities: arrayOf(shape({})).isRequired
};

LeftMenu.defaultProps = {
  backgroundColor: '#FFFFFF'
};

export default LeftMenu;
