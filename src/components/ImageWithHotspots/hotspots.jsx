import React from 'react';
import { shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { languageSelector } from '../../selectors/Language';

const ImageHotspot = ({ spot, language }) => {
  const hotspotRef = React.useRef(null);
  const tooltip = React.useRef(null);

  const activateTooltip = (e) => {
    tooltip.current.classList.add('active');
  };

  const deactivateTooltip = () => {
    tooltip.current.classList.remove('active');
  };

  React.useEffect(() => {
    hotspotRef.current.addEventListener('mouseover', activateTooltip);
    hotspotRef.current.addEventListener('mouseout', deactivateTooltip);
    return () => {
      hotspotRef.current.removeEventListener('mouseover', activateTooltip);
      hotspotRef.current.removeEventListener('mouseout', deactivateTooltip);
    };
  }, []);

  return (
    <>
      <div
        ref={hotspotRef}
        className="hotspot"
        style={{
          top: `${(spot.y / document.body.clientHeight) * 100}%`,
          left: `${(spot.x / document.body.clientWidth) * 100}%`
        }}
      />
      <div
        ref={tooltip}
        className="tooltip-image"
        style={{
          top: `${(spot.y / document.body.clientHeight) * 100}%`,
          left: `${(spot.x / document.body.clientWidth) * 100}%`
        }}
      >
        {spot.name[language]}
      </div>
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
