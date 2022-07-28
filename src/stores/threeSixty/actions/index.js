import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import ActionUtility from '../../../utilities/ActionUtility';
import ThreeSixtyEffect from '../effects';

export default class ThreeSixtyAction {
  // new
  static SET_THREESIXTY_DATA = 'ThreeSixtyAction.SET_THREESIXTY_DATA';

  static SET_THREESIXTY_DATA_FINISHED =
    'ThreeSixtyAction.SET_THREESIXTY_DATA_FINISHED';

  static GET_SCENES = 'ThreeSixtyAction.GET_SCENES';

  static GET_SCENES_FINISHED = 'ThreeSixtyAction.GET_SCENES_FINISHED';
  // new
  static SAVE_LOG_REQUEST = 'SAVE_LOG_REQUEST';

  static SAVE_LOG_REQUEST_FINISHED = 'SAVE_LOG_REQUEST_FINISHED';

  static RESET_REQUEST_FINISHED = 'RESET_REQUEST_FINISHED';

  static SET_TOUR_360_REQUEST_FINISHED = 'SET_TOUR_360_REQUEST_FINISHED';

  static SET_PREVIEW_REQUEST_FINISHED = 'SET_PREVIEW_REQUEST_FINISHED';

  static SET_SURVEY_REQUEST_FINISHED = 'SET_SURVEY_REQUEST_FINISHED';

  static SET_SELECTED_STYLE_REQUEST_FINISHED =
    'SET_SELECTED_STYLE_REQUEST_FINISHED';

  static SET_SELECTED_STYLE_NAME_REQUEST_FINISHED =
    'SET_SELECTED_STYLE_NAME_REQUEST_FINISHED';

  static SET_SELECTED_SCENE_REQUEST = 'SET_SELECTED_SCENE_REQUEST';

  static SET_SELECTED_SCENE_REQUEST_FINISHED =
    'SET_SELECTED_SCENE_REQUEST_FINISHED';

  static SET_SELECTED_FINISH_REQUEST_FINISHED =
    'SET_SELECTED_FINISH_REQUEST_FINISHED';

  static EXPAND_REQUEST_FINISHED = 'EXPAND_REQUEST_FINISHED';

  static SET_BUILDER_REQUEST_FINISHED = 'SET_BUILDER_REQUEST_FINISHED';

  static SELECTED_MENU_OPTION_REQUEST_FINISHED =
    'SELECTED_MENU_OPTION_REQUEST_FINISHED';

  static SELECTED_USE_REQUEST = 'SELECTED_USE_REQUEST';

  static SELECTED_USE_REQUEST_FINISHED = 'SELECTED_USE_REQUEST_FINISHED';

  static CURRENT_LEVEL_REQUEST_FINISHED = 'CURRENT_LEVEL_REQUEST_FINISHED';

  static CHANGE_SCENE_SPHERE_REQUEST = 'CHANGE_SCENE_SPHERE_REQUEST';

  static CHANGE_SCENE_SPHERE_REQUEST_FINISHED =
    'CHANGE_SCENE_SPHERE_REQUEST_FINISHED';

  static UPDATE_SPHERES_FINISHES_REQUEST = 'UPDATE_SPHERES_FINISHES_REQUEST';

  static UPDATE_SPHERES_FINISHES_REQUEST_FINISHED =
    'UPDATE_SPHERES_FINISHES_REQUEST_FINISHED';

  static UPDATE_SPHERE_USE_REQUEST = 'UPDATE_SPHERE_USE_REQUEST';

  static UPDATE_SPHERE_USE_REQUEST_FINISHED =
    'UPDATE_SPHERE_USE_REQUEST_FINISHED';

  static CHANGE_THREESIXTY_LANGUAGE = 'CHANGE_THREESIXTY_LANGUAGE';

  static CHANGE_THREESIXTY_LANGUAGE_FINISHED =
    'CHANGE_THREESIXTY_LANGUAGE_FINISHED';

  static CHANGE_LANGUAGE_REQUEST_FINISHED = 'CHANGE_LANGUAGE_REQUEST_FINISHED';

  static CHANGE_FLOORPLAN_MENU_REQUEST_FINISHED =
    'CHANGE_FLOORPLAN_MENU_REQUEST_FINISHED';

  static SET_AUTO_TOUR_FINISHED = 'SET_AUTO_TOUR_FINISHED';

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

  /* */
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

  /* */
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

  /* */
  static updateSpheres(selectedStyle) {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama, panoramaInfo } = panoramaState;
      const { selectedScene, selectedFinish } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CHANGE_SCENE_SPHERE_REQUEST,
        ThreeSixtyEffect.updateSpheres,
        panorama,
        selectedStyle,
        selectedScene,
        selectedFinish,
        panoramaInfo.scenes
      );
    };
  }

  /* */
  static updateLevel() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { levels, currentLevel } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_SELECTED_SCENE_REQUEST,
        ThreeSixtyEffect.updateLevel,
        panorama,
        levels,
        currentLevel
      );
    };
  }

  /* */
  static changeSphereUse() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { selectedScene, selectedFinish, currentRoomUse } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.UPDATE_SPHERE_USE_REQUEST,
        ThreeSixtyEffect.changeSphereUse,
        panorama,
        selectedScene,
        selectedFinish,
        currentRoomUse
      );
    };
  }

  /* */
  static getSphereUse() {
    return async (dispatch, getState) => {
      const { panorama: panoramaState, threeSixty } = getState();
      const { panorama } = panoramaState;
      const { selectedScene } = threeSixty;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SELECTED_USE_REQUEST,
        ThreeSixtyEffect.getSphereUse,
        panorama,
        selectedScene
      );
    };
  }

  static setThreeSixtyData() {
    return async (dispatch, getState) => {
      const { tour, language: stateLanguage } = getState();
      const { language } = stateLanguage;
      const { builderId, projectId, selectedFloorplan, floorplans } = tour;
      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_THREESIXTY_DATA,
        ThreeSixtyEffect.setThreeSixtyData,
        language,
        builderId,
        projectId,
        floorplans[selectedFloorplan]
      );
    };
  }

  static changeLanguageOnThreeSixty() {
    return async (dispatch, getState) => {
      const { threeSixty, panorama: panoramaState } = getState();
      const { language } = threeSixty;
      const { panorama } = panoramaState;

      await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.CHANGE_THREESIXTY_LANGUAGE,
        ThreeSixtyEffect.changeLanguageOnThreeSixty,
        language,
        panorama
      );
    };
  }

  static autoPlay(autoRotate) {
    return async (dispatch, getState) => {
      const { panorama: panoramaState } = getState();
      const { panorama } = panoramaState;
      panorama.activateAutoRotate(autoRotate);
    };
  }

  // maybe this ones can be selectors instead of actions

  /* */
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

  /* */
  static setSelectedStyle(style) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_STYLE_REQUEST_FINISHED,
      style
    );
  }

  static setSelectedNameStyle(styleName) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_STYLE_NAME_REQUEST_FINISHED,
      styleName
    );
  }

  /* */
  static setSelectedScene(scene) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_SCENE_REQUEST_FINISHED,
      scene
    );
  }

  /* */
  static setAutoTourScene(autoTourScene) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_AUTO_TOUR_FINISHED,
      autoTourScene
    );
  }

  /* */
  static setSelectedFinish(finish) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SET_SELECTED_FINISH_REQUEST_FINISHED,
      finish
    );
  }

  /* */
  static expandMenu(expand) {
    return ActionUtility.createAction(
      ThreeSixtyAction.EXPAND_REQUEST_FINISHED,
      expand
    );
  }

  /* */
  static setSelectedMenuOption(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SELECTED_MENU_OPTION_REQUEST_FINISHED,
      option
    );
  }

  /* */
  static setSelectedUse(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.SELECTED_USE_REQUEST_FINISHED,
      option
    );
  }

  /* */
  static setCurrentLevel(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.CURRENT_LEVEL_REQUEST_FINISHED,
      option
    );
  }

  static setLanguage(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.CHANGE_LANGUAGE_REQUEST_FINISHED,
      option
    );
  }

  static changingFloorplanFromMenu(option) {
    return ActionUtility.createAction(
      ThreeSixtyAction.CHANGE_FLOORPLAN_MENU_REQUEST_FINISHED,
      option
    );
  }
}
