/* eslint-disable class-methods-use-this */
import ThreeSixtyAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class ThreeSixtyReducer extends BaseReducer {
  initialState = {
    builderId: '',
    projectId: '',
    layoutName: '',
    displayName: '',
    defaultStyle: '',
    language: '',
    levels: [],
    styles: [],
    area: 0,
    bathrooms: 0,
    bedrooms: 0,
    features: [],
    floorPlanId: null,
    parking: 0,
    unit: '',
    level: {},
    selectedScene: 'default',
    selectedFinish: 'default',
    selectedStyle: 'default',
    selectedStyleName: 'default',
    currentRoomUse: 'default',
    currentLevel: 0,
    mode: 'day',
    selectedMenuOption: '',
    levelScenes: [],
    showLoader: false,
    autoTour: 0,
    autoRotate: false
  };

  [ThreeSixtyAction.SET_THREESIXTY_DATA_FINISHED](state, action) {
    return {
      ...state,
      builderId: action.payload.builderId,
      projectId: action.payload.projectId,
      layoutName: action.payload.layoutName,
      displayName: action.payload.displayName,
      defaultStyle: action.payload.defaultStyle,
      selectedStyle: action.payload.defaultStyle,
      levels: action.payload.levels,
      styles: action.payload.styles,
      area: action.payload.area,
      bathrooms: action.payload.bathrooms,
      bedrooms: action.payload.bedrooms,
      features: action.payload.features,
      floorPlanId: action.payload.floorPlanId,
      parking: action.payload.parking,
      unit: action.payload.unit,
      level: action.payload.level,
      levelScenes: action.payload.levelScenes,
      selectedScene: action.payload.selectedScene,
      autoRotate: action.payload.autoRotate
    };
  }

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

  [ThreeSixtyAction.GET_FURNITURE_BY_STYLES_REQUEST_FINISHED](state, action) {
    return { ...state, furniture: action.payload.furniture };
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

  [ThreeSixtyAction.SET_SELECTED_STYLE_NAME_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      selectedStyleName: action.payload
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

  [ThreeSixtyAction.SELECTED_USE_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      currentRoomUse: action.payload
    };
  }

  [ThreeSixtyAction.CURRENT_LEVEL_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      currentLevel: action.payload
    };
  }

  [ThreeSixtyAction.GET_360_ITEM_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      threeSixtyItem: action.payload.threeSixty,
      levelsWithScenes: action.payload.levels
    };
  }

  [ThreeSixtyAction.CHANGE_LANGUAGE_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      language: action.payload
    };
  }

  [ThreeSixtyAction.RESET_REQUEST_FINISHED](state) {
    return {
      ...state,
      builderId: '',
      projectId: '',
      layoutName: '',
      displayName: '',
      defaultStyle: '',
      levels: [],
      styles: [],
      area: 0,
      bathrooms: 0,
      bedrooms: 0,
      features: [],
      floorPlanId: null,
      parking: 0,
      unit: '',
      level: {},
      selectedScene: 'default',
      selectedFinish: 'default',
      selectedStyle: 'default',
      selectedStyleName: 'default',
      currentRoomUse: 'default',
      currentLevel: 0,
      mode: 'day',
      selectedMenuOption: '',
      levelScenes: [],
      showLoader: false,
      autoTour: 0,
      autoRotate: false
    };
  }

  [ThreeSixtyAction.CHANGE_FLOORPLAN_MENU_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      showLoader: action.payload
    };
  }

  [ThreeSixtyAction.SET_AUTO_TOUR_FINISHED](state, action) {
    return {
      ...state,
      autoTour: action.payload
    };
  }
}
