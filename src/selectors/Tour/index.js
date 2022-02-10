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
  static getFloorplanSectionName(state) {
    if (!state.language.language || !state.tour.floorplansSectionName)
      return '';

    return state.tour?.floorplansSectionName[state.language.language];
  }
  static getImageGallery(state) {
    return state.tour?.imageGallery;
  }
  static getVideoGallery(state) {
    return state.tour?.videoGallery;
  }
  static getGalleryImages(state) {
    return state.tour?.galleryImages;
  }
  static getGalleryVideos(state) {
    return state.tour?.galleryVideos;
  }
  static getBuilderId(state) {
    return state.tour.builderId;
  }
  static getMainPageSelector(state) {
    return state.tour.customPage.mainPage;
  }
  static getPresentialVisit(state) {
    return state.tour.customPage.presentialVisit;
  }
  static getVirtualVisit(state) {
    return state.tour.customPage.virtualVisit;
  }
  static getTimezone(state) {
    return state.tour.customPage.timeZone;
  }
  static getAvailableTimes(state) {
    return state.tour.availableTimes;
  }
  static getScheduleAMeetingStatus(state) {
    return state.tour.sheduleActive;
  }
  static getSavedSchedule(state) {
    return state.tour.savedSchedule;
  }
  static getCanSchedule(state) {
    return state.tour.canSchedule;
  }
  static getLeftMenuOpen(state) {
    return state.tour.leftMenuOpened;
  }

  static getDisabledActions(state) {
    return state.tour.disableActions;
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

export const floorplansSectionNameSelector = createSelector(
  [TourSelector.getFloorplanSectionName],
  (sectionName) => sectionName
);

export const imageGallerySelector = createSelector(
  [TourSelector.getImageGallery],
  (imageGallery) => imageGallery
);

export const videoGallerySelector = createSelector(
  [TourSelector.getVideoGallery],
  (videoGallery) => videoGallery
);

export const galleryImagesSelector = createSelector(
  [TourSelector.getGalleryImages],
  (gallery) => gallery
);

export const galleryVideosSelector = createSelector(
  [TourSelector.getGalleryVideos],
  (gallery) => gallery
);

export const builderIdSelector = createSelector(
  [TourSelector.getBuilderId],
  (builderId) => builderId
);

export const mainPageSelector = createSelector(
  [TourSelector.getMainPageSelector],
  (mainPage) => mainPage
);

export const presentialVisitSelector = createSelector(
  [TourSelector.getPresentialVisit],
  (presentialVisit) => presentialVisit
);

export const virtualVisitSelector = createSelector(
  [TourSelector.getVirtualVisit],
  (virtualVisit) => virtualVisit
);

export const timezoneSelector = createSelector(
  [TourSelector.getTimezone],
  (timezone) => timezone
);

export const availableTimesSelector = createSelector(
  [TourSelector.getAvailableTimes],
  (availableTimes) => availableTimes
);

export const scheduleAMeetingSelector = createSelector(
  [TourSelector.getScheduleAMeetingStatus],
  (scheduleMeeting) => scheduleMeeting
);

export const savedScheduleSelector = createSelector(
  [TourSelector.getSavedSchedule],
  (savedSchedule) => savedSchedule
);

export const canScheduleSelector = createSelector(
  [TourSelector.getCanSchedule],
  (canSchedule) => canSchedule
);

export const leftMenuOpenSelector = createSelector(
  [TourSelector.getLeftMenuOpen],
  (leftMenuOpen) => leftMenuOpen
);

export const disableActionsSelector = createSelector(
  [TourSelector.getDisabledActions],
  (disabledActions) => disabledActions
);
