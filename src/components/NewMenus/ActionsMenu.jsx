import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func, string, number, node } from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/Icons/icon_info.svg';
import { ReactComponent as SlowMoIcon } from '../../assets/Icons/icon_slow_motion.svg';
import { ReactComponent as SlowMoPauseIcon } from '../../assets/Icons/icon_slow_motion_pause.svg';
import { ReactComponent as ShareIcon } from '../../assets/Icons/icon_share.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/Icons/icon_full_screen.svg';
import { ReactComponent as ENIcon } from '../../assets/Icons/icon_en.svg';
import { ReactComponent as ESIcon } from '../../assets/Icons/icon_es.svg';
import { ReactComponent as FRIcon } from '../../assets/Icons/icon_fr.svg';
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
import AmenitiesActions from '../../stores/amenities/actions';
import LanguageActions from '../../stores/language/actions';

const ActionsMenu = ({
  styles,
  setInfoPage,
  infoPage,
  defaultLanguage,
  availableLanguages,
  minimap,
  floorplanFeatures,
  features,
  dispatch,
  type,
  amenity,
  galleryIndex,
  video
}) => {
  const [showSubmenu, setShowSubmenu] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [isPaused, setIsPaused] = React.useState(false);

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
      await dispatch(
        AmenitiesActions.setLanguage(availableLanguages[currentIndex + 1])
      );
      await dispatch(
        LanguageActions.setLanguage(availableLanguages[currentIndex + 1])
      );
    }

    await dispatch(ThreeSixtyAction.changeLanguageOnThreeSixty());
  };

  const handleyKeyUp = React.useCallback((e) => {
    const { code } = e;

    if (code === 'Space') {
      if (infoPage === null) {
        setInfoPage({ minimap, floorplanFeatures, features });
      } else {
        setInfoPage(null);
      }
    }
  });

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

  const togglePlay = () => {
    if (video.current) {
      if (video.current.paused) {
        video.current.play();
        setIsPaused(false);
      } else {
        video.current.pause();
        setIsPaused(true);
      }
    }
  };

  React.useEffect(() => {
    setLanguage(defaultLanguage);
    async function setDefaultLanguage() {
      await dispatch(ThreeSixtyAction.setLanguage(defaultLanguage));
    }
    setDefaultLanguage();
  }, [defaultLanguage]);

  React.useEffect(() => {
    document.addEventListener('keyup', handleyKeyUp);

    return () => {
      document.removeEventListener('keyup', handleyKeyUp);
    };
  }, [language, infoPage]);

  console.log('video.current', video?.current);

  return (
    <>
      <div
        className="menu-action info-action"
        onClick={() => {
          if (
            type !== 'three-sixty' &&
            amenity.length > 0 &&
            amenity[galleryIndex].features &&
            JSON.stringify(amenity[galleryIndex].features) !== '{}'
          ) {
            setInfoPage({ features: amenity[galleryIndex].features });
          } else {
            setInfoPage({ minimap, floorplanFeatures, features });
          }
        }}
        disabled={
          type !== 'three-sixty' &&
          amenity.length > 0 &&
          amenity[galleryIndex].features &&
          JSON.stringify(amenity[galleryIndex].features) === '{}'
        }
      >
        <InfoIcon className="info-icon" />
      </div>
      <div
        className="menu-action menu-action-active slow-mo-action"
        disabled={
          type === 'three-sixty' ||
          (amenity.length > 0 && amenity[galleryIndex].type !== 'video')
        }
        onClick={togglePlay}
      >
        {isPaused ? (
          <SlowMoIcon className="slow-mo-icon" />
        ) : (
          <SlowMoPauseIcon className="slow-mo-icon" />
        )}
      </div>
      <div
        className="menu-action menu-action-no-border language-action"
        onClick={() => {
          changeLanguage();
        }}
      >
        {language === 'en' && <ENIcon />}
        {language === 'es' && <ESIcon />}
        {language === 'fr' && <FRIcon />}
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
  type: string.isRequired,
  infoPage: shape({}),
  amenity: shape({}),
  galleryIndex: number.isRequired,
  video: node
};

ActionsMenu.defaultProps = {
  infoPage: null,
  amenity: {},
  video: null
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
