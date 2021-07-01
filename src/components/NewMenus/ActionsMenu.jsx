import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func, string } from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/Icons/icon_info.svg';
import { ReactComponent as SlowMoIcon } from '../../assets/Icons/icon_slow_motion.svg';
import { ReactComponent as ShareIcon } from '../../assets/Icons/icon_share.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/Icons/icon_full_screen.svg';
import './ActionsMenu.scss';
import ThreeSixtyMenu from './ThreeSixtyMenu';
import {
  featuresSelector,
  floorplanFeaturesSelector,
  minimapSelector
} from '../../selectors/ThreeSixty';
import {
  availableLanguagesSelector,
  defaultLanguageSelector
} from '../../selectors/Tour';
import ThreeSixtyAction from '../../stores/threeSixty/actions';

const ActionsMenu = ({
  styles,
  setInfoPage,
  defaultLanguage,
  availableLanguages,
  minimap,
  floorplanFeatures,
  features,
  dispatch,
  type
}) => {
  const [showSubmenu, setShowSubmenu] = React.useState('');
  const [language, setLanguage] = React.useState('');

  const changeLanguage = async () => {
    const totalLanguages = availableLanguages.length;
    const currentIndex = availableLanguages.findIndex(
      (item) => item === language
    );

    if (totalLanguages - 1 === currentIndex) {
      setLanguage(availableLanguages[0]);
      await dispatch(ThreeSixtyAction.setLanguage(availableLanguages[0]));
    } else {
      setLanguage(availableLanguages[currentIndex + 1]);
      await dispatch(
        ThreeSixtyAction.setLanguage(availableLanguages[currentIndex + 1])
      );
    }

    await dispatch(ThreeSixtyAction.changeLanguageOnThreeSixty());
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const { target } = e;
      const { className } = target;
      if (typeof className !== 'object' && !className.includes('menu-action')) {
        setShowSubmenu('');
      }
    };

    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  React.useEffect(async () => {
    setLanguage(defaultLanguage);
    console.log('defaultLanguage', defaultLanguage);
    await dispatch(ThreeSixtyAction.setLanguage(defaultLanguage));
  }, [defaultLanguage]);

  return (
    <>
      <div
        className="menu-action info-action"
        onClick={() => {
          setInfoPage({ minimap, floorplanFeatures, features });
        }}
      >
        <InfoIcon className="info-icon" />
      </div>
      <div className="menu-action slow-mo-action" disabled>
        <SlowMoIcon className="slow-mo-icon" />
      </div>
      <div
        className="menu-action language-action"
        onClick={() => {
          changeLanguage();
        }}
      >
        {language}
      </div>
      <div className="menu-action share-action" disabled>
        <ShareIcon className="share-icon" />
      </div>
      <div className="menu-action full-screen-action" disabled>
        <FullScreenIcon className="full-screen-icon" />
      </div>
      {type === 'three-sixty' && (
        <ThreeSixtyMenu
          styles={styles}
          showSubmenu={showSubmenu}
          setShowSubmenu={setShowSubmenu}
        />
      )}
    </>
  );
};

ActionsMenu.propTypes = {
  styles: arrayOf(shape({})).isRequired,
  setInfoPage: func.isRequired,
  minimap: shape({}).isRequired,
  floorplanFeatures: shape({}).isRequired,
  features: arrayOf(shape({})).isRequired,
  defaultLanguage: string.isRequired,
  availableLanguages: arrayOf(string).isRequired,
  dispatch: func.isRequired,
  type: string.isRequired
};

const mapStateToProps = (state) => ({
  availableLanguages: availableLanguagesSelector(state),
  defaultLanguage: defaultLanguageSelector(state),
  minimap: minimapSelector(state),
  floorplanFeatures: floorplanFeaturesSelector(state),
  features: featuresSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsMenu);
