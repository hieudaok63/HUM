/* eslint-disable class-methods-use-this */

import BaseReducer from '../../../utilities/BaseReducer';
import TourAction from '../actions';
import Tour from '../models';

export default class TourReducer extends BaseReducer {
  initialState = {
    ...new Tour(),
    selectedFloorplan: {},
    type: 'three-sixty',
    imageGallery: false,
    videoGallery: false,
    galleryImages: [],
    galleryVideos: []
  };

  [TourAction.TOUR_DATA_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      ...new Tour(action.payload)
    };
  }

  [TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED](state, action) {
    return {
      ...state,
      selectedFloorplan: action.payload
    };
  }

  [TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED](state, action) {
    return {
      ...state,
      selectedFloorplan: action.payload
    };
  }

  [TourAction.TOUR_SELECTED_TYPE_FINISHED](state, action) {
    return {
      ...state,
      type: action.payload
    };
  }

  [TourAction.TOUR_IMAGE_GALLEY_FINISHED](state, action) {
    return {
      ...state,
      imageGallery: action.payload
    };
  }

  [TourAction.TOUR_VIDEO_GALLERY_FINISHED](state, action) {
    return {
      ...state,
      videoGallery: action.payload
    };
  }

  [TourAction.TOUR_GALLEY_IMAGES_FINISHED](state, action) {
    return {
      ...state,
      galleryImages: action.payload
    };
  }

  [TourAction.TOUR_GALLEY_VIDEOS_FINISHED](state, action) {
    return {
      ...state,
      galleryVideos: action.payload
    };
  }
}
