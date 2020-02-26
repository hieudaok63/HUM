import React, { Fragment } from 'react';
import { bool, func, string, arrayOf, shape } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';

const MobileViewsMenu = ({
  scenes,
  show,
  viewItemClick,
  closeMenu,
  selectedScene
}) => {
  const childElements = scenes.map((scene, index) => {
    const { key, name, image } = scene;
    return (
      <ImageMenuItem
        key={key}
        keyName={key}
        name={name}
        index={index}
        onClick={viewItemClick}
        img={image}
        selected={selectedScene}
        closeMenu={closeMenu}
      />
    );
  });
  return (
    <Fragment>
      <div className="mobile-submenu-title">SCENES</div>
      <div
        id="views-mobile-menu"
        className={`mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center ${
          show ? '' : 'display-none'
        }`}
      >
        {childElements}
      </div>
    </Fragment>
  );
};

MobileViewsMenu.propTypes = {
  scenes: arrayOf(shape({})).isRequired,
  show: bool.isRequired,
  viewItemClick: func.isRequired,
  closeMenu: func.isRequired,
  // perPage,
  // currentPage,
  selectedScene: string.isRequired,
  personalizeButtonClick: func.isRequired
};

export default MobileViewsMenu;
