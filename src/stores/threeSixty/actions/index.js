import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import ActionUtility from '../../../utilities/ActionUtility';
import ThreeSixtyEffect from '../effects';

export default class ThreeSixtyAction {
  static SAVE_LOG_REQUEST = 'SAVE_LOG_REQUEST';

  static SAVE_LOG_REQUEST_FINISHED = 'SAVE_LOG_REQUEST_FINISHED';

  static VIEW_MENU_REQUEST = 'ThreeSixtyAction.VIEW_MENU_REQUEST';

  static VIEW_MENU_REQUEST_FINISHED =
    'ThreeSixtyAction.VIEW_MENU_REQUEST_FINISHED';

  static STYLE_MENU_REQUEST = 'ThreeSixtyAction.STYLE_MENU_REQUEST';

  static STYLE_MENU_REQUEST_FINISHED =
    'ThreeSixtyAction.STYLE_MENU_REQUEST_FINISHED';

  static THREE_SIXTY_DATA_REQUEST = 'ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST';

  static THREE_SIXTY_DATA_REQUEST_FINISHED =
    'ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST_FINISHED';

  static GET_FURNITURE_BY_STYLES_REQUEST = 'GET_FURNITURE_BY_STYLES_REQUEST';

  static GET_FURNITURE_BY_STYLES_REQUEST_FINISHED =
    'GET_FURNITURE_BY_STYLES_REQUEST_FINISHED';

  static CLICK_FURNITURE_REQUEST_FINISHED = 'CLICK_FURNITURE_REQUEST_FINISHED';

  static RESET_REQUEST_FINISHED = 'RESET_REQUEST_FINISHED';

  static SET_TOUR_360_REQUEST_FINISHED = 'SET_TOUR_360_REQUEST_FINISHED';

  static SET_PREVIEW_REQUEST_FINISHED = 'SET_PREVIEW_REQUEST_FINISHED';

  static SET_SURVEY_REQUEST_FINISHED = 'SET_SURVEY_REQUEST_FINISHED';

  static SET_SELECTED_STYLE_REQUEST_FINISHED =
    'SET_SELECTED_STYLE_REQUEST_FINISHED';

  static SET_SELECTED_SCENE_REQUEST_FINISHED =
    'SET_SELECTED_SCENE_REQUEST_FINISHED';

  static SET_SELECTED_FINISH_REQUEST_FINISHED =
    'SET_SELECTED_FINISH_REQUEST_FINISHED';

  static EXPAND_REQUEST_FINISHED = 'EXPAND_REQUEST_FINISHED';

  static SET_BUILDER_REQUEST_FINISHED = 'SET_BUILDER_REQUEST_FINISHED';

  static SELECTED_MENU_OPTION_REQUEST_FINISHED =
    'SELECTED_MENU_OPTION_REQUEST_FINISHED';

  static SELECTED_USE_REQUEST_FINISHED = 'SELECTED_USE_REQUEST_FINISHED';

  static CURRENT_LEVEL_REQUEST_FINISHED = 'CURRENT_LEVEL_REQUEST_FINISHED';

  static GET_360_ITEM_REQUEST = 'GET_360_ITEM_REQUEST';

  static GET_360_ITEM_REQUEST_FINISHED = 'GET_360_ITEM_REQUEST_FINISHED';

  static CHANGE_SCENE_SPHERE_REQUEST = 'CHANGE_SCENE_SPHERE_REQUEST';

  static CHANGE_SCENE_SPHERE_REQUEST_FINISHED =
    'CHANGE_SCENE_SPHERE_REQUEST_FINISHED';

  static UPDATE_SPHERES_FINISHES_REQUEST = 'UPDATE_SPHERES_FINISHES_REQUEST';

  static UPDATE_SPHERES_FINISHES_REQUEST_FINISHED =
    'UPDATE_SPHERES_FINISHES_REQUEST_FINISHED';

  static getScenes() {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle,
        mode
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.VIEW_MENU_REQUEST,
        ThreeSixtyEffect.getScenes,
        language,
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle,
        mode
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getStyles() {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedScene,
        mode
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.STYLE_MENU_REQUEST,
        ThreeSixtyEffect.getStyles,
        language,
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedScene,
        mode
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getRoomUseWithFinishes() {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle,
        selectedScene,
        selectedFinish,
        roomUse,
        mode
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST,
        ThreeSixtyEffect.getRoomUseWithFinishes,
        language,
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle,
        selectedScene,
        roomUse,
        mode,
        selectedFinish
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getScenesByStyles() {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST,
        ThreeSixtyEffect.getScenesByStyles,
        language,
        builderId,
        propertyId,
        layoutName,
        currentLevel,
        selectedStyle
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getFurnitureByStyles(builderId, projectId) {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        selectedStyle,
        selectedScene,
        displayName,
        currentLevel
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.GET_FURNITURE_BY_STYLES_REQUEST,
        ThreeSixtyEffect.getFurnitureByStyles,
        language,
        builderId,
        projectId,
        [selectedStyle],
        selectedScene,
        displayName,
        currentLevel
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static furnitureCount(body) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CLICK_FURNITURE_REQUEST_FINISHED,
        ThreeSixtyEffect.furnitureCount,
        language,
        body
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static reset() {
    return ActionUtility.createAction(
      ThreeSixtyAction.RESET_REQUEST_FINISHED,
      ''
    );
  }

  static saveLog(log) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SAVE_LOG_REQUEST,
        ThreeSixtyEffect.saveLog,
        language,
        log
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static get360Item() {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const {
        builderId,
        propertyId,
        layoutName,
        selectedScene,
        selectedStyle,
        currentLevel
      } = threeSixty;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.GET_360_ITEM_REQUEST,
        ThreeSixtyEffect.get360Item,
        language,
        builderId,
        propertyId,
        layoutName,
        selectedScene,
        selectedStyle,
        currentLevel
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static changeSceneSphere() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { selectedScene } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CHANGE_SCENE_SPHERE_REQUEST,
        ThreeSixtyEffect.changeSceneSphere,
        panorama,
        selectedScene
      );
    };
  }

  static updateFinishes() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { selectedFinish } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.UPDATE_SPHERES_FINISHES_REQUEST,
        ThreeSixtyEffect.updateSpheresFinishes,
        panorama,
        selectedFinish
      );
    };
  }

  static updateSpheres() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const {
        levels,
        selectedStyle,
        currentLevel,
        selectedScene,
        selectedFinish
      } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CHANGE_SCENE_SPHERE_REQUEST,
        ThreeSixtyEffect.updateSpheres,
        panorama,
        levels,
        currentLevel,
        selectedStyle,
        selectedScene,
        selectedFinish
      );
    };
  }

  static updateScenes() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { levelScenes, selectedScene } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CHANGE_SCENE_SPHERE_REQUEST,
        ThreeSixtyEffect.updateScenes,
        panorama,
        levelScenes.scenes,
        selectedScene
      );
    };
  }

  // maybe this ones can be selectors instead of actions

  static setBuilder(builder) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_BUILDER_REQUEST_FINISHED,
      builder
    );
  }

  static has360Tour(hasTour) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_TOUR_360_REQUEST_FINISHED,
      hasTour
    );
  }

  static isPreview(isPreview) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_PREVIEW_REQUEST_FINISHED,
      isPreview
    );
  }

  static isSurveryCompleted(isSurveryCompleted) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SURVEY_REQUEST_FINISHED,
      isSurveryCompleted
    );
  }

  //

  static setSelectedStyle(style) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_STYLE_REQUEST_FINISHED,
      style
    );
  }

  static setSelectedScene(scene) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_SCENE_REQUEST_FINISHED,
      scene
    );
  }

  static setSelectedFinish(finish) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_FINISH_REQUEST_FINISHED,
      finish
    );
  }

  static expandMenu(expand) {
    return ActionUtility.createAction(
      ThreeSixtyAction.EXPAND_REQUEST_FINISHED,
      expand
    );
  }

  static setSelectedMenuOption(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SELECTED_MENU_OPTION_REQUEST_FINISHED,
      option
    );
  }

  static setSelectedUse(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SELECTED_USE_REQUEST_FINISHED,
      option
    );
  }

  static setCurrentLevel(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.CURRENT_LEVEL_REQUEST_FINISHED,
      option
    );
  }
}
