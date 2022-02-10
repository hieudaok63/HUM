import { createSelector } from 'reselect';
import { getFinishes, getSelectedFinish } from './utils';

export class ThreeSixtySelector {
  static getScenes(state) {
    return state.threeSixty.levelScenes;
  }
  static getStyles(state) {
    return state.threeSixty.styles;
  }
  static getSelectedStyle(state) {
    return state.threeSixty.selectedStyle;
  }
  static getMinimap(state) {
    return state.threeSixty.level.minimap;
  }
  static getFloorplanFeatures(state) {
    const {
      area,
      bathrooms,
      bedrooms,
      unit,
      parking,
      displayName
    } = state.threeSixty;
    return { area, bathrooms, bedrooms, unit, parking, displayName };
  }
  static getFeatures(state) {
    return state.threeSixty.features;
  }
  static getSelectedScene(state) {
    return state.threeSixty.selectedScene;
  }
  static getLanguage(state) {
    return state.threeSixty.language;
  }
  static getFinishes(state) {
    return getFinishes(
      state.threeSixty.currentRoomUse,
      state.threeSixty.selectedFinish,
      state.threeSixty.selectedScene,
      state.threeSixty.levelScenes
    );
  }
  static getSelectedFinish(state) {
    return getSelectedFinish(
      state.threeSixty.currentRoomUse,
      state.threeSixty.selectedFinish,
      state.threeSixty.selectedScene,
      state.threeSixty.levelScenes
    );
  }
}

export const sceneSelector = createSelector(
  [ThreeSixtySelector.getScenes],
  (scenes) => scenes
);

export const stylesSelector = createSelector(
  [ThreeSixtySelector.getStyles],
  (styles) => styles
);

export const selectedStyleSelector = createSelector(
  [ThreeSixtySelector.getSelectedStyle],
  (selectedStyle) => selectedStyle
);

export const minimapSelector = createSelector(
  [ThreeSixtySelector.getMinimap],
  (minimap) => minimap
);

export const floorplanFeaturesSelector = createSelector(
  [ThreeSixtySelector.getFloorplanFeatures],
  (floorplanFeatures) => floorplanFeatures
);

export const featuresSelector = createSelector(
  [ThreeSixtySelector.getFeatures],
  (features) => features
);

export const selectedSceneSelector = createSelector(
  [ThreeSixtySelector.getSelectedScene],
  (selectedScene) => selectedScene
);

export const languageSelector = createSelector(
  [ThreeSixtySelector.getLanguage],
  (language) => language
);

export const finishesSelector = createSelector(
  [ThreeSixtySelector.getFinishes],
  (finishes) => finishes
);

export const selectedFinishSelector = createSelector(
  [ThreeSixtySelector.getSelectedFinish],
  (finish) => finish
);
