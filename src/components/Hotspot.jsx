import React, { Fragment } from 'react';
import { string, bool, oneOfType, func, number, shape } from 'prop-types';
import InstructionTooltip from './Tooltip/InstructionTooltip';

const MiniMapHotSpot = (props) => {
  const {
    id,
    active,
    index,
    onClick,
    closeMenu = () => {},
    top,
    left,
    showTooltip,
    changeStep,
    loading,
    mapSize
  } = props;
  const newTop = (top / mapSize.desktop.height) * 100;
  const newLeft = (left / mapSize.desktop.width) * 100;
  return (
    <Fragment>
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
          if (showTooltip) {
            changeStep();
          }
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
      {showTooltip && (
        <InstructionTooltip
          show={showTooltip}
          text="Click on the minimap hotspots to go to a scene."
          position="top"
          top={`${newTop - 18}%`}
          left={`${newLeft - 11.8}%`}
          loading={loading}
        />
      )}
    </Fragment>
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
  showTooltip: bool,
  changeStep: func,
  loading: bool,
  mapSize: shape({}).isRequired
};

MiniMapHotSpot.defaultProps = {
  showTooltip: false,
  changeStep: () => {},
  loading: false
};

export default MiniMapHotSpot;
