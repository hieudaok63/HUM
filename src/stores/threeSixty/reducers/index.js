/* eslint-disable class-methods-use-this */
import ThreeSixtyAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class ThreeSixtyReducer extends BaseReducer {
  initialState = {
    scenes: [],
    menu: [],
    builderLogo: '',
    builderId: '',
    defaultStyle: '',
    displayName: '',
    language: '',
    layoutName: '',
    levels: [],
    personalized: {},
    projectId: 0,
    rotationMessage: '',
    shoppingCart: {},
    showError: false,
    surveyCompletedDefaults: {},
    totalLevels: 1,
    urls: {}
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

  [ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST](state, action) {
    return {
      ...state,
      builderId: action.payload.builderId,
      defaultStyle: action.payload.defaultStyle,
      displayName: action.payload.displayName,
      language: action.payload.language,
      layoutName: action.payload.layoutName,
      levels: action.payload.levels,
      personalized: action.payload.personalized,
      projectId: action.payload.projectId,
      rotationMessage: action.payload.rotationMessage,
      shoppingCart: action.payload.shoppingCart,
      showError: action.payload.showError,
      surveyCompletedDefaults: action.payload.surveyCompletedDefaults,
      totalLevels: action.payload.totalLevels,
      urls: action.payload.urls
    };
  }
}
