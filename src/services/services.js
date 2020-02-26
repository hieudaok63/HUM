const getScenes = (builderId, projectId, layoutName, endpoint) =>
  fetch(
    `${endpoint}v1/${builderId}/${projectId}/${layoutName}`
  ).then((response) => response.json());

const getConfiguration = () =>
  fetch('config.json').then((response) => response.json());

const getFurnitureGuest = (endpoint, styles, room, apiKey, lan) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('x-api-key', apiKey);
  const bodyObj = {
    styles,
    roomType: room
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(`${endpoint}${lan}/furniture/360/guest`, init).then((response) =>
    response.json()
  );
};

const getFurniture = (endpoint, styles, room, token, lan) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  const bodyObj = {
    styles,
    roomType: room
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(`${endpoint}${lan}/furniture/360`, init).then((response) =>
    response.json()
  );
};

const registerFurnitureClick = (endpoint, id, lan) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const bodyObj = {
    assetId: id
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(
    `${endpoint}${lan}/furniture/favorite/guest`,
    init
  ).then((response) => response.json());
};

const registerFavorite = (
  endpoint,
  id,
  style,
  roomType,
  favorite,
  token,
  lan
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  const bodyObj = {
    assetId: id,
    style,
    roomType,
    favorite
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(`${endpoint}${lan}/furniture/favorite`, init).then((response) =>
    response.json()
  );
};

const login = (endpoint, email, password, lan) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const bodyObj = {
    email,
    password
  };
  const init = {
    method: 'POST',
    headers,
    body: JSON.stringify(bodyObj)
  };
  return fetch(`${endpoint}${lan}/login`, init).then((response) =>
    response.json()
  );
};

export {
  getScenes,
  getConfiguration,
  getFurnitureGuest,
  getFurniture,
  registerFurnitureClick,
  registerFavorite,
  login
};
