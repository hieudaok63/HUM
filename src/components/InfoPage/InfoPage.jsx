import { func, shape, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './InfoPage.scss';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import { ReactComponent as BedroomIcon } from '../../assets/Icons/icon_bedroom.svg';
import { ReactComponent as BathroomIcon } from '../../assets/Icons/icon_bathroom.svg';
import { ReactComponent as CarIcon } from '../../assets/Icons/icon_car.svg';
import { ReactComponent as AreaIcon } from '../../assets/Icons/icon_area.svg';
import ThreeSixtyAction from '../../stores/threeSixty/actions';
import { selectedSceneSelector } from '../../selectors/ThreeSixty';

const InfoPage = ({ infoPage, setInfoPage, dispatch, selectedScene }) => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const { features, images, floorplanFeatures, minimap } = infoPage;

  const changeScene = async (scene) => {
    await dispatch(ThreeSixtyAction.setSelectedScene(scene));
    await dispatch(ThreeSixtyAction.changeSceneSphere());
    setInfoPage(null);
  };

  const renderMinimap = () => {
    if (!minimap) {
      return null;
    }
    return (
      <>
        {floorplanFeatures && (
          <div className="w-20 features-container">
            <h3>Features</h3>
            <ul>
              <li>
                <BedroomIcon className="floorplan-content-features-icon mr-1" />
                {floorplanFeatures.bedrooms}
              </li>
              <li>
                <BathroomIcon className="floorplan-content-features-icon mr-1" />
                {floorplanFeatures.bathrooms}
              </li>
              <li>
                <CarIcon className="floorplan-content-features-icon mr-1" />
                {floorplanFeatures.parking}
              </li>
              <li>
                <AreaIcon className="floorplan-content-features-icon mr-1" />
                {floorplanFeatures.area} {floorplanFeatures.unit}
              </li>
            </ul>
          </div>
        )}
        <div className="w-80 features-container minimap-container">
          <img src={minimap.image} alt={minimap.image} />
          {minimap.hotspots.map(({ key, x, y }) => (
            <div
              onClick={() => {
                changeScene(key);
              }}
              key={key}
              className={`minimap-container-hotspot ${selectedScene === key &&
                'minimap-container-hotspot-active'}`}
              style={{ top: y, left: x }}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center semi-black-bg z10">
      <CloseIcon onClick={() => setInfoPage(null)} className="close-icon" />
      <div className="w-100 info-container">
        {renderMinimap()}
        {features && features?.en.length > 0 && (
          <div className="w-50 features-container">
            <h1>Features</h1>
            <ul>
              {features.en.map(({ text }) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        )}
        {images && images.length > 0 && (
          <div className="w-50 images-container">
            {imageIndex > 0 && (
              <DropdownIcon
                className="arrow arrow-left"
                onClick={() => {
                  setImageIndex(imageIndex - 1);
                }}
              />
            )}
            <img
              src={images[imageIndex].image}
              alt={images[imageIndex].image}
            />
            {imageIndex < images.length - 1 && (
              <DropdownIcon
                className="arrow arrow-right"
                onClick={() => {
                  setImageIndex(imageIndex + 1);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

InfoPage.propTypes = {
  infoPage: shape({}).isRequired,
  setInfoPage: func.isRequired,
  dispatch: func.isRequired,
  selectedScene: string.isRequired
};

const mapStateToProps = (state) => ({
  selectedScene: selectedSceneSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
