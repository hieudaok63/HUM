import ActionUtility from '../../../utilities/ActionUtility';
import PanoramaErrorModel from '../../../models/PanoramaErrorModel';
import PanoramaEffect from '../effects';
import THREESIXTY from '../../../classes/ThreeSixty';
import ThreeSixtyAction from '../../threeSixty/actions';

export default class PanoramaAction {
  static PANORAMA_INFO_REQUEST = 'PANORAMA_INFO_REQUEST';
  static PANORAMA_INFO_REQUEST_FINISHED = 'PANORAMA_INFO_REQUEST_FINISHED';
  static CONTAINER_REQUEST_FINISHED = 'CONTAINER_REQUEST_FINISHED';

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
        PanoramaAction.PANORAMA_REQUEST,
        PanoramaEffect.createPanorama,
        container,
        threeSixty.levels,
        threeSixty.currentLevel,
        threeSixty.selectedStyle,
        threeSixty.selectedScene,
        threeSixty.currentRoomUse,
        threeSixty.selectedFinish
      );
      const isError = model instanceof PanoramaErrorModel;
      return { model, isError };
    };
  }

  static createPanorama() {
    return async (dispatch, getState) => {
      const { panorama } = getState();
      const { panoramaInfo } = panorama;
      const threeSixty = new THREESIXTY();
      threeSixty.init({
        ...panoramaInfo,
        loadingCallBack: () => {},
        updateCallBack: () => {
          dispatch(ThreeSixtyAction.getRoomUseWithFinishes());
        }
      });
      threeSixty.setStartingScenePosition({
        x: 0.00964106833161872,
        y: 6.123233995736772e-19,
        z: -0.002655146215382272
      });
      threeSixty.animate();
      window.addEventListener(
        'resize',
        () => {
          threeSixty.onWindowResize(window.innerWidth, window.innerHeight);
        },
        false
      );
    };
  }
}
