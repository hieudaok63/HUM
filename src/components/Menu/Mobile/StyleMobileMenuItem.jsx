/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, func } from 'prop-types';

const StyleMobileMenuItem = ({ style, icon, show, styleChange, type }) => (
  <div
    className={`d-flex flex-row justify-content-start align-items-center style-item button ${icon} ${
      show ? 'active' : ''
    }`}
    onClick={() => {
      styleChange(type);
    }}
  >
    <span className={`nav-icon-container style-icon style-${icon}`} />
    <span className="nav-text">{style}</span>
  </div>
);

StyleMobileMenuItem.propTypes = {
  style: string.isRequired,
  icon: string.isRequired,
  show: bool.isRequired,
  styleChange: func.isRequired,
  type: string.isRequired
};

export default StyleMobileMenuItem;
