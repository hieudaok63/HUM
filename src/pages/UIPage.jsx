import React from 'react';
import './UIPage.css';

const testLogo = require('../assets/testLogo.svg');
const testLogoExtended = require('../assets/testLogoExtended.svg');
const closeIcon = require('../assets/Icons/close.svg');

const UIPage = () => {
  const minifiedMenu = React.createRef();
  const menu = React.createRef();

  const showMenu = () => {
    minifiedMenu.current.className = 'minified-menu minified-left-fade-out';
    menu.current.className = 'menu left-fade-in';
    setTimeout(() => {
      minifiedMenu.current.className = 'hidden';
    }, 450);
  };

  const hideMenu = () => {
    menu.current.className = 'menu left-fade-out';
    setTimeout(() => {
      menu.current.className = 'hidden';
      minifiedMenu.current.className = 'minified-menu minified-left-fade-in';
    }, 450);
  };

  return (
    <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <div onMouseEnter={showMenu} className="minified-menu" ref={minifiedMenu}>
        <div className="minified-menu-title">
          <h1>Explore Property</h1>
        </div>
        <div className="minified-menu-logo">
          <img src={testLogo} alt="Logo" />
        </div>
      </div>
      <div ref={menu} className="hidden">
        <div className="menu-header">
          <img src={testLogoExtended} alt="Logo" />
          <img
            src={closeIcon}
            alt="Close"
            onClick={hideMenu}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};

export default UIPage;
