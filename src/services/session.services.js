import {
  WEBAPP_API,
  WEBAPP_API_KEY,
  THREE_SIXTY_API_KEY,
  THREE_SIXTY_API,
  VERSION
} from '../config/endpoints';

const login = (email, password, language = 'en') =>
  fetch(`${WEBAPP_API}/${language}/login`, {
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
  builderId = '',
  propertyId = '',
  layoutName,
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  uses = [],
  mode = 'day'
) => {
  return fetch(
    `${THREE_SIXTY_API}${lang}/360s/room-use/${builderId}/${propertyId}/${layoutName}${VERSION}/${level}/${style}/${room.trim()}/${mode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': THREE_SIXTY_API_KEY
      },
      body: JSON.stringify({
        uses
      })
    }
  ).then((response) => response.json());
};

const get360JsonWithFinishes = (
  builderId = '',
  propertyId = '',
  layoutName,
  lang = 'en',
  level = '1',
  style = 'default',
  room = 'default',
  uses = [],
  mode = 'day',
  finish = 'default'
) => {
  return fetch(
    `${THREE_SIXTY_API}${lang}/360s/room-use-finish/${builderId}/${propertyId}/${layoutName}${VERSION}/${level}/${style}/${room.trim()}/${finish}/${mode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': THREE_SIXTY_API_KEY
      },
      body: JSON.stringify({
        uses
      })
    }
  ).then((response) => response.json());
};

const get360Scenes = (
  builderId = '',
  propertyId = '',
  layoutName,
  lang = 'en',
  level = '1',
  style = 'default',
  mode = 'day'
) =>
  fetch(
    `${THREE_SIXTY_API}${lang}/360s/rooms/${builderId}/${propertyId}/${layoutName}${VERSION}/${level}/${style}/${mode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': THREE_SIXTY_API_KEY
      }
    }
  ).then((response) => response.json());

const getFurniture360ByStyles = (
  builderId,
  propertyId,
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
  return fetch(
    `${WEBAPP_API}/${language}/furniture/360/${builderId}/${propertyId}/${layout}/${level}/${scene}`,
    init
  ).then((response) => response.json());
};

const saveFavoriteFurniture = (authToken, language, body) =>
  fetch(`${WEBAPP_API}/${language}/furniture/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());

const countClickFurniture = (language, body) =>
  fetch(`${WEBAPP_API}/${language}/furniture/favorite/guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());

const get360Styles = (
  builderId = '',
  propertyId = '',
  layoutName,
  lang = 'en',
  level = '1',
  room = 'default',
  mode = 'day'
) =>
  fetch(
    `${THREE_SIXTY_API}${lang}/360s/styles-room/${builderId}/${propertyId}/${layoutName}${VERSION}/${level}/${room}/${mode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': THREE_SIXTY_API_KEY
      }
    }
  ).then((response) => response.json());

// Guest
const getGuestFurniture360ByStyles = (
  builderId,
  propertyId,
  language,
  styles = ['contemporary', 'scandinavian', 'transitional'],
  scene,
  layout,
  level
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', WEBAPP_API_KEY);
  const bodyObj = {
    styles
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(
    `${WEBAPP_API}/${language}/furniture/360/guest/${builderId}/${propertyId}/${layout}/${level}/${scene}`,
    init
  ).then((response) => response.json());
};
// End Guest

const saveLog = (language, log) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', THREE_SIXTY_API_KEY);
  const bodyObj = {
    ...log
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(
    `${THREE_SIXTY_API}${language}/360s/logs`,
    init
  ).then((response) => response.json());
};

export {
  login,
  getFurniture360ByStyles,
  saveFavoriteFurniture,
  countClickFurniture,
  get360JSON,
  get360JsonWithFinishes,
  get360Scenes,
  get360Styles,
  // Guest
  getGuestFurniture360ByStyles,
  saveLog
};
