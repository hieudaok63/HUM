/* eslint-disable class-methods-use-this */
import PanoramaActions from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class PanoramaReducer extends BaseReducer {
  initialState = {
    panoramaInfo: {},
    container: null,
    panorama: null
  };

  [PanoramaActions.CONTAINER_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      container: action.payload
    };
  }

  [PanoramaActions.PANORAMA_INFO_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      panoramaInfo: action.payload
    };
  }

  [PanoramaActions.PANORAMA_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      panorama: action.payload
    };
  }
}
