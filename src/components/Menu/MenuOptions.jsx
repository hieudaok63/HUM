/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, func } from 'prop-types';

const MenuOptions = ({ type, click, active }) => (
  <div
    className="d-flex flex-column justify-content-center align-items-center nav-icon-container menu-action"
    onClick={() => {
      click(type);
    }}
  >
    <span className={`${type}-icon ${active ? 'active' : ''}`} />
  </div>
);

MenuOptions.propTypes = {
  type: string.isRequired,
  click: func.isRequired,
  active: bool.isRequired
};

export default MenuOptions;
