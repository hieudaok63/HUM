/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, func } from 'prop-types';

const MenuOptions = ({ type, click, active, showBeacon, changeStep }) => (
  <div
    className={`d-flex flex-column justify-content-center align-items-center nav-icon-container menu-action ${
      showBeacon ? 'beacon' : ''
    }`}
    onClick={() => {
      click(type);
      if (showBeacon) {
        changeStep();
      }
    }}
  >
    <span className={`${type}-icon ${active ? 'active' : ''}`} />
  </div>
);

MenuOptions.propTypes = {
  type: string.isRequired,
  click: func.isRequired,
  active: bool.isRequired,
  showBeacon: bool.isRequired,
  changeStep: func.isRequired
};

export default MenuOptions;
