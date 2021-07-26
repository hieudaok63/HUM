import React from 'react';
import { shape, string } from 'prop-types';
import { Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import { languageSelector } from '../../selectors/Language';
import VideoPlayer from '../VideoPlayer';

const ImageHotspot = ({ spot, language }) => {
  const hotspotRef = React.useRef(null);
  const tooltip = React.useRef(null);

  const [showModal, setShowModal] = React.useState(false);

  const activateTooltip = (e) => {
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
  console.log(spot);
  return (
    <>
      <div
        ref={hotspotRef}
        className={`hotspot ${spot.type}`}
        style={{
          top: `${(spot.y / document.body.clientHeight) * 100}%`,
          left: `${(spot.x / document.body.clientWidth) * 100}%`
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
          top: `${(spot.y / document.body.clientHeight) * 100}%`,
          left: `${(spot.x / document.body.clientWidth) * 100}%`,
          backgroundImage: `url(${spot.thumbnail})`,
          backgroundSize: '100%'
        }}
        onClick={() => {
          setShowModal(true);
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
  language: string.isRequired
};

const mapStateToProps = (state) => ({
  language: languageSelector(state)
});

export default connect(mapStateToProps, null)(ImageHotspot);
