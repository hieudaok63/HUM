/* eslint-disable class-methods-use-this */
import SessionAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class PanoramaReducer extends BaseReducer {
  initialState = {
    panoramaInfo: {},
    container: null
  };

  [SessionAction.CONTAINER_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      container: action.payload
    };
  }

  [SessionAction.PANORAMA_INFO_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      panoramaInfo: action.payload
    };
  }
}
