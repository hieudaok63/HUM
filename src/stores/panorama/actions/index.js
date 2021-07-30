import ActionUtility from '../../../utilities/ActionUtility';
import PanoramaErrorModel from '../../../models/PanoramaErrorModel';
import PanoramaEffect from '../effects';
import ThreeSixtyAction from '../../threeSixty/actions';
// import SocketAction from '../../socket/actions';
import LoadingAction from '../../loading/actions';

export default class PanoramaAction {
  static PANORAMA_INFO_REQUEST = 'PANORAMA_INFO_REQUEST';
  static PANORAMA_INFO_REQUEST_FINISHED = 'PANORAMA_INFO_REQUEST_FINISHED';
  static CONTAINER_REQUEST_FINISHED = 'CONTAINER_REQUEST_FINISHED';
  static PANORAMA_REQUEST = 'PANORAMA_REQUEST';
  static PANORAMA_REQUEST_FINISHED = 'PANORAMA_REQUEST_FINISHED';
  static AUTOROTATE_REQUEST = 'AUTOROTATE_REQUEST';
  static DESTROY_PANORAMA = 'DESTROY_PANORAMA';

  /* */
  static setContainer(container) {
    return ActionUtility.createAction(
      PanoramaAction.CONTAINER_REQUEST_FINISHED,
      container
    );
  }

  /* */
  static createPanoramaInfo() {
    return async (dispatch, getState) => {
      const { threeSixty, panorama, tour } = getState();
      const { container } = panorama;
      const { floorplans, selectedFloorplan, defaultLanguage } = tour;
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
        threeSixty.levelScenes,
        floorplans[selectedFloorplan].styles,
        defaultLanguage
      );
      const isError = model instanceof PanoramaErrorModel;
      return { model, isError };
    };
  }

  /* */
  static setPanorama() {
    return async (dispatch, getState) => {
      const { panorama, threeSixty } = getState();
      const { panoramaInfo, panorama: threeSixtyPano } = panorama;
      const { styles, showLoader } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        PanoramaAction.PANORAMA_REQUEST,
        PanoramaEffect.createThreeSixty,
        threeSixtyPano,
        panoramaInfo,
        async (sceneName, level, use) => {
          if (sceneName !== undefined) {
            await dispatch(ThreeSixtyAction.setSelectedScene(sceneName));
            // dispatch(
            //   SocketAction.socketMessage({
            //     event: 'CHANGE-SCENE',
            //     data: {
            //       type: 'CHANGE-SCENE',
            //       name: sceneName
            //     }
            //   })
            // );
          }
          if (level !== undefined) {
            await dispatch(ThreeSixtyAction.setCurrentLevel(level));
            await dispatch(ThreeSixtyAction.getScenes());
            await dispatch(ThreeSixtyAction.setSelectedScene(sceneName));
            //   dispatch(
            //     SocketAction.socketMessage({
            //       event: 'CHANGE-SCENE',
            //       data: {
            //         type: 'CHANGE-SCENE',
            //         name: sceneName
            //       }
            //     })
            //   );
          }
          if (use !== undefined) {
            await dispatch(ThreeSixtyAction.setSelectedUse(use));
          }
        },
        async (expand) => {
          if (expand !== undefined) {
            await dispatch(ThreeSixtyAction.expandMenu(expand));
            await dispatch(ThreeSixtyAction.setSelectedMenuOption(''));
          }
        },
        async (style) => {
          if (style !== undefined) {
            const currentStyles = [...styles];
            currentStyles.push({ key: 'Empty' });
            const selectedStyle = currentStyles.find(
              (item) => item.key === style
            );
            await dispatch(
              ThreeSixtyAction.setSelectedNameStyle(selectedStyle.style)
            );
          }
        },
        async (loading) => {
          if (loading !== undefined) {
            await dispatch(LoadingAction.setLoader(loading));
          }
        },
        async () => {
          await dispatch(ThreeSixtyAction.changingFloorplanFromMenu(false));
        },
        showLoader
      );

      const isError = model instanceof PanoramaErrorModel;

      return { model, isError };
    };
  }

  /* */
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

  static destroyPanorama() {
    return ActionUtility.createAction(PanoramaAction.DESTROY_PANORAMA);
  }
}
