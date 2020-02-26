import queryString from 'query-string';

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
    item.type.toLowerCase() === style.toLowerCase() ||
    item.name.toLowerCase() === style.toLowerCase()
      ? item
      : null
  );
  return menuStyle && menuStyle[0].name;
};

const get360DataStyle = (currentStyle, styles) => {
  const style = styles.filter((item) =>
    item.name === currentStyle ? item : null
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
  isPortrait
};
