/* eslint-disable class-methods-use-this */

import BaseReducer from '../../../utilities/BaseReducer';
import AmenitiesActions from '../actions';

export default class AmenitiesReducer extends BaseReducer {
  initialState = {
    image: '',
    pano: null,
    container: null,
    selectedAmenity: ''
  };

  [AmenitiesActions.SET_SELECTED_AMENITY_FINISHED](state, action) {
    return {
      ...state,
      selectedAmenity: action.payload
    };
  }

  [AmenitiesActions.SET_2D_IMAGE_FINISHED](state, action) {
    return {
      ...state,
      image: action.payload,
      pano: null
    };
  }

  [AmenitiesActions.SET_PANO_FINISHED](state, action) {
    return {
      ...state,
      pano: action.payload,
      image: ''
    };
  }

  [AmenitiesActions.CREATE_PANORAMA_FINISHED](state, action) {
    return {
      ...state,
      pano: action.payload
    };
  }

  [AmenitiesActions.SET_PANO_CONTAINER_FINISHED](state, action) {
    return {
      ...state,
      container: action.payload
    };
  }

  [AmenitiesActions.RESET_AMENITIES_FINISHED]() {
    return {
      ...this.initialState
    };
  }
}
