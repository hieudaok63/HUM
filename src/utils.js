import queryString from 'query-string';
import Data from './assets/Data';

/* eslint-disable no-param-reassign */

const deleteWhiteSpaces = (s) => {
  if (typeof s !== 'string') return '';
  return s.replace(/ +/g, '');
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

const getUse = (roomKey, scene) => {
  const use = scene.filter((item) =>
    item.key.toLowerCase() === roomKey.toLowerCase() ? item : null
  );
  return use && use[0];
};

const getCurrentRoomUse = (use) => use.key;

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

const getLevelScenes = (currentLevel, style) => {
  const currentStyle = currentLevel.styles.filter(
    (levelStyle) => levelStyle.key === style
  );
  return currentStyle.length > 0
    ? currentStyle[currentStyle.length - 1].scenes
    : [];
};

const getScene = (scenes, sceneKey) => {
  const currentScene = scenes.filter((scene) => scene.key === sceneKey);
  return currentScene.length > 0 ? currentScene[currentScene.length - 1] : null;
};

const getScenes = (levels, selectedStyle) => {
  const scenes = [];
  levels.forEach((item) => {
    const level = item.styles.find((style) => style.key === selectedStyle);
    scenes.push(...level.scenes);
  });
  return scenes;
};

export {
  deleteWhiteSpaces,
  bindEvent,
  sendMessage,
  truncate,
  numberWithCommas,
  isMobileDevice,
  isTablet,
  isPreview,
  isSurveyCompleted,
  getLevelData,
  titleCase,
  hasGyroscope,
  isPortrait,
  getUse,
  getRoomToRequest,
  getCurrentRoomUse,
  getLevelScenes,
  getSelectedFinish,
  assignHotspotImage,
  getScene,
  getScenes
};
