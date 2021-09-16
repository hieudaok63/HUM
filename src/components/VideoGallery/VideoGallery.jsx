import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../assets/Icons/close.svg';
import './VideoGallery.scss';
import VideoPlayer from '../VideoPlayer';
import TourAction from '../../stores/tour/actions';
import { galleryVideosSelector } from '../../selectors/Tour';

const VideoGallery = ({ gallery, dispatch }) => (
  <div className="d-flex flex-column video-gallery-container">
    <div className="d-flex justify-content-end w-100">
      <div className="d-flex justify-content-center align-items-center close-icon-container">
        <CloseIcon
          onClick={() => {
            dispatch(TourAction.setVideoGallery(false));
          }}
          className="close-icons"
        />
      </div>
    </div>
    {gallery.length > 0 && (
      <div className="video-full-container d-flex flex-column">
        <VideoPlayer gallery src={gallery[0].URL} />
        <div className="d-flex flex-column justify-content-start align-items-start description-container-video-gallery">
          <h2>{gallery[0].desc}</h2>
        </div>
      </div>
    )}
  </div>
);

VideoGallery.propTypes = {
  dispatch: func.isRequired,
  gallery: arrayOf(shape({})).isRequired
};

VideoGallery.defaultProps = {};

const mapStateToProps = (state) => ({
  gallery: galleryVideosSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGallery);
