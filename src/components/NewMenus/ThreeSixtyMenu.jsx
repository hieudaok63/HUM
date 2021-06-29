import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { ReactComponent as LightIcon } from '../../assets/Icons/icon_light.svg';
import { ReactComponent as SettingsIcon } from '../../assets/Icons/icon_settings.svg';
import { ReactComponent as StylesIcon } from '../../assets/Icons/icon_styles.svg';
import { ReactComponent as EyeIcon } from '../../assets/Icons/icon_eye.svg';
import './ActionsMenu.scss';

const ThreeSixtyMenu = ({ styles, showSubmenu, setShowSubmenu }) => (
  <>
    <div className="menu-action secondary-action light-action" disabled>
      <LightIcon className="light-icon" />
    </div>
    <div className="menu-action secondary-action settings-action">
      <SettingsIcon className="settings-icon" />
    </div>
    <div
      className={`${showSubmenu === 'styles' &&
        'menu-action-active'} menu-action secondary-action styles-action`}
      onClick={() => {
        setShowSubmenu('styles');
      }}
    >
      <StylesIcon className="styles-new-icon" />
      {showSubmenu === 'styles' && (
        <div className="menu-action-submenu">
          {styles.map(({ key, name }) => (
            <div
              key={key}
              className="menu-action-submenu-option"
              onClick={(e) => {
                e.stopPropagation();
                console.log(key);
                setShowSubmenu('');
              }}
            >
              {name.en}
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="menu-action secondary-action eye-action">
      <EyeIcon className="eye-icon" />
    </div>
  </>
);

ThreeSixtyMenu.propTypes = {
  styles: arrayOf(shape({})).isRequired,
  showSubmenu: string.isRequired,
  setShowSubmenu: func.isRequired
};

export default ThreeSixtyMenu;
