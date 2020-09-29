import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import MobileSubMenuComponent from './MobileSubMenuComponent';

const MobileSubMenu = ({ selectedMenuOption, closeMenu }) => (
  <div id="sub-mobile-menu" className="sub-mobile-menu-container">
    {selectedMenuOption && <MobileSubMenuComponent closeMenu={closeMenu} />}
  </div>
);

MobileSubMenu.propTypes = {
  selectedMenuOption: string.isRequired,
  closeMenu: func.isRequired
};

const stateMapToProps = (state) => {
  const { selectedMenuOption } = state.threeSixty;
  return {
    selectedMenuOption
  };
};

export default connect(stateMapToProps)(MobileSubMenu);
