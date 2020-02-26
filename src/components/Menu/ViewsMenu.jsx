import React from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';

const ViewsMenu = ({ scenes = [], show, viewItemClick, selectedScene }) => (
  <div
    className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
      show ? '' : 'display-none'
    }`}
  >
    <div className="title">SCENES</div>
    <div
      id="views-menu"
      className={`views-menu sub-menu ${show ? '' : 'display-none'}`}
    >
      {scenes.map((scene, index) => {
        const { key, image, name } = scene;
        return (
          <ImageMenuItem
            key={key}
            keyName={key}
            name={name}
            index={index}
            onClick={viewItemClick}
            img={image}
            selected={selectedScene}
          />
        );
      })}
    </div>
  </div>
);

ViewsMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  show: bool.isRequired,
  viewItemClick: func.isRequired,
  selectedScene: string.isRequired
};

export default ViewsMenu;
