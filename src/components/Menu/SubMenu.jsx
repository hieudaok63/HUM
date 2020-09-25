import React from 'react';

const SubMenu = ({ selectedMenuOption, showSubMenuElements }) => (
  <div
    id="sub-menu"
    className={`sub-menu-container ${
      !selectedMenuOption ? 'closed' : selectedMenuOption
    } ${showSubMenuElements && selectedMenuOption ? 'active' : 'unactive'}`}
    style={{ height: window.innerHeight }}
  ></div>
);

SubMenu.propTypes = {};

SubMenu.defaultProps = {
  selectedMenuOption: ''
};

export default SubMenu;
