/* eslint-disable class-methods-use-this */

import BaseReducer from '../../../utilities/BaseReducer';
import AmenitiesActions from '../actions';

export default class AmenitiesReducer extends BaseReducer {
  initialState = {
    image: '',
    pano: null
  };

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
}
