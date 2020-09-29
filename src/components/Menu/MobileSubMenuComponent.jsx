import { createElement } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import MobileStylesMenu from './MobileStylesMenu';
import MobileViewsMenu from './MobileViewsMenu';
import MobileChangeRoomsMenu from './MobileChangeRoomsMenu';
import MiniMapMobile from '../MiniMapMobile';
import ShoppingCarMenuMobile from './ShoppingCarMenuMobile';
import MobileFinishMenu from './MobileFinishMenu';

const SubMenuComp = ({ selectedMenuOption, closeMenu }) => {
  console.log('subcomp', selectedMenuOption);
  const components = {
    'mobile-styles': MobileStylesMenu,
    'mobile-views': MobileViewsMenu,
    'mobile-finishes': MobileFinishMenu,
    'mobile-change-room': MobileChangeRoomsMenu,
    'mobile-furniture': ShoppingCarMenuMobile,
    'mobile-mini-map': MiniMapMobile
  };
  return (
    components[selectedMenuOption] !== undefined &&
    createElement(components[selectedMenuOption], { closeMenu })
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
