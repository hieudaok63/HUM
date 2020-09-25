import { bool, string } from 'prop-types';
import React, { createElement } from 'react';
import { connect } from 'react-redux';
import StylesMenu from './StylesMenu';
// import ViewsMenu from './ViewsMenu';
// import ChangeRoomMenu from './ChangeRoomMenu';
// import ShoppingCarMenuDesktop from './ShoppingCarMenuDesktop';
// import FinishesMenu from './FinishesMenu';

const SubMenu = ({ selectedMenuOption, showSubMenuElements }) => {
  const component = {
    styles: StylesMenu
  };
  const currentComponent = () => {
    if (selectedMenuOption !== '') {
      return createElement(component[selectedMenuOption]);
    }
    return null;
  };
  return (
    <div
      id="sub-menu"
      className={`sub-menu-container ${
        !selectedMenuOption ? 'closed' : selectedMenuOption
      } ${showSubMenuElements && selectedMenuOption ? 'active' : 'unactive'}`}
      style={{ height: window.innerHeight }}
    >
      {currentComponent}
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
