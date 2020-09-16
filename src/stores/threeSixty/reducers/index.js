/* eslint-disable class-methods-use-this */
import ThreeSixtyAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class ThreeSixtyReducer extends BaseReducer {
  initialState = {
    scenes: [],
    menu: [],
    builderLogo: ''
  };

  [ThreeSixtyAction.VIEW_MENU_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      scenes: action.payload.scenes,
      builderLogo: action.payload.builderLogo
    };
  }

  [ThreeSixtyAction.STYLE_MENU_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      menu: action.payload.menu
    };
  }
}
