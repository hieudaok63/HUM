import queryString from 'query-string';
import Data from './assets/Data';

/* eslint-disable no-param-reassign */

const getClosest = (elem, selector) => {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

const callFilter = (items, node) =>
  Array.prototype.slice.call(items).filter((item) => item !== node && item);

const deleteWhiteSpaces = (s) => {
  if (typeof s !== 'string') return '';
  return s.replace(/ +/g, '');
};

const removeAccents = (s) => {
  if (typeof s !== 'string') return '';
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const bindEvent = (element, eventName, eventHandler) => {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent(`on ${eventName}`, eventHandler);
  }
};

const sendMessage = (msg) => {
  window.parent.postMessage(msg, '*');
};

const truncate = (maxSize, string) =>
  string.length <= maxSize ? string : `${string.substr(0, maxSize - 3)}...`;

const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const isMobileDevice = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const isTablet = () =>
  /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    navigator.userAgent.toLowerCase()
  ) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const isPortrait = () => window.innerHeight > window.innerWidth;

const isPreview = () => {
  const { location } = window;
  const parsed = queryString.parse(location.search);
  return !!parsed.preview;
};

const isSurveyCompleted = () => {
  const { location } = window;
  const parsed = queryString.parse(location.search);
  return !!parsed.surveyCompleted;
};

const getLevelData = (levels, currentLevel) => {
  const level = levels.filter((item) =>
    item.levelNumber === currentLevel ? item : null
  );
  return level && level[0];
};

const get360Style = (style, menu) => {
  const menuStyle = menu.filter((item) =>
    item.name.toLowerCase() === style.toLowerCase() ||
    item.key.toLowerCase() === style.toLowerCase()
      ? item
      : null
  );
  return menuStyle && menuStyle[0];
};

const get360Use = (roomKey, scene) => {
  const use = scene.filter((item) =>
    item.key.toLowerCase() === roomKey.toLowerCase() ? item : null
  );
  return use && use[0];
};

const get360Uses = (uses) => {
  if (uses.length > 1) {
    return uses.map((use) => {
      const { key, name, image } = use;
      return {
        key,
        name,
        image
      };
    });
  }
  return [];
};

const getCurrentRoomUse = (use) => use.key;

const get360DataStyle = (currentStyle, styles) => {
  const style = styles.filter((item) =>
    item.key.toLowerCase() === currentStyle ? item : null
  );
  return style && style[0];
};

const get360Scene = (currentScene, scenes) => {
  const scene = scenes.filter((item) => {
    const currentItemName = item.name || '';
    const currentItemKey = item.key || '';
    return currentItemName.toLowerCase().includes(currentScene.toLowerCase()) ||
      currentScene.toLowerCase().includes(currentItemName.toLowerCase()) ||
      currentItemKey.toLowerCase().includes(currentScene.toLowerCase()) ||
      currentScene.toLowerCase().includes(currentItemKey.toLowerCase())
      ? item
      : null;
  });
  return scene && scene[0];
};

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i += 1) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

const hasGyroscope = () => {
  if (typeof DeviceOrientationEvent !== 'undefined') {
    if (
      typeof DeviceOrientationEvent.requestPermission === 'function' ||
      (isMobileDevice() && window.DeviceOrientationEvent)
    ) {
      return true;
    }
  }
  return false;
};

const getRoomToRequest = (roomUse, uses, defaultUse) => {
  let room = null;
  if (roomUse !== '' && roomUse !== null && roomUse !== undefined) {
    room = roomUse;
  } else {
    room = defaultUse;
  }
  const exist = uses.find((use) => use.key === room);

  return exist ? room : defaultUse;
};

const assignHotspotImage = (hotspots) =>
  hotspots.map((hotspot) => {
    const current = hotspot;
    if (typeof current.level === 'undefined') {
      current.img = Data.AvriaHotspotNew;
    } else {
      current.img = Data.AvriaHotspotStairs;
    }
    return current;
  });

const getProcessed360Data = (data, level, style, room, roomUse, finish) => {
  const levelData = getLevelData(data.levels, level);
  if (levelData) {
    const { menu } = data;
    const styleToRequest = style === 'default' ? data.defaultStyle : style;
    const menuStyle = get360Style(styleToRequest, menu);

    const jsonStyle = get360DataStyle(
      menuStyle.key.toLowerCase(),
      levelData.styles
    );
    if (jsonStyle) {
      const roomToRequest = room === 'default' ? levelData.defaultScene : room;
      const jsonScene = get360Scene(roomToRequest, jsonStyle.scenes);
      if (jsonScene) {
        const roomUseToRequest = getRoomToRequest(
          roomUse,
          jsonScene.uses,
          jsonScene.defaultUse
        );

        const use = get360Use(roomUseToRequest, jsonScene.uses);
        const uses = get360Uses(jsonScene.uses);

        const currentRoomUse = getCurrentRoomUse(use);
        if (use) {
          const { startScenePosition, key: sceneKey, hotspots } = jsonScene;
          const hotspotsWithAssignedImage = assignHotspotImage(hotspots);
          const finishToRequest =
            finish === 'default' ? jsonScene.defaultFinish : finish;
          return {
            use,
            uses,
            currentRoomUse,
            levelData,
            jsonStyle,
            startScenePosition,
            menuStyle,
            sceneKey,
            hotspots: hotspotsWithAssignedImage,
            finishToRequest
          };
        }
      }
    }
  }
  return null;
};

const getViewerDependingOnPreview = (preview, viewer) => {
  if (preview) {
    viewer.scene.children[0].children.forEach((child) => {
      const element = child;
      element.visible = false;
    });
  }
  return viewer;
};

const getSelectedFinish = (selectedKey, scenes) => {
  if (
    selectedKey === 'default' ||
    selectedKey === undefined ||
    scenes.length === 0
  ) {
    return 'default';
  }
  const scene = scenes.filter((item) =>
    item.key.toLowerCase() === selectedKey.toLowerCase() ? item : null
  );

  if (scene.length > 0) {
    return scene[0].key;
  }

  return 'default';
};

const build360Scene = (scene, hotspots = [], startScenePosition, finish) => {
  const { name, furniture, key, finishScenes } = scene;
  const time = new Date().getTime();
  const uri = `${scene.image}?${time}`;
  const panorama = {};
  panorama.uri = uri;
  panorama.name = key;
  panorama.finish = getSelectedFinish(finish, finishScenes);
  return {
    name,
    key,
    panorama,
    hotspots,
    startScenePosition,
    furniture
  };
};

export {
  getClosest,
  callFilter,
  deleteWhiteSpaces,
  removeAccents,
  bindEvent,
  sendMessage,
  truncate,
  numberWithCommas,
  isMobileDevice,
  isTablet,
  isPreview,
  isSurveyCompleted,
  getLevelData,
  get360DataStyle,
  get360Scene,
  get360Style,
  titleCase,
  hasGyroscope,
  isPortrait,
  get360Use,
  get360Uses,
  getRoomToRequest,
  getCurrentRoomUse,
  getProcessed360Data,
  getViewerDependingOnPreview,
  build360Scene
};
