import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func, string } from 'prop-types';
import { ReactComponent as LightIcon } from '../../assets/Icons/icon_light.svg';
import { ReactComponent as SettingsIcon } from '../../assets/Icons/icon_settings.svg';
import { ReactComponent as StylesIcon } from '../../assets/Icons/icon_styles.svg';
import { ReactComponent as EyeIcon } from '../../assets/Icons/icon_eye.svg';
import { ReactComponent as EyeDisabledIcon } from '../../assets/Icons/icon_eye_disabled.svg';
import './ActionsMenu.scss';
import { selectedStyleSelector } from '../../selectors/ThreeSixty';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

const ThreeSixtyMenu = ({
  styles,
  showSubmenu,
  setShowSubmenu,
  selectedStyle,
  dispatch
}) => {
  const setSelectedStyle = async (style) => {
    await dispatch(ThreeSixtyAction.setSelectedStyle(style));
    await dispatch(ThreeSixtyAction.updateSpheres(style));
  };
  return (
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
                className={`menu-action-submenu-option ${selectedStyle ===
                  key && 'menu-action-submenu-option-active'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStyle(key);
                  setShowSubmenu('');
                }}
              >
                {name.en}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={`menu-action secondary-action eye-action ${selectedStyle ===
          'Empty' && 'menu-action-active'}`}
        onClick={() => {
          if (selectedStyle === 'Empty') {
            setSelectedStyle('StyleOne');
          } else {
            setSelectedStyle('Empty');
          }
          setShowSubmenu('');
        }}
      >
        {selectedStyle === 'Empty' ? (
          <EyeDisabledIcon className="eye-icon" />
        ) : (
          <EyeIcon className="eye-icon" />
        )}
      </div>
    </>
  );
};

ThreeSixtyMenu.propTypes = {
  styles: arrayOf(shape({})).isRequired,
  showSubmenu: string.isRequired,
  setShowSubmenu: func.isRequired,
  selectedStyle: string.isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => ({
  selectedStyle: selectedStyleSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyMenu);
