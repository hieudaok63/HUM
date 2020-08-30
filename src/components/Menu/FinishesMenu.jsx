import React from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';

const FinishesMenu = ({
  scenes = [],
  show,
  viewItemClick,
  selectedScene,
  mode
}) => (
  <div
    className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
      show ? '' : 'display-none'
    }`}
  >
    <div className="title">FINISHES</div>
    <div
      id="finishes-menu"
      className={`finishes-menu sub-menu ${show ? '' : 'display-none'}`}
    >
      {scenes.map((scene, index) => {
        const { key, modes, name } = scene;
        return (
          <ImageMenuItem
            key={key}
            keyName={key}
            name={name}
            index={index}
            onClick={viewItemClick}
            img={modes[mode]}
            selected={selectedScene}
          />
        );
      })}
    </div>
  </div>
);

FinishesMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  show: bool.isRequired,
  viewItemClick: func.isRequired,
  selectedScene: string.isRequired,
  mode: string.isRequired
};

export default FinishesMenu;
