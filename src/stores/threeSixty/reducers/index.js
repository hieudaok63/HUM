/* eslint-disable class-methods-use-this */
import ThreeSixtyAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class ThreeSixtyReducer extends BaseReducer {
  initialState = {
    scenes: [],
    menu: [],
    builderLogo: '',
    builderId: '',
    propertyId: '',
    layoutName: '',
    defaultStyle: '',
    displayName: '',
    language: '',
    levels: [],
    furniture: [],
    roomUse: [],
    finishScenes: {},
    personalized: {},
    projectId: 0,
    rotationMessage: '',
    shoppingCart: {},
    showError: false,
    surveyCompletedDefaults: {},
    totalLevels: 1,
    urls: {},
    isPreview: false,
    isSurveyCompleted: false,
    selectedScene: 'default',
    selectedFinish: 'default',
    selectedStyle: 'default',
    selectedStyleName: 'default',
    currentLevel: 1,
    mode: 'day',
    tour360: false,
    expanded: false,
    selectedMenuOption: '',
    menuOptions: [
      'mini-map',
      'views',
      'styles',
      'furniture',
      'change-room',
      'finishes'
    ],
    threeSixty: null
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

  [ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST_FINISHED](state, action) {
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

  [ThreeSixtyAction.GET_FURNITURE_BY_STYLES_REQUEST_FINISHED](state, action) {
    return { ...state, furniture: action.payload.furniture };
  }

  [ThreeSixtyAction.SET_BUILDER_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      builderId: action.payload.builderId,
      propertyId: action.payload.projectId,
      displayName: action.payload.layoutName
    };
  }

  [ThreeSixtyAction.SET_PREVIEW_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      isPreview: action.payload
    };
  }

  [ThreeSixtyAction.SET_SURVEY_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      isSurveyCompleted: action.payload
    };
  }

  [ThreeSixtyAction.SET_SELECTED_STYLE_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedStyle: action.payload
    };
  }

  [ThreeSixtyAction.SET_SELECTED_SCENE_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedScene: action.payload
    };
  }

  [ThreeSixtyAction.SET_SELECTED_FINISH_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedFinish: action.payload
    };
  }

  [ThreeSixtyAction.SET_TOUR_360_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      tour360: action.payload
    };
  }

  [ThreeSixtyAction.EXPAND_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      expanded: action.payload
    };
  }

  [ThreeSixtyAction.SELECTED_MENU_OPTION_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedMenuOption: action.payload
    };
  }

  [ThreeSixtyAction.RESET_REQUEST_FINISHED]() {
    return {
      ...this.initialState
    };
  }
}
