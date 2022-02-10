import React from 'react';
import { shape, string, func } from 'prop-types';
import { Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import { languageSelector } from '../../selectors/Language';
import VideoPlayer from '../VideoPlayer';
import { tourSelector } from '../../selectors/Tour';
import AmenitiesActions from '../../stores/amenities/actions';
import TourAction from '../../stores/tour/actions';

const ImageHotspot = ({ spot, language, dispatch, tour }) => {
  const hotspotRef = React.useRef(null);
  const tooltip = React.useRef(null);

  const [showModal, setShowModal] = React.useState(false);

  const activateTooltip = () => {
    tooltip.current.classList.add('active');
  };

  const deactivateTooltip = () => {
    tooltip.current.classList.remove('active');
  };

  React.useEffect(() => {
    hotspotRef.current.addEventListener('mouseover', activateTooltip);
    tooltip.current.addEventListener('mouseout', deactivateTooltip);
    return () => {
      hotspotRef.current.removeEventListener('mouseover', activateTooltip);
      tooltip.current.removeEventListener('mouseout', deactivateTooltip);
    };
  }, []);

  return (
    <>
      <div
        ref={hotspotRef}
        className={`hotspot ${spot.type}`}
        style={{
          top: `${spot.y / document.body.clientHeight}%`,
          left: `${spot.x / document.body.clientWidth}%`
        }}
      />
      <div
        ref={tooltip}
        className={`tooltip-image d-flex align-items-start flex-column ${
          spot.thumbnail
            ? 'justify-content-end'
            : 'no-thumbnail justify-content-start'
        }`}
        style={{
          top: `${spot.y / document.body.clientHeight}%`,
          left: `${spot.x / document.body.clientWidth}%`,
          backgroundImage: `url(${spot.thumbnail})`,
          backgroundSize: '100%'
        }}
        onClick={async () => {
          if (spot.type === 'image' || spot.type === 'video') {
            setShowModal(true);
          } else if (spot.type === 'hotspots') {
            const amenity = tour.sections.find(
              (section) => section.key === spot.in
            );
            if (amenity) {
              const room = amenity.content.find(
                (item) => item.key === spot.key
              );
              if (room) {
                await dispatch(AmenitiesActions.setContainer(null));
                await dispatch(TourAction.selectType(room.media[0].type));
                await dispatch(AmenitiesActions.setAmenity(room.media));
                await dispatch(AmenitiesActions.setSelectedAmenity(spot.key));
              }
            }
          }
        }}
      >
        <h3>{spot.name[language]}</h3>
        {spot.info && <h6>{spot.info[language]}</h6>}
      </div>
      <Modal
        open={showModal}
        aria-labelledby="simple-modal-title"
        onClose={() => {
          setShowModal(false);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        disableAutoFocus
      >
        <div className="body-container">
          {spot.type === 'image' && (
            <img src={spot.thumbnail} alt={spot.name[language]} />
          )}
          {spot.type === 'video' && (
            <div className="video-full-container">
              <VideoPlayer src={spot.videoURL} fullWidth />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

ImageHotspot.propTypes = {
  spot: shape({}).isRequired,
  language: string.isRequired,
  tour: shape({}).isRequired,
  dispatch: func.isRequired
};

const mapStateToProps = (state) => ({
  language: languageSelector(state),
  tour: tourSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageHotspot);
