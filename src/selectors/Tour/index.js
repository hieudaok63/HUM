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
  static getAvailableLanguages(state) {
    const { tour } = state;
    return tour.availableLanguages;
  }
  static getDefaultLanguage(state) {
    const { tour } = state;
    return tour.defaultLanguage;
  }
  static getSections(state) {
    const { tour } = state;
    return tour.sections;
  }
  static getType(state) {
    return state.tour.type;
  }
  static getTour(state) {
    return state.tour;
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

export const availableLanguagesSelector = createSelector(
  [TourSelector.getAvailableLanguages],
  (availableLanguages) => availableLanguages
);

export const defaultLanguageSelector = createSelector(
  [TourSelector.getDefaultLanguage],
  (defaultLanguage) => defaultLanguage
);

export const sectionsSelector = createSelector(
  [TourSelector.getSections],
  (sections) => sections
);

export const typeSelector = createSelector(
  [TourSelector.getType],
  (type) => type
);

export const tourSelector = createSelector(
  [TourSelector.getTour],
  (tour) => tour
);
