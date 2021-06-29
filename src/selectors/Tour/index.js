import { createSelector } from 'reselect';

export class TourSelector {
  static getFloorplans(state) {
    return state.tour.floorplans;
  }
  static getLevels(state) {
    const { threeSixty } = state;
    const { levels } = threeSixty;
    return levels || [];
  }
}

export const floorplansSelector = createSelector(
  [TourSelector.getFloorplans],
  (floorplans) => floorplans
);

export const levelsSelector = createSelector(
  [TourSelector.getLevels],
  (levels) => levels
);
