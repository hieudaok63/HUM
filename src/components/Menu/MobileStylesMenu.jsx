import React, { Fragment } from 'react';
import { string, bool, arrayOf, shape, func } from 'prop-types';
import ImageMenuItem from './ImageMenuItem';
import personalizeIcon from '../../assets/Icons/icon-personalize-white.svg';

const MobileStylesMenu = (props) => {
  const {
    options,
    show,
    styleChange,
    selectedStyle,
    closeMenu,
    personalizeButtonClick,
    showPersonalize
  } = props;
  const childElements = options.map((option, index) => {
    console.log(option);
    const { type, style, image } = option;
    return (
      <ImageMenuItem
        key={type}
        keyName={type}
        type={type}
        name={style}
        index={index}
        onClick={styleChange}
        img={image}
        selected={selectedStyle}
        closeMenu={closeMenu}
      />
    );
  });

  return (
    <Fragment>
      <div className="mobile-submenu-title">STYLES</div>
      <div
        id="views-mobile-menu"
        className={`mobile-submenu views-mobile-menu sub-mobile-menu d-flex justify-content-start align-items-center ${
          show ? '' : 'display-none'
        }`}
      >
        {childElements}
      </div>
      {showPersonalize && (
        <div className="mobile-personalize-container d-flex align-items-center">
          <div className="mobile-personalize-intro">
            Take a quick consultation with our AI Interior Designer and discover
            your own style.
          </div>
          <button
            type="button"
            className="mobile-personalize-button d-flex justify-content-center align-items-center"
            onClick={() => {
              personalizeButtonClick();
            }}
          >
            <img
              src={personalizeIcon}
              alt="Personalize"
              className="mobile-personalize-button-icon"
            />
            Personalize
          </button>
        </div>
      )}
    </Fragment>
  );
};

MobileStylesMenu.propTypes = {
  options: arrayOf(shape({})).isRequired,
  show: bool.isRequired,
  styleChange: func.isRequired,
  selectedStyle: string.isRequired,
  closeMenu: func.isRequired,
  personalizeButtonClick: func.isRequired,
  showPersonalize: bool.isRequired
};

export default MobileStylesMenu;
