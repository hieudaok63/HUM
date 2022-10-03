import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, func, string, number, bool } from 'prop-types';
import copy from 'copy-to-clipboard';
import { ReactComponent as InfoIcon } from '../../assets/Icons/icon_info.svg';
import { ReactComponent as ShareIcon } from '../../assets/Icons/icon_share.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/Icons/icon_full_screen.svg';
import { ReactComponent as FullScreenIconClose } from '../../assets/Icons/icon_full_screen_close.svg';
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
  defaultLanguageSelector,
  disableActionsSelector,
  leftMenuOpenSelector
} from '../../selectors/Tour';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import AmenitiesActions from '../../stores/amenities/actions';
import LanguageActions from '../../stores/language/actions';
import Autoplay from '../Autoplay';
import TourAction from '../../stores/tour/actions';

const ActionsMenu = ({
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
  leftMenuOpen,
  disableActions
}) => {
  const [showSubmenu, setShowSubmenu] = React.useState('');
  const [language, setLanguage] = React.useState('');
  const [showShare, setShowShare] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);

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
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const { target } = e;
      const { className } = target;
      if (typeof className !== 'object' && !className.includes('menu-action')) {
        setShowSubmenu('');
        dispatch(TourAction.disableActions(false));
      }
    };

    document.addEventListener('click', handleClickOutside, { capture: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  const toggleShare = () => {
    setShowShare(true);
    copy(window.location.href);
    setTimeout(() => {
      setShowShare(false);
    }, 500);
  };

  if (leftMenuOpen) {
    return null;
  }

  return (
    <>
      <div
        className="menu-action secondary-action info-action"
        onClick={() => {
          if (
            type !== 'three-sixty' &&
            amenity.length > 0 &&
            amenity[galleryIndex].features &&
            JSON.stringify(amenity[galleryIndex].features) !== '{}'
          ) {
            setInfoPage({ features: amenity[galleryIndex].features });
          } else if (type === 'three-sixty') {
            setInfoPage({ minimap, floorplanFeatures, features });
          }
        }}
        disabled={
          (type !== 'three-sixty' &&
            amenity.length > 0 &&
            amenity[galleryIndex].features &&
            JSON.stringify(amenity[galleryIndex].features) === '{}') ||
          disableActions
        }
      >
        <InfoIcon className="info-icon" />
      </div>
      <Autoplay />
      <div
        className="menu-action secondary-action menu-action-no-border language-action"
        onClick={() => {
          changeLanguage();
        }}
        disabled={disableActions}
      >
        {language === 'en' && <ENIcon />}
        {language === 'es' && <ESIcon />}
        {language === 'fr' && <FRIcon />}
      </div>
      {showShare && <div className="copied">Copied!</div>}
      <div
        className="menu-action secondary-action share-action"
        onClick={toggleShare}
        disabled={disableActions}
      >
        <ShareIcon className="share-icon" />
      </div>
      <div
        className="menu-action secondary-action  full-screen-action"
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
          } else {
            document.exitFullscreen();
            setFullScreen(false);
          }
        }}
        disabled={disableActions}
      >
        {fullScreen ? (
          <FullScreenIconClose className="full-screen-icon" />
        ) : (
          <FullScreenIcon className="full-screen-icon" />
        )}
      </div>
      {type === 'three-sixty' && (
        <ThreeSixtyMenu
          showSubmenu={showSubmenu}
          setShowSubmenu={(subMenu) => {
            setShowSubmenu(subMenu);
            if (subMenu === 'styles') {
              dispatch(TourAction.disableActions(true));
            } else {
              dispatch(TourAction.disableActions(false));
            }
          }}
        />
      )}
    </>
  );
};

ActionsMenu.propTypes = {
  setInfoPage: func.isRequired,
  minimap: shape({}),
  floorplanFeatures: shape({}).isRequired,
  features: shape({}),
  defaultLanguage: string.isRequired,
  availableLanguages: arrayOf(string).isRequired,
  dispatch: func.isRequired,
  type: string.isRequired,
  infoPage: shape({}),
  amenity: arrayOf(shape({})),
  galleryIndex: number.isRequired,
  leftMenuOpen: bool.isRequired,
  disableActions: bool.isRequired
};

ActionsMenu.defaultProps = {
  infoPage: null,
  amenity: [],
  minimap: {},
  features: {}
};

const mapStateToProps = (state) => ({
  availableLanguages: availableLanguagesSelector(state),
  defaultLanguage: defaultLanguageSelector(state),
  minimap: minimapSelector(state),
  floorplanFeatures: floorplanFeaturesSelector(state),
  features: featuresSelector(state),
  leftMenuOpen: leftMenuOpenSelector(state),
  disableActions: disableActionsSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsMenu);
