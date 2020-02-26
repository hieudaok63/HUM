import {
  webAppApiProd,
  xApiKey,
  xApiKey360,
  ThreeSixtyAppApiProd
} from '../config/endpoints';

const getConfiguration = () =>
  fetch('config.json').then((response) => response.json());

const login = (email, password, language = 'en') =>
  fetch(`${webAppApiProd}/${language}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((res) => res.json());

const get360JSON = (
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  roomUse = []
) =>
  getConfiguration().then((builderInfo) => {
    const { builderId, propertyId, layoutName } = builderInfo;
    return fetch(
      `${ThreeSixtyAppApiProd}${lang}/360s/${builderId}/${propertyId}/${layoutName}/${level}/${style}/${room.trim()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': xApiKey360
        },
        body: JSON.stringify({
          roomUse
        })
      }
    ).then((response) => response.json());
  });

const get360Scenes = (lang = 'en', level = '1', style = 'default') =>
  getConfiguration().then((builderInfo) => {
    const { builderId, propertyId, layoutName } = builderInfo;
    return fetch(
      `${ThreeSixtyAppApiProd}${lang}/360s/scenes/${builderId}/${propertyId}/${layoutName}/${level}/${style}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': xApiKey360
        }
      }
    ).then((response) => response.json());
  });

const getFurniture360ByStyles = (
  authToken,
  language,
  styles = ['contemporary', 'scandinavian', 'transitional'],
  scene,
  layout,
  level
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${authToken}`);
  const bodyObj = {
    styles
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return getConfiguration().then((builderInfo) => {
    const { builderId, propertyId } = builderInfo;
    return fetch(
      `${webAppApiProd}/${language}/furniture/360/${builderId}/${propertyId}/${layout}/${level}/${scene}`,
      init
    ).then((response) => response.json());
  });
};

const saveFavoriteFurniture = (authToken, language, body) =>
  fetch(`${webAppApiProd}/${language}/furniture/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());

const countClickFurniture = (language, body) =>
  fetch(`${webAppApiProd}/${language}/furniture/favorite/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());

const get360Styles = (lang = 'en', level = '1', room = 'default') =>
  getConfiguration().then((builderInfo) => {
    const { builderId, propertyId, layoutName } = builderInfo;
    return fetch(
      `${ThreeSixtyAppApiProd}${lang}/360s/v2/styles-room/${builderId}/${propertyId}/${layoutName}/${level}/${room}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': xApiKey360
        }
      }
    ).then((response) => response.json());
  });

// Guest
const getGuestFurniture360ByStyles = (
  language,
  styles = ['contemporary', 'scandinavian', 'transitional'],
  scene,
  layout,
  level
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', xApiKey);
  const bodyObj = {
    styles
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return getConfiguration((builderInfo) => {
    const { builderId, propertyId } = builderInfo;
    return fetch(
      `${webAppApiProd}/${language}/furniture/360/guest/${builderId}/${propertyId}/${layout}/${level}/${scene}`,
      init
    ).then((response) => response.json());
  });
};
// End Guest

export {
  login,
  getFurniture360ByStyles,
  saveFavoriteFurniture,
  countClickFurniture,
  get360JSON,
  get360Scenes,
  get360Styles,
  // Guest
  getGuestFurniture360ByStyles
};
