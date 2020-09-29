import React, { Fragment } from 'react';
import { bool, func, string, arrayOf, shape } from 'prop-types';
import ImageMenuItem from '../ImageMenuItem';

const MobileFinishMenu = ({
  scenes,
  show,
  finishItemClick,
  closeMenu,
  selectedScene,
  mode
}) => {
  const childElements = scenes.map((scene, index) => {
    const { key, name, modes } = scene;
    return (
      <ImageMenuItem
        key={key}
        keyName={key}
        name={name}
        index={index}
        onClick={finishItemClick}
        img={modes[mode]}
        selected={selectedScene}
        closeMenu={closeMenu}
      />
    );
  });
  return (
    <Fragment>
      <div className="mobile-submenu-title">FINISHES</div>
      <div
        id="finish-mobile-menu"
        className={`mobile-submenu finish-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center ${
          show ? '' : 'display-none'
        }`}
      >
        {childElements}
      </div>
    </Fragment>
  );
};

MobileFinishMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  show: bool.isRequired,
  finishItemClick: func.isRequired,
  closeMenu: func.isRequired,
  selectedScene: string.isRequired,
  mode: string.isRequired
};

export default MobileFinishMenu;
