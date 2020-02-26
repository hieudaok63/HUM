import { Vector3 } from 'three';
import * as services from '../../services/session.services';
import * as types from './types';
import {
  levelMenu,
  takeTestUri,
  registerUri,
  rotationMessage,
  shopCar
} from '../../config/customization';
import {
  ImagePanorama,
  Viewer,
  Infospot,
  DataImage
} from '../../lib/panolens.module';
import {
  isMobileDevice,
  getLevelData,
  get360DataStyle,
  get360Scene,
  get360Style
} from '../../utils';

const loginStart = () => ({
  type: types.LOGIN_START
});

const loginSuccess = (
  user,
  email,
  token,
  refreshToken,
  authTime,
  expirationTime
) => ({
  type: types.LOGIN_SUCCESS,
  user,
  email,
  token,
  refreshToken,
  authTime,
  expirationTime
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  error
});

const login = (email, password, language, onClick) => (dispatch) => {
  dispatch(loginStart());
  services
    .login(email, password, language)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const { user, token, refreshToken, authTime, expirationTime } = data;
        dispatch(
          loginSuccess(
            user,
            user.email,
            token,
            refreshToken,
            authTime,
            expirationTime
          )
        );
        if (onClick) {
          onClick(token);
        }
      } else if (response === 'error') {
        const { message } = data;
        dispatch(loginFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const getFurnitureByStylesStart = () => ({
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
};

const countClickFurnitureStart = () => ({
  type: types.CLICK_FURNITURE_START
});

const countClickFurnitureSuccess = () => ({
  type: types.CLICK_FURNITURE_SUCCESS
});

const countClickFurnitureFail = (error) => ({
  type: types.CLICK_FURNITURE_FAIL,
  error
});

const countClickFurniture = (language, body) => (dispatch) => {
  dispatch(countClickFurnitureStart());
  services
    .countClickFurniture(language, body)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        dispatch(countClickFurnitureSuccess());
      } else if (response === 'error') {
        const { message } = data;
        dispatch(countClickFurnitureFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const reset = () => ({
  type: types.RESET
});

// GUEST
const getGuestFurniture360ByStyles = (
  language = 'en',
  styles = ['contemporary', 'scandinavian', 'transitional'],
  room,
  layoutName,
  level
) => (dispatch) => {
  dispatch(getFurnitureByStylesStart());
  services
    .getGuestFurniture360ByStyles(language, styles, room, layoutName, level)
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

// 360s
const getScenesStart = () => ({
  type: types.GET_SCENES_START
});

const getScenesFail = (error) => ({
  type: types.GET_SCENES_FAIL,
  error
});

const setNoTour360 = () => (dispatch) =>
  dispatch({
    type: types.SET_NO_TOUR_360
  });

const setIsPreview = (preview) => (dispatch) => {
  dispatch({
    type: types.SET_PREVIEW,
    preview
  });
};

const setIsSurveyCompleted = (surveyCompleted) => (dispatch) => {
  dispatch({
    type: types.SET_SURVEY_COMPLETED,
    surveyCompleted
  });
};

const setSelectedScene = (selectedScene) => (dispatch) => {
  dispatch({
    type: types.SET_SELECTED_SCENE,
    selectedScene
  });
};

const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: types.SET_LOADING,
    loading
  });
};

const createViewSuccess = (viewer) => (dispatch) => {
  dispatch({
    type: types.SET_VIEWER,
    viewer
  });
};

const set360Data = (
  levelPosition,
  displayName,
  selectedStyleName,
  selectedStyle,
  personalized,
  levelMinimap,
  currentLevel,
  totalPages,
  selectedScene,
  miniMapHotspots,
  totalLevels,
  layoutName,
  roomUse,
  currentRoomUse,
  furniture
) => (dispatch) => {
  dispatch({
    type: types.SET_360_DATA,
    levelPosition,
    displayName,
    selectedStyleName,
    selectedStyle,
    personalized,
    takeTestUri,
    levelMinimap,
    currentLevel,
    registerUri,
    rotationMessage,
    shoppingMenuTitle: shopCar.title,
    showShoppingCar: shopCar.show,
    totalPages,
    selectedScene,
    miniMapHotspots,
    totalLevels,
    layoutName,
    roomUse,
    currentRoomUse,
    furniture
  });
};

const getStyle = (style, menu) => {
  return menu.filter((item) => {
    return item.type === style;
  });
};

const getCookie = (name, menu) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  if (v) {
    const style = getStyle(v[2], menu);
    return style.length > 0 ? style[0] : null;
  }
};

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
    console.log('NO DEVICE DETECTED');
  }
};

const createViewer = () => {
  const viewer = new Viewer({
    // A DOM Element container
    container: document.getElementById('viewer'),

    // Vsibility of bottom control bar
    controlBar: true,

    // Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
    controlButtons: [],

    // Auto hide control bar
    autoHideControlBar: false,

    // Auto hide infospots
    autoHideInfospot: false,

    // Allow only horizontal camera control
    horizontalView: false,

    // Camera field of view in degree
    cameraFov: 75,

    // Reverse orbit control direction
    reverseDragging: false,

    // Enable reticle for mouseless interaction
    enableReticle: false,

    // Dwell time for reticle selection in millisecond
    dwellTime: 1500,

    // Auto select a clickable target after dwellTime
    autoReticleSelect: true,

    // Adds an angle view indicator in upper left corner
    viewIndicator: false,

    // Size of View Indicator
    indicatorSize: 30,

    // Whether and where to output infospot position. Could be 'console' or 'overlay'
    output: 'console',

    // Auto rotate
    autoRotate: false,

    // Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
    autoRotateSpeed: 0.5,

    // Duration before auto rotatation when no user interactivity in ms
    autoRotateActivationDuration: 20000
  });

  return viewer;
};

const build360Scene = (scene) => (dispatch) => {
  const { hotspots = [], name, startScenePosition, furniture, key } = scene;
  const time = new Date().getTime();
  const uri = `${scene.image}?${time}`;
  const panorama = new ImagePanorama(uri);
  panorama.name = key;
  panorama.addEventListener('progress', (event) => {
    const percentage = (event.progress.loaded / event.progress.total) * 100;
    if (percentage >= 100) {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    }
  });
  return {
    name,
    key,
    panorama,
    hotspots,
    startScenePosition,
    furniture
  };
};

const get360JSON = (
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  viewer = null,
  roomUse = [],
  isPreview = false,
  isSurveyCompleted = false
) => (dispatch) => {
  dispatch(getScenesStart());
  services
    .get360JSON(lang, level, style, room, roomUse)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        const levelData = getLevelData(data.levels, level);
        if (levelData) {
          const { menu } = data;
          const styleToRequest = style === 'default' ? data.firstStyle : style;
          const menuStyle = get360Style(styleToRequest, menu);
          const jsonStyle = get360DataStyle(
            menuStyle.toLowerCase(),
            levelData.styles
          );
          if (jsonStyle) {
            const roomToRequest =
              room === 'default' ? levelData.firstScene : room;
            const jsonScene = get360Scene(roomToRequest, jsonStyle.scenes);
            if (jsonScene) {
              const scene = dispatch(build360Scene(jsonScene));
              let newViewer = null;
              if (viewer === null) {
                newViewer = createViewer(isPreview);
              }
              const definedViewer = newViewer || viewer;
              const viewerWithPanorama = dispatch(
                // eslint-disable-next-line no-use-before-define
                build360Panorama(
                  scene,
                  definedViewer,
                  levelData.levelNumber,
                  jsonStyle.name,
                  roomUse
                )
              );
              if (isPreview) {
                viewerWithPanorama.scene.children[0].children.forEach(
                  (child) => {
                    const element = child;
                    element.visible = false;
                  }
                );
              }
              dispatch(createViewSuccess(viewerWithPanorama));
              dispatch(setIsPreview(isPreview));
              dispatch(setIsSurveyCompleted(isSurveyCompleted));
              // TODO Make new set360 Data with a single level single scene, necesitamos poder agrerar el length, de leveles, y escenas, y regresar las imagenes a mostrar en el menu
              setTimeout(() => {
                dispatch(
                  set360Data(
                    levelMenu,
                    data.displayName,
                    menuStyle,
                    jsonStyle.key,
                    data.personalized,
                    levelData.minimap.image,
                    levelData.levelNumber,
                    Math.ceil(8 / 3),
                    jsonScene.key.toLowerCase(),
                    levelData.minimap.hotspots,
                    data.totalLevels,
                    data.layoutName,
                    jsonScene.roomUse || [],
                    roomUse[0] || 'default',
                    jsonScene.furniture
                  )
                );
              }, 2000);
            }
          }
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

const get360StylesStart = () => ({
  type: types.GET_360_STYLE_MENU_START
});

const get360StylesSuccess = (menu) => ({
  type: types.GET_360_STYLE_MENU_SUCCESS,
  menu
});

const get360StylesFail = (error) => ({
  type: types.GET_360_STYLE_MENU_FAIL,
  error
});

const get360Styles = (lang = 'en', level = '1', room = 'default') => (
  dispatch
) => {
  dispatch(get360StylesStart());
  services
    .get360Styles(lang, level, room)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        dispatch(get360StylesSuccess(data.styles));
      } else if (response === 'error') {
        const { message } = data;
        dispatch(get360StylesFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const getViewMenuStart = () => ({
  type: types.GET_360_VIEW_MENU_START
});

const getViewMenuSuccess = (viewMenu) => ({
  type: types.GET_360_VIEW_MENU_SUCCESS,
  viewMenu
});

const getViewMenuFail = (error) => ({
  type: types.GET_360_VIEW_MENU_FAIL,
  error
});

const get360Scenes = (lang = 'en', level = '1', style = 'default') => (
  dispatch
) => {
  dispatch(getViewMenuStart());
  services
    .get360Scenes(lang, level, style)
    .then((json) => {
      const { data, response } = json;
      if (response === 'success') {
        dispatch(getViewMenuSuccess(data.style.scenes));
      } else if (response === 'error') {
        const { message } = data;
        dispatch(getViewMenuFail(message));
      }
    })
    .catch((er) => {
      console.error('er', er);
    });
};

const build360Panorama = (scene, viewer, level, style, roomUse) => (
  dispatch
) => {
  const { panorama, hotspots, startScenePosition } = scene;
  const sceneInitial = new Vector3(
    startScenePosition.x,
    startScenePosition.y,
    startScenePosition.z
  );
  hotspots.forEach((spot) => {
    panorama.addEventListener('enter-fade-start', () => {
      viewer.tweenControlCenter(sceneInitial, 1);
    });
    const hotspotSize = window.innerWidth < 768 ? 13 : 10;
    let hotspot = null;
    if (typeof spot.level !== 'undefined') {
      hotspot = new Infospot(hotspotSize, DataImage.AvriaHotspotStairs);
    } else {
      hotspot = new Infospot(hotspotSize, DataImage.AvriaHotspotNew);
    }
    hotspot.position.set(spot.x, spot.y, spot.z);
    hotspot.addHoverText(spot.name);
    console.log('spot.level', spot.level);
    if (typeof spot.level === 'undefined') {
      hotspot.addEventListener('click', () => {
        dispatch(get360JSON('en', level, style, spot.key, viewer, roomUse));
        dispatch(get360Styles('en', level, spot.key));
        dispatch(setSelectedScene(spot.key));
        hotspot.removeHoverElement();
      });
    } else {
      hotspot.addEventListener('click', () => {
        console.log('HeyListen!', spot.level);
        dispatch(
          get360JSON('en', spot.level, style, spot.key, viewer, roomUse)
        );
        dispatch(get360Styles('en', spot.level, spot.key));
        dispatch(get360Scenes('en', spot.level, style));
        dispatch(setSelectedScene(spot.key));
        hotspot.removeHoverElement();
      });
    }
    panorama.add(hotspot);
  });
  viewer.add(panorama);
  viewer.setPanorama(panorama);
  return viewer;
};

export {
  login,
  getFurniture360ByStyles,
  saveFavoriteFurniture,
  countClickFurniture,
  setNoTour360,
  activateCardBoardMode,
  reset,
  getCookie,
  get360JSON,
  get360Scenes,
  get360Styles,
  // Guest
  getGuestFurniture360ByStyles
};
