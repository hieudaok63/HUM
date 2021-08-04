import { func, shape, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './InfoPage.scss';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
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
  language
}) => {
  const { features, floorplanFeatures, minimap } = infoPage;

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
        {floorplanFeatures && (
          <>
            <h3>{floorplanFeatures.displayName}</h3>
            <div className="features-container-floorplan">
              {floorplanFeatures.bedrooms > 0 && (
                <div className="features-container-floorplan-feature">
                  <BedroomIcon className="floorplan-content-features-icon mr-1" />
                  {floorplanFeatures.bedrooms}
                </div>
              )}
              {floorplanFeatures.bathrooms > 0 && (
                <div className="features-container-floorplan-feature">
                  <BathroomIcon className="floorplan-content-features-icon mr-1" />
                  {floorplanFeatures.bathrooms}
                </div>
              )}
              {floorplanFeatures.parking > 0 && (
                <div className="features-container-floorplan-feature">
                  <CarIcon className="floorplan-content-features-icon mr-1" />
                  {floorplanFeatures.parking}
                </div>
              )}
              {floorplanFeatures.area && floorplanFeatures.unit && (
                <div className="features-container-floorplan-feature">
                  <AreaIcon className="floorplan-content-features-icon mr-1" />
                  {floorplanFeatures.area} {floorplanFeatures.unit}
                </div>
              )}
            </div>
          </>
        )}
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

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center semi-black-bg z10">
      <CloseIcon onClick={() => setInfoPage(null)} className="close-icon" />
      <div className="w-100 info-container">{renderMinimap()}</div>
    </div>
  );
};

InfoPage.propTypes = {
  infoPage: shape({}).isRequired,
  setInfoPage: func.isRequired,
  dispatch: func.isRequired,
  selectedScene: string.isRequired,
  language: string.isRequired
};

const mapStateToProps = (state) => ({
  selectedScene: selectedSceneSelector(state),
  language: languageSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
