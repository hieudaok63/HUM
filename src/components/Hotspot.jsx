import React from 'react';
import { string, bool, oneOfType, func, number, shape } from 'prop-types';

const MiniMapHotSpot = (props) => {
  const {
    id,
    active,
    index,
    onClick,
    closeMenu = () => {},
    top,
    left,
    mapSize
  } = props;
  const newTop = (top / mapSize.desktop.height) * 100;
  const newLeft = (left / mapSize.desktop.width) * 100;
  return (
    <>
      <div
        name={id}
        className={`map-hotspot-container ${
          active ? 'active' : ''
        } d-flex justify-content-center align-items-center`}
        style={{
          top: `${newTop}%`,
          left: `${newLeft}%`
        }}
        onClick={(e) => {
          onClick(e);
          closeMenu();
        }}
      >
        <div
          id={`${id}-hotspot`}
          name={id}
          to-scene={index}
          className="map-hotspot"
        />
        <div name={id} className="ringring" />
        <div name={id} className="circle" />
      </div>
    </>
  );
};

MiniMapHotSpot.propTypes = {
  id: string.isRequired,
  active: bool.isRequired,
  index: number.isRequired,
  onClick: func.isRequired,
  closeMenu: func.isRequired,
  top: oneOfType([number, string]).isRequired,
  left: oneOfType([number, string]).isRequired,
  mapSize: shape({}).isRequired
};

export default MiniMapHotSpot;
