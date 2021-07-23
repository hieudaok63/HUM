import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import './styles.scss';
import ImageHotspot from './hotspots';

const ImageWithHotspots = ({ src, alt, spots }) => (
  <div className="twod-container">
    <img src={src} alt={alt} />
    {spots.map((spot, index) => (
      <ImageHotspot key={`hotspot-${index.toString()}`} spot={spot} />
    ))}
  </div>
);

ImageWithHotspots.propTypes = {
  src: string.isRequired,
  alt: string.isRequired,
  spots: arrayOf(shape({}))
};

ImageWithHotspots.defaultProps = {
  spots: []
};

export default ImageWithHotspots;
