/* eslint-disable class-methods-use-this */
import LoadingAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class LoadingReducer extends BaseReducer {
  initialState = {
    loader: false
  };

  [LoadingAction.IS_LOADER](state, action) {
    return {
      ...state,
      loader: action.payload
    };
  }
}
