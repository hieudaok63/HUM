import { createSelector } from 'reselect';
import { isPortrait, isTablet } from '../../utils';

export class MenuSelector {
  static getOptions(state) {
    return state.threeSixty.menuOptions;
  }

  static getShoppingCarItems(state) {
    return state.threeSixty.furniture;
  }

  static getRoomUse(state) {
    return state.threeSixty.roomUse;
  }

  static getFinishScenes(state) {
    return state.threeSixty.finishScenes;
  }

  static filterMenuOptions(options, shoppingCarItems, roomUse, finishScenes) {
    return options.filter((option) => {
      let showIcon = true;
      if (option === 'furniture') {
        showIcon = shoppingCarItems.length > 0;
      }
      if (option === 'change-room') {
        showIcon = roomUse.length > 0;
      }

      if (option === 'finishes') {
        showIcon = finishScenes.length > 0;
      }

      return showIcon;
    });
  }

  static getExpanded(state) {
    return state.threeSixty.expanded;
  }

  static getselectedMenuOption(state) {
    return state.threeSixty.selectedMenuOption;
  }

  static addMenuClass(expanded, selectedMenuOption, ownProps) {
    console.log('add', ownProps);
    return (
      expanded &&
      selectedMenuOption !== 'mini-map' &&
      selectedMenuOption !== undefined &&
      selectedMenuOption !== ''
    );
  }

  static getSelectedStyle(state) {
    return state.threeSixty.selectedStyle === 'default'
      ? state.threeSixty.defaultStyle
      : state.threeSixty.selectedStyle;
  }
}

export const menuOptionsSelector = createSelector(
  [
    MenuSelector.getOptions,
    MenuSelector.getShoppingCarItems,
    MenuSelector.getRoomUse,
    MenuSelector.getFinishScenes
  ],
  MenuSelector.filterMenuOptions
);

export const menuClassSelector = createSelector(
  [MenuSelector.getExpanded, MenuSelector.getselectedMenuOption],
  MenuSelector.addMenuClass
);

export const menuOptionSelector = createSelector(
  [MenuSelector.getselectedMenuOption],
  (selectedMenuOption) => selectedMenuOption
);

export const getSelectedStyle = createSelector(
  [MenuSelector.getSelectedStyle],
  (selectedStyle) => selectedStyle
);

export const isPortraitSelector = () => isTablet() && isPortrait();
