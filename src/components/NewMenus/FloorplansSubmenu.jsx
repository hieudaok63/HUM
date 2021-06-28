import React from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import './LeftMenu.scss';

const FloorplansSubmenu = ({ openedMenu, changeOpenedMenu, floorplans }) => {
  const [isOpen, setIsOpen] = React.useState(openedMenu === 'floorplans');
  const amenitiesSize = {
    1: { show: 'show-submenu', hide: 'hide-submenu' },
    2: { show: 'show-submenu-2', hide: 'hide-submenu-2' },
    3: { show: 'show-submenu-3', hide: 'hide-submenu-3' }
  };
  const submenu = React.useRef(null);
  const showSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[floorplans.length]
        ? amenitiesSize[floorplans.length].show
        : amenitiesSize[3].show
    }`;
    setIsOpen(true);
  };

  const hideSubmenu = () => {
    submenu.current.className = `submenu-container ${
      amenitiesSize[floorplans.length]
        ? amenitiesSize[floorplans.length].hide
        : amenitiesSize[3].hide
    }`;
    setTimeout(() => {
      submenu.current.className = 'hidden';
      setIsOpen(false);
    }, 450);
  };

  React.useEffect(() => {
    if (openedMenu !== 'floorplans' && isOpen) {
      hideSubmenu();
    }
  }, [openedMenu]);

  return (
    <>
      {floorplans.length > 0 && (
        <div className="w-100">
          <div
            onClick={() => {
              changeOpenedMenu('floorplans');
              if (openedMenu === 'floorplans') {
                hideSubmenu();
              } else {
                showSubmenu();
              }
            }}
            className="menu-item"
          >
            Floorplans{' '}
            <DropdownIcon
              className={`dropdown-icon ${isOpen && 'dropdown-icon-inverted'}`}
            />
          </div>
          <div ref={submenu} className="hidden">
            {floorplans.map(
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
                const { modes } = uses.find(({ key }) => defaultUse === key)[
                  defaultStyle
                ];
                const { day } = modes;
                const { measure, unit } = area;
                return (
                  <div key={floorPlanId} className="floorplan">
                    <img src={day} alt={displayName} className="w-100" />
                    <div className="floorplan-content">
                      <div className="floorplan-content-name">
                        {displayName}
                      </div>
                      <div className="floorplan-content-features">
                        <BedroomIcon className="floorplan-content-features-icon" />
                        <div className="floorplan-content-features-value">
                          {bedrooms}
                        </div>
                        <BathroomIcon className="floorplan-content-features-icon" />
                        <div className="floorplan-content-features-value">
                          {bathrooms}
                        </div>
                        <CarIcon className="floorplan-content-features-icon" />
                        <div className="floorplan-content-features-value">
                          {parking}
                        </div>
                        <AreaIcon className="floorplan-content-features-icon" />
                        <div className="floorplan-content-features-value">
                          {`${measure} ${unit}`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

FloorplansSubmenu.propTypes = {
  openedMenu: string.isRequired,
  changeOpenedMenu: func.isRequired,
  floorplans: arrayOf(shape({})).isRequired
};

export default FloorplansSubmenu;
