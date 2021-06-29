import { func, shape } from 'prop-types';
import React from 'react';
import './InfoPage.scss';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';

const InfoPage = ({ infoPage, setInfoPage }) => {
  const [imageIndex, setImageIndex] = React.useState(0);
  const { features, images } = infoPage;
  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center semi-black-bg z10">
      <CloseIcon onClick={() => setInfoPage(null)} className="close-icon" />
      <div className="w-100 info-container">
        {features.en.length > 0 && (
          <div className="w-50 features-container">
            <h1>Features</h1>
            <ul>
              {features.en.map(({ text }) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </div>
        )}
        {images.length > 0 && (
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
  setInfoPage: func.isRequired
};

export default InfoPage;
