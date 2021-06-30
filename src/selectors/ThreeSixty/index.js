import { createSelector } from 'reselect';

export class ThreeSixtySelector {
  static getScenes(state) {
    return state.threeSixty.scenes;
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
    const { area, bathrooms, bedrooms, unit, parking } = state.threeSixty;
    return { area, bathrooms, bedrooms, unit, parking };
  }
  static getSelectedScene(state) {
    return state.threeSixty.selectedScene;
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

export const selectedSceneSelector = createSelector(
  [ThreeSixtySelector.getSelectedScene],
  (selectedScene) => selectedScene
);
