import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import './ImageGallery.scss';
import TourAction from '../../stores/tour/actions';
import { galleryImagesSelector } from '../../selectors/Tour';

const ImageGallery = ({ gallery, dispatch }) => (
  <div className="d-flex flex-column image-gallery-container">
    <div className="d-flex justify-content-end w-100">
      <div className="d-flex justify-content-center align-items-center close-icon-container">
        <CloseIcon
          onClick={() => {
            dispatch(TourAction.setImageGallery(false));
          }}
          className="close-icons"
        />
      </div>
    </div>
    {gallery.length > 0 && (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="image-container-gallery">
          <img src={gallery[0].URL} alt={gallery[0].desc} />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start description-container-gallery">
          <h2>{gallery[0].desc}</h2>
        </div>
      </div>
    )}
  </div>
);

ImageGallery.propTypes = {
  dispatch: func.isRequired,
  gallery: arrayOf(shape({})).isRequired
};

ImageGallery.defaultProps = {};

const mapStateToProps = (state) => ({
  gallery: galleryImagesSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageGallery);
