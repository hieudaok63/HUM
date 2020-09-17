import * as Types from '../actions/session/types';

const initialState = {
  loading: true,
  firstLoad: true,
  loadingSign: false,
  error: '',
  errorScenes: false,
  user: {},
  email: '',
  token: '',
  refreshToken: '',
  authTime: '',
  expirationTime: 0,
  guestModeId: '',
  tour360: false,
  viewer: {},
  menu: [],
  personalized: {},
  levels: [],
  scenes: [],
  furniture: [],
  selectedStyle: 'default',
  selectedStyleName: 'default',
  selectedScene: 'default',
  selectedFinish: 'default',
  selectedMenuOption: '',
  selectedMobileMenuOption: '',
  expanded: true,
  currentLevel: 1,
  layoutName: '',
  displayName: '',
  levelMinimap: '',
  levelPosition: {
    bottom: '0px',
    right: '0px'
  },
  avriaUri: '',
  takeTestUri: '',
  rotationMessage: '',
  isPreview: false,
  isSurveyCompleted: false,
  shoppingMenu: false,
  showShoppingCar: false,
  shoppingMenuTitle: '',
  registerUrl: '',
  language: '',
  runRide: false,
  stepIndex: 0,
  cardBoardMode: false,
  rotationModal: false,
  totalPages: 0,
  totalLevels: 0,
  roomUse: [],
  miniMapHotspots: [],
  currentRoomUse: 'default',
  cardboardMessage: false,
  log: {},
  builderId: '',
  projectId: '',
  mapSize: {},
  threeSixty: {},
  finishScenes: {},
  builderLogo: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_START:
      return {
        ...state,
        loadingSign: true,
        error: ''
      };
    case Types.LOGIN_SUCCESS: {
      const {
        user,
        email,
        token,
        refreshToken,
        authTime,
        expirationTime
      } = action;
      return {
        ...state,
        loadingSign: false,
        error: '',
        user,
        email,
        token,
        refreshToken,
        authTime,
        expirationTime
      };
    }
    case Types.LOGIN_FAIL: {
      const { error } = action;
      return {
        ...state,
        loadingSign: false,
        error
      };
    }
    case Types.GET_FURNITURE_BY_STYLES_START:
      return {
        ...state,
        error: '',
        furniture: []
      };
    case Types.GET_FURNITURE_BY_STYLES_SUCCESS: {
      const { furniture } = action;
      return {
        ...state,
        furniture
      };
    }
    case Types.GET_FURNITURE_BY_STYLES_FAIL: {
      const { error } = action;
      return {
        ...state,
        error
      };
    }
    case Types.SAVE_FAVORITE_FURNITURE_START:
      return {
        ...state,
        error: ''
      };
    case Types.SAVE_FAVORITE_FURNITURE_SUCCESS: {
      const { furniture } = action;
      return {
        ...state,
        furniture
      };
    }
    case Types.SAVE_FAVORITE_FURNITURE_FAIL: {
      const { error } = action;
      return {
        ...state,
        error
      };
    }
    case Types.CLICK_FURNITURE_START:
      return {
        ...state,
        error: ''
      };
    case Types.CLICK_FURNITURE_SUCCESS:
      return {
        ...state
      };
    case Types.CLICK_FURNITURE_FAIL: {
      const { error } = action;
      return {
        ...state,
        error
      };
    }
    case Types.GET_SCENES_START:
      return {
        ...state,
        loading: true,
        errorScenes: false
      };
    case Types.GET_SCENES_FAIL: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
        errorScenes: true
      };
    }
    case Types.SET_NO_TOUR_360:
      return {
        ...state,
        tour360: false
      };
    case Types.SET_PREVIEW: {
      const { preview } = action;
      return {
        ...state,
        isPreview: preview
      };
    }
    case Types.SET_SURVEY_COMPLETED: {
      const { surveyCompleted } = action;
      return {
        ...state,
        isSurveyCompleted: surveyCompleted
      };
    }
    case Types.SET_VIEWER: {
      const { viewer } = action;
      return {
        ...state,
        viewer
      };
    }
    case Types.SET_360_DATA: {
      const {
        levelPosition,
        displayName,
        selectedStyleName,
        selectedStyle,
        personalized,
        levelMinimap,
        takeTestUri,
        currentLevel,
        registerUri,
        rotationMessage,
        shoppingMenuTitle,
        showShoppingCar,
        totalPages,
        selectedScene,
        miniMapHotspots,
        totalLevels,
        layoutName,
        roomUse,
        currentRoomUse,
        furniture,
        builderId,
        projectId,
        mapSize,
        threeSixty,
        finishScenes,
        builderLogo
      } = action;
      return {
        ...state,
        levelPosition,
        displayName,
        selectedStyleName,
        selectedStyle,
        personalized,
        takeTestUri,
        levelMinimap,
        currentLevel,
        registerUrl: registerUri,
        rotationMessage,
        shoppingMenuTitle,
        showShoppingCar,
        totalPages,
        selectedScene,
        miniMapHotspots,
        totalLevels,
        layoutName,
        roomUse,
        currentRoomUse,
        furniture,
        builderId,
        projectId,
        mapSize,
        threeSixty,
        finishScenes,
        builderLogo
      };
    }
    case Types.SET_SELECTED_SCENE: {
      const { selectedScene: newSelectedScene } = action;
      return {
        ...state,
        selectedScene: newSelectedScene
      };
    }
    case Types.SET_SELECTED_FINISH:
      return {
        ...state,
        selectedFinish: action.selectedScene
      };
    case Types.SET_LEVEL_UPDATED: {
      const { data } = action;
      return {
        ...state,
        ...data
      };
    }
    case Types.SET_STYLE_START:
      return {
        ...state,
        loading: true
      };
    case Types.SET_CHILD_SCENE_START:
      return {
        ...state,
        loading: true
      };
    case Types.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case Types.GET_360_VIEW_MENU_START:
      return {
        ...state,
        errorScenes: false
      };
    case Types.GET_360_VIEW_MENU_SUCCESS: {
      const { viewMenu } = action;
      return {
        ...state,
        scenes: viewMenu
      };
    }
    case Types.GET_360_VIEW_MENU_FAIL: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
        errorScenes: true
      };
    }
    case Types.GET_360_STYLE_MENU_START:
      return {
        ...state,
        errorScenes: false
      };
    case Types.GET_360_STYLE_MENU_SUCCESS: {
      const { menu } = action;
      return {
        ...state,
        menu
      };
    }
    case Types.GET_360_STYLE_MENU_FAIL: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
        errorScenes: true
      };
    }
    case Types.IS_CARDBOARD: {
      const { cardboard } = action;
      return {
        ...state,
        cardboardMessage: cardboard
      };
    }
    case Types.RESET:
      return {
        ...initialState
      };
    case Types.ADD_LOG:
      return {
        ...state
      };
    case Types.ADD_LOG_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};
