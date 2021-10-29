import React from 'react';
import { arrayOf, string, shape, number, func } from 'prop-types';
import { ReactComponent as DropdownIcon } from '../../assets/Icons/icon_dropdown.svg';
import { ReactComponent as PanoIcon } from '../../assets/Icons/icon_360.svg';
import { ReactComponent as ImageIcon } from '../../assets/Icons/icon_image.svg';
import { ReactComponent as VideoIcon } from '../../assets/Icons/icon-play.svg';
import { ReactComponent as EllipseIcon } from '../../assets/Icons/icon_ellipse.svg';

const galleryIcon = {
  '2d': <ImageIcon className="icon-type" />,
  video: <VideoIcon className="icon-type-md" />,
  pano: <PanoIcon className="icon-type-md" />
};

const AmenityNav = ({
  amenity,
  galleryIndex,
  moveCarouselLeft,
  moveCarouselRight
}) => (
  <div className="gallery-carousel-controls">
    {amenity[galleryIndex - 1] ? (
      <DropdownIcon className="left-arrow" onClick={moveCarouselLeft} />
    ) : (
      <div className="placeholder placeholder-left" />
    )}
    {amenity[galleryIndex - 1] && (
      <EllipseIcon className="ellipsis-icon" onClick={moveCarouselLeft} />
    )}
    {amenity[galleryIndex] && galleryIcon[amenity[galleryIndex].type]}
    {amenity[galleryIndex + 1] && (
      <EllipseIcon className="ellipsis-icon" onClick={moveCarouselRight} />
    )}
    {!amenity[galleryIndex - 1] && amenity[galleryIndex + 2] && (
      <EllipseIcon className="ellipsis-icon" onClick={moveCarouselRight} />
    )}
    {amenity[galleryIndex + 1] ? (
      <DropdownIcon className="right-arrow" onClick={moveCarouselRight} />
    ) : (
      <div className="placeholder placeholder-right" />
    )}
  </div>
);

AmenityNav.propTypes = {
  amenity: arrayOf(shape({})).isRequired,
  type: string.isRequired,
  galleryIndex: number.isRequired,
  moveCarouselLeft: func.isRequired,
  moveCarouselRight: func.isRequired
};

export default AmenityNav;
