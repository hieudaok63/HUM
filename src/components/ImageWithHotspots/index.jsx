import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { ReactComponent as ImageIcon } from '../../assets/Icons/icon_image.svg';
import './styles.scss';

const ImageWithHotspots = ({ src, alt, spots }) => {
  return (
    <div className="twod-container">
      <ImageIcon className="icon-type" />
      <img src={src} alt={alt} />
      {spots.map((spot, index) => (
        <div
          className="hotspot"
          key={`hotspot-${index.toString()}`}
          style={{
            top: `${(spot.y / document.body.clientHeight) * 100}%`,
            left: `${(spot.x / document.body.clientWidth) * 100}%`
          }}
        >
          <div className="ringring" />
          <div className="circle" />
        </div>
      ))}
    </div>
  );
};

ImageWithHotspots.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
  spots: arrayOf(shape({}))
};

ImageWithHotspots.defaultProps = {
  spots: []
};

export default ImageWithHotspots;
