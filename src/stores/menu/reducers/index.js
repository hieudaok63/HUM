/* eslint-disable class-methods-use-this */
import MenuAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class MenuReducer extends BaseReducer {
  initialState = {
    selectedMenuItem: 1,
    selectedPropertyMenuItem: 0,
    interactiveMapLocation: {}
  };

  [MenuAction.SET_SELECTED_MENU_ITEM](state, action) {
    return {
      ...state,
      selectedMenuItem: action.payload.selectedMenuItem
    };
  }

  [MenuAction.SET_SELECTED_PROPERTY_MENU_ITEM](state, action) {
    return {
      ...state,
      selectedPropertyMenuItem: action.payload.selectedPropertyMenuItem
    };
  }

  [MenuAction.STORE_INTERACTIVE_MAP_SECTION_SUCCESSFUL](state, action) {
    return {
      ...state,
      interactiveMapLocation: action.payload.interactiveMapLocation
    };
  }
}
