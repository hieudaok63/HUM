import { createSelector } from 'reselect';

export class PanoramaSelector {
  static getPanorama(state) {
    return state.panorama.panorama;
  }
}

export const panoramaSelector = createSelector(
  [PanoramaSelector.getPanorama],
  (panorama) => panorama
);
