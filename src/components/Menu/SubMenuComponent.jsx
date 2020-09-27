import { createElement } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import StylesMenu from './StylesMenu';
import ViewsMenu from './ViewsMenu';
import ChangeRoomMenu from './ChangeRoomMenu';
// import ShoppingCarMenuDesktop from './ShoppingCarMenuDesktop';
import FinishesMenu from './FinishesMenu';

const SubMenuComp = ({ selectedMenuOption }) => {
  console.log('subcomp', selectedMenuOption);
  const components = {
    styles: StylesMenu,
    views: ViewsMenu,
    finishes: FinishesMenu,
    'change-room': ChangeRoomMenu
  };
  return (
    components[selectedMenuOption] !== undefined &&
    createElement(components[selectedMenuOption])
  );
};

SubMenuComp.propTypes = {
  selectedMenuOption: string.isRequired
};

const stateMapToProps = (state) => {
  const { selectedMenuOption } = state.threeSixty;
  return {
    selectedMenuOption
  };
};

export default connect(stateMapToProps)(SubMenuComp);
