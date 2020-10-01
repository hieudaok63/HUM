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
        threeSixty.selectedFinish
      );
      const isError = model instanceof PanoramaErrorModel;
      return { model, isError };
    };
  }

  static setPanorama() {
    return async (dispatch, getState) => {
      // need to add lastcameraposition
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
          console.log('level', level);
          if (level !== undefined) {
            await dispatch(ThreeSixtyAction.setCurrentLevel(level));
          }

          await dispatch(ThreeSixtyAction.getStyles());
          const roomUseWithFinishes = await dispatch(
            ThreeSixtyAction.getRoomUseWithFinishes()
          );
          if (!roomUseWithFinishes.isError) {
            const panoInfo = await dispatch(
              PanoramaAction.createPanoramaInfo()
            );
            if (!panoInfo.isError) {
              dispatch(PanoramaAction.setPanorama());
            }
          }
        }
      );

      const isError = model instanceof PanoramaErrorModel;

      return { model, isError };
    };
  }
}
