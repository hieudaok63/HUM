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
