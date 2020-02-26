/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, func } from 'prop-types';
import { titleCase } from '../../utils';

const StyleMenuItem = ({ style, icon, show, styleChange }) => {
  return (
    <div
      className={`d-flex flex-row justify-content-start align-items-center parent-container ${style} ${
        show ? 'active' : ''
      }`}
      onClick={() => {
        styleChange(style);
      }}
    >
      <div
        className={`d-flex flex-row justify-content-center align-items-center ${icon}`}
      >
        <span className={`nav-icon-container style-icon style-${icon}`} />
        <span className="nav-text">{titleCase(style)}</span>
      </div>
    </div>
  );
};

StyleMenuItem.propTypes = {
  style: string.isRequired,
  icon: string.isRequired,
  show: bool.isRequired,
  styleChange: func.isRequired
};

export default StyleMenuItem;
