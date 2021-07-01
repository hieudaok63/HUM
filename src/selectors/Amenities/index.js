import { createSelector } from 'reselect';

export class AmenitiesSelector {
  static getImage(state) {
    return state.amenities.image;
  }

  static getPano(state) {
    return state.amenities.pano;
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
