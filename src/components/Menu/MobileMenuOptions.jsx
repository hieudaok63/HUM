/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, func } from 'prop-types';

const MobileMenuOptions = ({ type, click, active }) => {
  return (
    <span
      className={`nav-mobile-icon-container menu-action ${type}-icon ${
        active ? 'active' : ''
      }`}
      onClick={() => {
        !active && click(type);
      }}
    />
  );
};

MobileMenuOptions.propTypes = {
  type: string.isRequired,
  click: func.isRequired,
  active: bool.isRequired
};

export default MobileMenuOptions;
