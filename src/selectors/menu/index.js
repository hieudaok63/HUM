import { createSelector } from 'reselect';
import { isPortrait, isTablet } from '../../utils';

export class MenuSelector {
  static getOptions(state) {
    return state.threeSixty.menuOptions;
  }

  static getShoppingCarItems(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].styles[0].scenes[0].uses[0].furniture
      : [];
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

  static getUses(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].styles[0].scenes[0].uses
      : [];
  }

  static filterMenuOptions(options, shoppingCarItems, roomUses, finishScenes) {
    return options.filter((option) => {
      let showIcon = true;
      if (option === 'furniture') {
        showIcon = shoppingCarItems.length > 0;
      }
      if (option === 'change-room') {
        showIcon = roomUses.length > 1;
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

  static addMenuClass(expanded, selectedMenuOption) {
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
    return state.threeSixty.levels.length > 0 &&
      state.threeSixty.selectedScene === 'default'
      ? state.threeSixty.levels[0].defaultScene
      : state.threeSixty.selectedScene;
  }

  static getSelectedFinish(state) {
    return state.threeSixty.levels.length > 0 &&
      state.threeSixty.selectedFinish === 'default'
      ? state.threeSixty.levels[0].styles[0].scenes[0].defaultFinish
      : state.threeSixty.selectedFinish;
  }

  static getCurrentRoomUse(state) {
    return state.threeSixty.levels.length > 0 &&
      state.threeSixty.currentRoomUse === 'default'
      ? state.threeSixty.levels[0].styles[0].scenes[0].defaultUse
      : state.threeSixty.currentRoomUse;
  }

  static getMapScenes(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].minimap.hotspots
      : [];
  }

  static getMapImage(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].minimap.image
      : '';
  }

  static getMapSize(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].minimap.mapSize
      : {};
  }

  static getShowMiniMap(state) {
    return (
      state.threeSixty.selectedMenuOption === 'mini-map' ||
      state.loading.loading
    );
  }

  static getTotalLevels(state) {
    return state.threeSixty.totalLevels;
  }

  static getCurrentLevel(state) {
    return state.threeSixty.levels.length > 0
      ? state.threeSixty.levels[0].levelNumber
      : 1;
  }

  static getMaxMapHeight(state) {
    const mapSize =
      state.threeSixty.levels.length > 0
        ? state.threeSixty.levels[0].minimap.mapSize
        : {};
    let maxMapHeight = 0;
    if (Object.keys(mapSize).length !== 0 && mapSize.constructor === Object) {
      maxMapHeight =
        Math.round(
          ((window.innerWidth - 160) * mapSize.desktop.width) /
            mapSize.desktop.height
        ) <
        window.innerHeight - 160
          ? Math.round(
              ((window.innerWidth - 160) * mapSize.desktop.width) /
                mapSize.desktop.height
            )
          : window.innerHeight - 160;
    }
    return maxMapHeight;
  }

  static getMaxMapWidth(state) {
    const mapSize =
      state.threeSixty.levels.length > 0
        ? state.threeSixty.levels[0].minimap.mapSize
        : {};
    let maxMapWidth = 0;
    if (Object.keys(mapSize).length !== 0 && mapSize.constructor === Object) {
      maxMapWidth =
        Math.round(
          ((window.innerWidth - 160) * mapSize.desktop.width) /
            mapSize.desktop.height
        ) <
        window.innerHeight - 160
          ? Math.round(
              ((window.innerWidth - 160) * mapSize.desktop.height) /
                mapSize.desktop.width
            )
          : Math.round(
              ((window.innerHeight - 160) * mapSize.desktop.height) /
                mapSize.desktop.width
            );
    }

    return maxMapWidth;
  }

  static size(mapSize, maxMapHeight, maxMapWidth) {
    console.log('size', mapSize, maxMapHeight, maxMapWidth);
    if (Object.keys(mapSize).length !== 0 && mapSize.constructor === Object) {
      return window.innerWidth < window.innerHeight &&
        mapSize.desktop.width > mapSize.desktop.height
        ? {
            width:
              window.innerWidth - 160 < mapSize.desktop.width
                ? maxMapHeight
                : mapSize.desktop.width,
            height:
              window.innerWidth - 160 < mapSize.desktop.width
                ? maxMapWidth
                : mapSize.desktop.height
          }
        : {
            width:
              window.innerWidth - 160 < mapSize.desktop.width
                ? window.innerWidth - 160
                : mapSize.desktop.width,
            height:
              window.innerWidth - 160 < mapSize.desktop.width
                ? Math.round(
                    ((window.innerWidth - 160) * mapSize.desktop.height) /
                      mapSize.desktop.width
                  )
                : mapSize.desktop.height
          };
    }
    return { width: 0, height: 0 };
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

export const getUses = createSelector([MenuSelector.getUses], (uses) => uses);

export const getCurrentRoomUse = createSelector(
  [MenuSelector.getCurrentRoomUse],
  (currentRoomUse) => currentRoomUse
);

export const mapScenesSelector = createSelector(
  [MenuSelector.getMapScenes],
  (mapScenes) => mapScenes
);

export const imageMapSelector = createSelector(
  [MenuSelector.getMapImage],
  (mapImage) => mapImage
);

export const mapSizeSelector = createSelector(
  [MenuSelector.getMapSize],
  (mapSize) => mapSize
);

export const showMiniMapSelector = createSelector(
  [MenuSelector.getShowMiniMap],
  (showMiniMap) => showMiniMap
);

export const totalLevelsSelector = createSelector(
  [MenuSelector.getTotalLevels],
  (totalLevels) => totalLevels
);

export const currentFloorSelector = createSelector(
  [MenuSelector.getCurrentLevel],
  (currentLevel) => currentLevel
);

export const sizeSelector = createSelector(
  [
    MenuSelector.getMapSize,
    MenuSelector.getMaxMapHeight,
    MenuSelector.getMaxMapWidth
  ],
  MenuSelector.size
);

export const isPortraitSelector = () => isTablet() && isPortrait();
