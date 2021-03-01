/* eslint-disable class-methods-use-this */
import LoadingAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class LoadingReducer extends BaseReducer {
  initialState = {
    loading: false,
    loader: false
  };

  [LoadingAction.IS_LOADING](state, action) {
    return {
      ...state,
      loading: action.payload
    };
  }

  [LoadingAction.IS_LOADER](state, action) {
    return {
      ...state,
      loader: action.payload
    };
  }
}
