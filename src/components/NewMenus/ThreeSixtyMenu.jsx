import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func, string } from 'prop-types';
import { ReactComponent as LightIcon } from '../../assets/Icons/icon_light.svg';
import { ReactComponent as SettingsIcon } from '../../assets/Icons/icon_settings.svg';
import { ReactComponent as StylesIcon } from '../../assets/Icons/icon_styles.svg';
import { ReactComponent as EyeIcon } from '../../assets/Icons/icon_eye.svg';
import { ReactComponent as EyeDisabledIcon } from '../../assets/Icons/icon_eye_disabled.svg';
import './ActionsMenu.scss';
import {
  languageSelector,
  selectedStyleSelector,
  stylesSelector,
  finishesSelector,
  selectedFinishSelector
} from '../../selectors/ThreeSixty';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

const ThreeSixtyMenu = ({
  styles,
  showSubmenu,
  setShowSubmenu,
  selectedStyle,
  dispatch,
  language,
  finishes,
  selectedFinish
}) => {
  const [lastStyle, setlastStyle] = React.useState('');
  const setSelectedStyle = async (style) => {
    await dispatch(ThreeSixtyAction.setSelectedStyle(style));
    await dispatch(ThreeSixtyAction.updateSpheres(style));
  };
  const setSelectedFinish = async (finish) => {
    await dispatch(ThreeSixtyAction.setSelectedFinish(finish));
    await dispatch(ThreeSixtyAction.updateFinishes());
  };

  console.log(selectedFinish);
  return (
    <>
      <div className="menu-action secondary-action light-action" disabled>
        <LightIcon className="light-icon" />
      </div>
      <div
        className={`${showSubmenu === 'finishes' &&
          'menu-action-active'} menu-action secondary-action settings-action`}
        onClick={() => {
          setShowSubmenu('finishes');
        }}
        disabled={finishes.length === 0}
      >
        <SettingsIcon className="settings-icon" />
        {showSubmenu === 'finishes' && (
          <div className="menu-action-submenu">
            {finishes.map(({ key, name }) => (
              <div
                key={key}
                className={`menu-action-submenu-option ${selectedFinish ===
                  key && 'menu-action-submenu-option-active'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFinish(key);
                  setShowSubmenu('');
                }}
              >
                {name[language]}
              </div>
            ))}
          </div>
        )}
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
                {name[language]}
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
            setSelectedStyle(lastStyle);
          } else {
            setlastStyle(selectedStyle);
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
  finishes: arrayOf(shape({})).isRequired,
  showSubmenu: string.isRequired,
  setShowSubmenu: func.isRequired,
  selectedStyle: string.isRequired,
  selectedFinish: string.isRequired,
  dispatch: func.isRequired,
  language: string.isRequired
};

const mapStateToProps = (state) => ({
  selectedStyle: selectedStyleSelector(state),
  selectedFinish: selectedFinishSelector(state),
  language: languageSelector(state),
  styles: stylesSelector(state),
  finishes: finishesSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreeSixtyMenu);
