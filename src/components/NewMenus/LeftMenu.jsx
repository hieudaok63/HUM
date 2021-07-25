import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as AthumLogo } from '../../assets/athum-logo-minified.svg';
import './LeftMenu.scss';
import FloorplansSubmenu from './FloorplansSubmenu';
import AmenitiesSubmenu from './AmenitiesSubmenu';

const LeftMenu = ({
  reduceLogo,
  expandedLogo,
  backgroundColor,
  closeButtonColor: color,
  floorplans,
  setGalleryIndex,
  sections,
  infoPage
}) => {
  const [menuWasOpened, setMenuWasOpened] = React.useState(false);
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

  const handleyKeyUp = React.useCallback((e) => {
    const { key, code } = e;
    if (key === 'Escape' && code === 'Escape') {
      if (menu.current.className === 'menu left-fade-in') {
        hideMenu();
      } else {
        showMenu();
      }
    }
  });

  React.useEffect(() => {
    document.addEventListener('keyup', handleyKeyUp);

    return () => {
      document.removeEventListener('keyup', handleyKeyUp);
    };
  }, []);

  React.useEffect(() => {
    if (infoPage && minifiedMenu.current.className === 'hidden') {
      hideMenu();
      setMenuWasOpened(true);
    } else if (menuWasOpened) {
      showMenu();
      setMenuWasOpened(false);
    }
  }, [infoPage]);

  return (
    <>
      <div
        onClick={showMenu}
        className="minified-menu minified-left-fade-in delay-menu"
        ref={minifiedMenu}
      >
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
          <CloseIcon
            onClick={hideMenu}
            className="close-icon"
            style={{ color }}
          />
        </div>
        <div className="w-100">
          <FloorplansSubmenu
            openedMenu={openedMenu}
            changeOpenedMenu={changeOpenedMenu}
            floorplans={floorplans}
            isActive={selectedSubmenu === 'floorplans'}
            setSelectedSubmenu={setSelectedSubmenu}
          />
          {sections.map((section) => (
            <AmenitiesSubmenu
              key={section.key}
              openedMenu={openedMenu}
              changeOpenedMenu={changeOpenedMenu}
              amenities={section}
              isActive={selectedSubmenu === section.key}
              setSelectedSubmenu={setSelectedSubmenu}
              setGalleryIndex={setGalleryIndex}
              identifier={section.key}
            />
          ))}
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
  closeButtonColor: string,
  floorplans: arrayOf(shape({})),
  sections: arrayOf(shape({})),
  setGalleryIndex: func.isRequired,
  infoPage: shape({})
};

LeftMenu.defaultProps = {
  backgroundColor: '#FFFFFF',
  closeButtonColor: '#000000',
  floorplans: [],
  sections: [],
  infoPage: null
};

export default LeftMenu;
