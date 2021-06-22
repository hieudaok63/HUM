import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as AthumLogo } from '../../assets/athum-logo-minified.svg';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import './LeftMenu.scss';

const LeftMenu = ({
  reduceLogo,
  expandedLogo,
  backgroundColor,
  floorplans
  //   amenities,
  //   exterior
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
        <div>
          {floorplans.length > 0 && (
            <div>
              <div onClick={() => setOpenedMenu('floorplans')}>Floorplans</div>
              {openedMenu === 'floorplans' &&
                floorplans.map(
                  ({
                    displayName,
                    floorPlanId,
                    levels,
                    defaultStyle,
                    bedrooms,
                    bathrooms,
                    parking,
                    area
                  }) => {
                    const { scenes } = levels[0];
                    const { defaultUse, uses } = scenes[0];
                    const { modes } = uses.find(
                      ({ key }) => defaultUse === key
                    )[defaultStyle];
                    const { day } = modes;
                    const { measure, unit } = area;
                    return (
                      <div key={floorPlanId}>
                        <img
                          src={day}
                          alt={displayName}
                          style={{ maxWidth: '100%' }}
                        />
                        <div>
                          <div>{displayName}</div>
                          <div style={{ display: 'flex' }}>
                            <BedroomIcon />
                            <div style={{ margin: '0 10px' }}>{bedrooms}</div>
                            <BathroomIcon />
                            <div style={{ margin: '0 10px' }}>{bathrooms}</div>
                            <CarIcon />
                            <div style={{ margin: '0 10px' }}>{parking}</div>
                            <AreaIcon />
                            <div style={{ margin: '0 10px' }}>
                              {`${measure} ${unit}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          )}
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
  floorplans: arrayOf(shape({})).isRequired
  //   amenities: arrayOf(shape({})).isRequired,
  //   exterior: arrayOf(shape({})).isRequired
};

LeftMenu.defaultProps = {
  backgroundColor: '#FFFFFF'
};

export default LeftMenu;
