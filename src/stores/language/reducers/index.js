/* eslint-disable class-methods-use-this */
import LanguageAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class LanguageReducer extends BaseReducer {
  initialState = {
    language: ''
  };

  [LanguageAction.SET_LANGUAGE](state, action) {
    return {
      ...state,
      language: action.payload
    };
  }
}
