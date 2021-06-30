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
  static getLogo(state) {
    const { tour } = state;
    const { logo } = tour;
    return logo || {};
  }
  static getSelectedFloorplan(state) {
    const { tour } = state;
    const { selectedFloorplan } = tour;
    return selectedFloorplan || 0;
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

export const logoSelector = createSelector(
  [TourSelector.getLogo],
  (logo) => logo
);

export const selectedFloorplanSelector = createSelector(
  [TourSelector.getSelectedFloorplan],
  (selectedFloorplan) => selectedFloorplan
);
