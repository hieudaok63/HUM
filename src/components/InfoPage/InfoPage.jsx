import { func, shape, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './InfoPage.scss';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as FullInfoIcon } from '../../assets/Icons/icon_full_info.svg';
// import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import {
  languageSelector,
  selectedSceneSelector
} from '../../selectors/ThreeSixty';

const InfoPage = ({
  infoPage,
  setInfoPage,
  dispatch,
  selectedScene,
  language,
  expandedLogo,
  backgroundColor
}) => {
  const { features, floorplanFeatures, minimap } = infoPage;

  const [isMinimized, setIsMinimized] = React.useState(!!minimap);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  React.useEffect(() => {
    setIsMinimized(!!minimap);
  }, [minimap]);

  const changeScene = async (scene) => {
    await dispatch(ThreeSixtyAction.setSelectedScene(scene));
    await dispatch(ThreeSixtyAction.changeSceneSphere());
    setInfoPage(null);
  };

  const featureLabel = {
    en: 'Features',
    es: 'Características',
    fr: 'Fonctionnalités'
  };

  const renderMinimap = () => (
    <>
      <div className={`features-container ${minimap ? 'w-40' : 'w-100'}`}>
        {features && (
          <>
            <h4>{featureLabel[language]}</h4>
            <ul>
              {features[language].map(({ text }) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      {minimap && (
        <div className="w-60 features-container minimap-container">
          <img src={minimap.image} alt={minimap.image} />
          {minimap.hotspots.map(({ key, x, y }) => (
            <div
              onClick={() => {
                if (selectedScene !== key) {
                  changeScene(key);
                }
              }}
              key={key}
              className={`minimap-container-hotspot ${selectedScene === key &&
                'minimap-container-hotspot-active'}`}
              style={{ top: y, left: x }}
            />
          ))}
        </div>
      )}
    </>
  );

  const renderHeader = () => (
    <div
      className="d-flex minimized-features w-100"
      style={!isMinimized ? { paddingLeft: 0 } : {}}
    >
      {!isMinimized && (
        <div className="minimized-features-logo" style={{ backgroundColor }}>
          <img src={expandedLogo} alt="Logo" />
        </div>
      )}
      {floorplanFeatures && (
        <>
          {floorplanFeatures.bedrooms > 0 && (
            <div className="features-container-floorplan-feature">
              <BedroomIcon className="floorplan-content-features-icon mr-1 info-minimized-icons" />
              {floorplanFeatures.bedrooms}
            </div>
          )}
          {floorplanFeatures.bathrooms > 0 && (
            <div className="features-container-floorplan-feature">
              <BathroomIcon className="floorplan-content-features-icon mr-1 info-minimized-icons" />
              {floorplanFeatures.bathrooms}
            </div>
          )}
          {floorplanFeatures.parking > 0 && (
            <div className="features-container-floorplan-feature">
              <CarIcon className="floorplan-content-features-icon mr-1 info-minimized-icons" />
              {floorplanFeatures.parking}
            </div>
          )}
          {floorplanFeatures.area && floorplanFeatures.unit && (
            <div className="features-container-floorplan-feature">
              <AreaIcon className="floorplan-content-features-icon mr-1 info-minimized-icons" />
              {floorplanFeatures.area} {floorplanFeatures.unit}
            </div>
          )}
          <div className="minimized-title">{floorplanFeatures.displayName}</div>
        </>
      )}
      <CloseIcon
        onClick={() => setInfoPage(null)}
        className="info-minimized-action-icons "
      />
    </div>
  );

  if (isMinimized) {
    return (
      <div className="semi-black-bg z10 t-0 r-0 w-540">
        {renderHeader()}
        {minimap && (
          <div className="w-100 features-container minimap-container">
            <img src={minimap.image} alt={minimap.image} className="w-100" />
            {minimap.hotspots.map(({ key, x, y }) => (
              <div
                onClick={() => {
                  if (selectedScene !== key) {
                    changeScene(key);
                  }
                }}
                key={key}
                className={`minimap-container-hotspot ${selectedScene === key &&
                  'minimap-container-hotspot-active'}`}
                style={{ top: y, left: x }}
              />
            ))}
          </div>
        )}
        <FullInfoIcon
          onClick={toggleMinimized}
          className="info-minimized-action-icons m-10"
        />
      </div>
    );
  }

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center semi-black-bg z10">
      {renderHeader()}
      <div className="w-100 info-container">{renderMinimap()}</div>
    </div>
  );
};

InfoPage.propTypes = {
  infoPage: shape({}).isRequired,
  setInfoPage: func.isRequired,
  dispatch: func.isRequired,
  selectedScene: string.isRequired,
  language: string.isRequired,
  expandedLogo: string.isRequired,
  backgroundColor: string
};

InfoPage.defaultProps = {
  backgroundColor: 'white'
};

const mapStateToProps = (state) => ({
  selectedScene: selectedSceneSelector(state),
  language: languageSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
