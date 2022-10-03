import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';

const Gallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveCarouselLeft = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(images.length - 1);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const moveCarouselRight = () => {
    if (selectedIndex === images.length - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  return images[selectedIndex] ? (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <img
        src={images[selectedIndex]}
        alt={images[selectedIndex]}
        style={{ height: '100%', width: '100%', objectFit: 'fill' }}
      />
      <div
        className="gallery-carousel-controls"
        style={{ top: 'auto', bottom: 90, left: '50%' }}
      >
        <DropdownIcon className="left-arrow" onClick={moveCarouselLeft} />
        {selectedIndex + 1}/{images.length}
        <DropdownIcon className="right-arrow" onClick={moveCarouselRight} />
      </div>
    </div>
  ) : null;
};

Gallery.propTypes = {
  images: arrayOf(string).isRequired
};

Gallery.defaultProps = {};

export default Gallery;
