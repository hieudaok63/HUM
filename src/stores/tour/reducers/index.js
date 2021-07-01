/* eslint-disable class-methods-use-this */

import BaseReducer from '../../../utilities/BaseReducer';
import TourAction from '../actions';
import Tour from '../models';

export default class TourReducer extends BaseReducer {
  initialState = {
    ...new Tour(),
    selectedFloorplan: {},
    type: 'three-sixty'
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
}
