import { createSelector } from 'reselect';

export class TourSelector {
  static getFloorplans(state) {
    return state.tour.floorplans;
  }
}

export const floorplansSelector = createSelector(
  [TourSelector.getFloorplans],
  (floorplans) => floorplans
);
