import ActionUtility from '../../../utilities/ActionUtility';
import PanoramaErrorModel from '../../../models/PanoramaErrorModel';
import PanoramaEffect from '../effects';
import ThreeSixtyAction from '../../threeSixty/actions';

export default class PanoramaAction {
  static PANORAMA_INFO_REQUEST = 'PANORAMA_INFO_REQUEST';
  static PANORAMA_INFO_REQUEST_FINISHED = 'PANORAMA_INFO_REQUEST_FINISHED';
  static CONTAINER_REQUEST_FINISHED = 'CONTAINER_REQUEST_FINISHED';
  static PANORAMA_REQUEST = 'PANORAMA_REQUEST';
  static PANORAMA_REQUEST_FINISHED = 'PANORAMA_REQUEST_FINISHED';
  static AUTOROTATE_REQUEST = 'AUTOROTATE_REQUEST';

  static setContainer(container) {
    return ActionUtility.createAction(
      PanoramaAction.CONTAINER_REQUEST_FINISHED,
      container
    );
  }

  static createPanoramaInfo() {
    return async (dispatch, getState) => {
      const { threeSixty, panorama } = getState();
      const { container } = panorama;
      console.log(threeSixty.levels, threeSixty);
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        PanoramaAction.PANORAMA_INFO_REQUEST,
        PanoramaEffect.createPanorama,
        container,
        threeSixty.levels,
        threeSixty.currentLevel,
        threeSixty.defaultStyle,
        threeSixty.selectedStyle,
        threeSixty.selectedScene,
        threeSixty.currentRoomUse,
        threeSixty.selectedFinish,
        threeSixty.levelScenes.scenes
      );
      const isError = model instanceof PanoramaErrorModel;
      return { model, isError };
    };
  }

  static setPanorama() {
    return async (dispatch, getState) => {
      const { panorama } = getState();
      const { panoramaInfo, panorama: threeSixtyPano } = panorama;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        PanoramaAction.PANORAMA_REQUEST,
        PanoramaEffect.createThreeSixty,
        threeSixtyPano,
        panoramaInfo,
        async (sceneName, level) => {
          if (sceneName !== undefined) {
            await dispatch(ThreeSixtyAction.setSelectedScene(sceneName));
          }
          if (level !== undefined) {
            await dispatch(ThreeSixtyAction.setCurrentLevel(level));
            await dispatch(ThreeSixtyAction.getScenesByStyles());
            await dispatch(PanoramaAction.createPanoramaInfo());
          }

          await dispatch(ThreeSixtyAction.getStyles());
        }
      );

      const isError = model instanceof PanoramaErrorModel;

      return { model, isError };
    };
  }

  static activateAutoRotate(activate) {
    return async (dispatch, getState) => {
      const { panorama } = getState();
      const { panorama: threeSixtyPano } = panorama;
      await ActionUtility.createThunkEffect(
        dispatch,
        PanoramaAction.AUTOROTATE_REQUEST,
        PanoramaEffect.autoRotate,
        threeSixtyPano,
        activate
      );
    };
  }
}
