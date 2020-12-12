import { createSelector } from 'reselect';

export class ThreeSixtySelector {
  static getScenes(state) {
    return state.threeSixty.scenes;
  }
}

export const sceneSelector = createSelector(
  [ThreeSixtySelector.getScenes],
  (scenes) => scenes
);
