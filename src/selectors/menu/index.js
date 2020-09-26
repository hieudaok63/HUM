import { createSelector } from 'reselect';
import { isPortrait, isTablet } from '../../utils';

export class MenuSelector {
  static getOptions(state) {
    return state.threeSixty.menuOptions;
  }

  static getShoppingCarItems(state) {
    return state.threeSixty.furniture;
  }

  static getRoomUses(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].styles[0].scenes[0].uses
      : [];
  }

  static getFinishScenes(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].styles[0].scenes[0].uses[0].finishScenes
      : [];
  }

  static filterMenuOptions(options, shoppingCarItems, roomUses, finishScenes) {
    return options.filter((option) => {
      let showIcon = true;
      if (option === 'furniture') {
        showIcon = shoppingCarItems.length > 0;
      }
      if (option === 'change-room') {
        showIcon = roomUses.length > 0;
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

  static getSelectedScene(state) {
    return state.threeSixty.selectedScene === 'default'
      ? state.threeSixty.levels[0].defaultScene
      : state.threeSixty.selectedScene;
  }

  static getSelectedFinish(state) {
    return state.threeSixty.selectedFinish === 'default'
      ? state.threeSixty.levels[0].styles[0].scenes[0].defaultFinish
      : state.threeSixty.selectedFinish;
  }
}

export const menuOptionsSelector = createSelector(
  [
    MenuSelector.getOptions,
    MenuSelector.getShoppingCarItems,
    MenuSelector.getRoomUses,
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

export const getSelectedScene = createSelector(
  [MenuSelector.getSelectedScene],
  (selectedScene) => selectedScene
);

export const getFinishScenes = createSelector(
  [MenuSelector.getFinishScenes],
  (finishScenes) => finishScenes
);

export const getSelectedFinish = createSelector(
  [MenuSelector.getSelectedFinish],
  (selectedFinish) => selectedFinish
);

export const isPortraitSelector = () => isTablet() && isPortrait();
