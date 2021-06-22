import ActionUtility from '../../../utilities/ActionUtility';
import ThreeSixtyEffect from '../effects';

export default class ThreeSixtyAction {
  static SET_STYLES = 'ThreeSixtyAction.SET_STYLES';
  static SET_MINIMAP = 'ThreeSixtyAction.SET_MINIMAP';
  static SET_USES = 'ThreeSixtyAction.SET_USES';
  static SET_LEVELS = 'ThreeSixtyAction.SET_LEVELS';
  static SET_SCENES = 'ThreeSixtyAction.SET_SCENES';
  static SET_SCENE = 'ThreeSixtyAction.SET_SCENE';
  static SET_STYLES_FINISHED = 'ThreeSixtyAction.SET_STYLES_FINISHED';
  static SET_MINIMAP_FINISHED = 'ThreeSixtyAction.SET_MINIMAP_FINISHED';
  static SET_USES_FINISHED = 'ThreeSixtyAction.SET_USES_FINISHED';
  static SET_LEVELS_FINISHED = 'ThreeSixtyAction.SET_LEVELS_FINISHED';
  static SET_SCENES_FINISHED = 'ThreeSixtyAction.SET_SCENES_FINISHED';
  static SET_SCENE_FINISHED = 'ThreeSixtyAction.SET_SCENE_FINISHED';

  /* */
  static setStyles() {
    return async (dispatch, getState) => {
      const { tour } = getState();
      const { selectedFloorplan } = tour;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_STYLES,
        ThreeSixtyEffect.setStyles,
        selectedFloorplan.styles
      );

      return { model };
    };
  }

  static setLevels() {
    return async (dispatch, getState) => {
      const { tour } = getState();
      const { selectedFloorplan } = tour;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_LEVELS,
        ThreeSixtyEffect.setLevels,
        selectedFloorplan.levels
      );

      return { model };
    };
  }

  static setMinimap() {
    return async (dispatch, getState) => {
      const { threeSixty } = getState();
      const { level } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_MINIMAP,
        ThreeSixtyEffect.setMinimap,
        level.miniMap
      );

      return { model };
    };
  }

  static setScenes() {
    return async (dispatch, getState) => {
      const { threeSixty } = getState();
      const { level } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_SCENES,
        ThreeSixtyEffect.setScenes,
        level.scenes
      );

      return { model };
    };
  }

  static setScene() {
    return async (dispatch, getState) => {
      const { threeSixty } = getState();
      const { level } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_SCENE,
        ThreeSixtyEffect.setScene,
        level.scenes
      );

      return { model };
    };
  }

  static setUses() {
    return async (dispatch, getState) => {
      const { threeSixty } = getState();
      const { scene } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.SET_USES,
        ThreeSixtyEffect.setUses,
        scene.uses
      );

      return { model };
    };
  }
}
