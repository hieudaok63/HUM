import * as services from '../../services/session.services';
import loader from '../../assets/home-white.gif';
import * as types from './types';
import {
  levelMenu,
  registerUri,
  rotationMessage,
  shopCar
} from '../../config/customization';
import {
  isMobileDevice,
  getProcessed360Data,
  build360Scene
} from '../../utils';
import THREESIXTY from '../../classes/ThreeSixty';

/* const getFurnitureByStylesStart = () => ({
  type: types.GET_FURNITURE_BY_STYLES_START
});

const getFurnitureByStylesSuccess = (furniture) => ({
  type: types.GET_FURNITURE_BY_STYLES_SUCCESS,
  furniture
});

const getFurnitureByStylesFail = (error) => ({
  type: types.GET_FURNITURE_BY_STYLES_FAIL,
  error
});

const getFurniture360ByStyles = (
  authToken,
  language,
  styles = ['contemporary', 'scandinavian', 'transitional'],
  room,
  layoutName,
  level
) => (dispatch) => {
  dispatch(getFurnitureByStylesStart());
  services
    .getFurniture360ByStyles(
      authToken,
      language,
      styles,
      room,
      layoutName,
      level
    )
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const { furnitureList } = data;
        dispatch(getFurnitureByStylesSuccess(furnitureList[0].furniture));
      } else if (response === 'error') {
        const { message } = data;
        dispatch(getFurnitureByStylesFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const saveFavoriteFurnitureStart = () => ({
  type: types.SAVE_FAVORITE_FURNITURE_START
});

const saveFavoriteFurnitureSuccess = (furniture) => ({
  type: types.SAVE_FAVORITE_FURNITURE_SUCCESS,
  furniture
});

const saveFavoriteFurnitureFail = (error) => ({
  type: types.SAVE_FAVORITE_FURNITURE_FAIL,
  error
});

const saveFavoriteFurniture = (authToken, language, body, furniture) => (
  dispatch
) => {
  dispatch(saveFavoriteFurnitureStart());
  services
    .saveFavoriteFurniture(authToken, language, body)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const newfurniture = furniture.map((el) => {
          const newEl = el;
          if (el.id === body.assetId) {
            newEl.favorite = body.favorite;
          }
          return newEl;
        });
        dispatch(saveFavoriteFurnitureSuccess(newfurniture));
      } else if (response === 'error') {
        const { message } = data;
        dispatch(saveFavoriteFurnitureFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
}; */

// 360s

const activateCardBoardStart = () => ({
  type: types.ACTIVATE_CARDBOARD_START
});

const toggleCardBoard = (viewer, cardBoardMode) => {
  if (cardBoardMode) {
    viewer.enableControl(0);
  } else {
    viewer.enableControl(1);
  }
};

const activateIOS13 = (viewer, cardBoardMode) => {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response === 'granted') {
        toggleCardBoard(viewer, cardBoardMode);
      }
    })
    .catch(console.error);
};

const activateCardBoardMode = (viewer, cardBoardMode, callback) => (
  dispatch
) => {
  dispatch(activateCardBoardStart());
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    activateIOS13(viewer, cardBoardMode);
    callback();
  } else if (isMobileDevice() && window.DeviceOrientationEvent) {
    toggleCardBoard(viewer, cardBoardMode);
    callback();
  } else {
    console.error('NO DEVICE DETECTED');
  }
};

const setLoading = (loading) => ({
  type: types.SET_LOADING,
  loading
});

const updateScene = (
  builderId,
  projectId,
  layoutName,
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  roomUse,
  mode = 'day',
  threeSixty,
  lastCameraPosition = null,
  finish = 'default'
) => (dispatch) => {
  dispatch(getScenesStart());
  services
    .get360JsonWithFinishes(
      builderId,
      projectId,
      layoutName,
      lang,
      level,
      style,
      room,
      roomUse ? [roomUse] : [],
      mode,
      finish
    )
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const processedData = getProcessed360Data(
          data,
          level,
          style,
          room,
          roomUse,
          finish
        );
        if (processedData !== null) {
          const {
            use,
            uses,
            currentRoomUse,
            levelData,
            jsonStyle,
            startScenePosition,
            menuStyle,
            sceneKey,
            hotspots,
            finishToRequest
          } = processedData;
          const scene = build360Scene(
            use,
            hotspots,
            startScenePosition,
            finishToRequest
          );
          const properties = {
            image: scene.panorama.uri,
            hotspots
          };
          threeSixty.sceneUpdate(properties);
          if (lastCameraPosition !== null) {
            threeSixty.updateCameraPosition(lastCameraPosition);
          } else {
            threeSixty.updateCameraPosition({
              x: 0.00964106833161872,
              y: 6.123233995736772e-19,
              z: -0.002655146215382272
            });
          }

          dispatch(setSelectedScene(scene.panorama.name));
          dispatch(setSelectedFinish(scene.panorama.finish));
          dispatch(
            set360Data(
              levelMenu,
              data.displayName,
              menuStyle.name,
              jsonStyle.key,
              data.personalized,
              levelData.minimap.image,
              levelData.levelNumber,
              Math.ceil(8 / 3),
              sceneKey.toLowerCase(),
              levelData.minimap.hotspots,
              data.totalLevels,
              data.layoutName,
              uses,
              currentRoomUse,
              use.furniture,
              data.builderId,
              data.projectId,
              levelData.minimap.mapSize,
              data.urls.avria,
              threeSixty,
              use.finishScenes,
              data.builderLogo
            )
          );
        } else {
          dispatch(getScenesFail('Fail, processesing Data'));
        }
      } else if (response === 'error') {
        const { message } = data;
        dispatch(getScenesFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const createScene = (
  builderId,
  projectId,
  layoutName,
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  container = null,
  roomUse,
  isPreview = false,
  isSurveyCompleted = false,
  mode = 'day',
  log = false,
  finish = 'default'
) => (dispatch) => {
  dispatch(getScenesStart());
  services
    .get360JsonWithFinishes(
      builderId,
      projectId,
      layoutName,
      lang,
      level,
      style,
      room,
      [],
      mode,
      finish
    )
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const processedData = getProcessed360Data(
          data,
          level,
          style,
          room,
          roomUse,
          finish
        );
        if (processedData !== null) {
          const {
            use,
            uses,
            currentRoomUse,
            levelData,
            jsonStyle,
            startScenePosition,
            menuStyle,
            sceneKey,
            hotspots,
            finishToRequest
          } = processedData;
          const scene = build360Scene(
            use,
            hotspots,
            startScenePosition,
            finishToRequest
          );
          const threeSixty = new THREESIXTY();
          const properties = {
            container,
            image: scene.panorama.uri,
            width: window.innerWidth,
            height: window.innerHeight,
            radius: 100,
            widthSegments: 100,
            heightSegments: 100,
            hotspots,
            loader,
            loadingCallBack: (loading) => {
              dispatch(setLoading(loading));
            },
            updateCallBack: (
              obj,
              updateRoom,
              newLevel,
              currentStyle = 'default',
              currentFinish = 'default'
            ) => {
              const levelToRequest = newLevel || level;
              dispatch(
                updateScene(
                  builderId,
                  projectId,
                  layoutName,
                  lang,
                  levelToRequest,
                  currentStyle,
                  updateRoom,
                  roomUse,
                  mode,
                  obj,
                  null,
                  currentFinish
                )
              );
            },
            startScenePosition
          };
          threeSixty.init(properties);
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
          if (log) {
            const newLog = {
              builderId: data.builderId,
              projectId: data.projectId,
              layoutName: data.displayName,
              logs: []
            };
            dispatch(saveLog(lang, newLog));
          }
          dispatch(setSelectedScene(scene.panorama.name));
          dispatch(setSelectedFinish(scene.panorama.finish));
          dispatch(setIsPreview(isPreview));
          dispatch(setIsSurveyCompleted(isSurveyCompleted));
          dispatch(
            set360Data(
              levelMenu,
              data.displayName,
              menuStyle.name,
              jsonStyle.key,
              data.personalized,
              levelData.minimap.image,
              levelData.levelNumber,
              Math.ceil(8 / 3),
              sceneKey.toLowerCase(),
              levelData.minimap.hotspots,
              data.totalLevels,
              data.layoutName,
              uses,
              currentRoomUse,
              use.furniture,
              data.builderId,
              data.projectId,
              levelData.minimap.mapSize,
              data.urls.avria,
              threeSixty,
              use.finishScenes,
              data.builderLogo
            )
          );
        } else {
          dispatch(getScenesFail('Fail, processesing Data'));
        }
      } else if (response === 'error') {
        const { message } = data;
        dispatch(getScenesFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

export {
  getFurniture360ByStyles,
  saveFavoriteFurniture,
  countClickFurniture,
  setNoTour360,
  activateCardBoardMode,
  reset,
  getCookie,
  createScene,
  updateScene,
  get360Scenes,
  get360Styles,
  // Guest
  getGuestFurniture360ByStyles,
  // Log
  saveLog
};
