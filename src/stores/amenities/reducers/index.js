/* eslint-disable class-methods-use-this */

import BaseReducer from '../../../utilities/BaseReducer';
import AmenitiesActions from '../actions';

export default class AmenitiesReducer extends BaseReducer {
  initialState = {
    image: '',
    pano: null,
    container: null,
    selectedAmenity: '',
    amenity: [],
    spots: [],
    language: '',
    content: null
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

  [AmenitiesActions.SET_PANO_SPOTS_FINISHED](state, action) {
    return {
      ...state,
      spots: action.payload
    };
  }

  [AmenitiesActions.SET_AMENITY_FINISHED](state, action) {
    return {
      ...state,
      amenity: action.payload
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

  [AmenitiesActions.CHANGE_LANGUAGE_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      language: action.payload
    };
  }

  [AmenitiesActions.SET_SELECTED_CONTENT_FINISHED](state, action) {
    return {
      ...state,
      content: action.payload
    };
  }
}
