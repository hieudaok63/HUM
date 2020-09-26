import React from 'react';
import { bool, string } from 'prop-types';
import { connect } from 'react-redux';
import SubMenuComponent from './SubMenuComponent';

const SubMenu = ({ selectedMenuOption, showSubMenuElements }) => {
  return (
    <div
      id="sub-menu"
      className={`sub-menu-container ${
        !selectedMenuOption ? 'closed' : selectedMenuOption
      } ${showSubMenuElements && selectedMenuOption ? 'active' : 'unactive'}`}
      style={{ height: window.innerHeight }}
    >
      {selectedMenuOption && <SubMenuComponent />}
    </div>
  );
};

SubMenu.propTypes = {
  selectedMenuOption: string.isRequired,
  showSubMenuElements: bool.isRequired
};

const stateMapToProps = (state) => {
  const { selectedMenuOption } = state.threeSixty;
  return {
    selectedMenuOption
  };
};

export default connect(stateMapToProps)(SubMenu);
