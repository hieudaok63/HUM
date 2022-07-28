import { createSelector } from 'reselect';

export class AmenitiesSelector {
  static getImage(state) {
    return state.amenities.image;
  }

  static getPano(state) {
    return state.amenities.pano;
  }

  static getAmenity(state) {
    return state.amenities.amenity;
  }

  static getSelectedAmenity(state) {
    return state.amenities.selectedAmenity;
  }

  static getSelectedContent(state) {
    return state.amenities.content;
  }
}

export const imageSelector = createSelector(
  [AmenitiesSelector.getImage],
  (image) => image
);

export const panoSelector = createSelector(
  [AmenitiesSelector.getPano],
  (pano) => pano
);

export const amenitySelector = createSelector(
  [AmenitiesSelector.getAmenity],
  (amenity) => amenity
);

export const selectedAmenitySelector = createSelector(
  [AmenitiesSelector.getSelectedAmenity],
  (selectedAmenity) => selectedAmenity
);

export const selectedContentSelector = createSelector(
  [AmenitiesSelector.getSelectedContent],
  (selectedContent) => selectedContent
);
