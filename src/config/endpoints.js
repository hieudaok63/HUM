const ENV = localStorage.getItem('ENV') || 'development';
export const WEBAPP_API_DEV = 'https://test-webapp-api.athum.co';
export const WEBAPP_API_PROD = 'https://webapp-api.athum.co';
export const WEBAPP_API =
  ENV === 'production' ? WEBAPP_API_PROD : WEBAPP_API_DEV;

export const WEBAPP_API_KEY_DEV = 'f4SkXvQiyq2kGtKvaBP3b1OHcWROXreG6Vq6wO7e';
export const WEBAPP_API_KEY_PROD = 'RVSTgA7lWk3hFLgka7j68S2moU5zmzA5OkT0Qmr8';
export const WEBAPP_API_KEY =
  ENV === 'production' ? WEBAPP_API_KEY_PROD : WEBAPP_API_KEY_DEV;

export const THREE_SIXTY_API_DEV =
  'https://us-central1-avria-production.cloudfunctions.net/three_sixty_api_dev/v1/';
// 'https://360-api.athum.com/three_sixty_api_dev/v1/';
export const THREE_SIXTY_API_STAGING = 'https://staging-360-api.athum.com/';
export const THREE_SIXTY_API_PROD = 'https://360-api.athum.com/v3/';
export const THREE_SIXTY_GOOGLE_API_PROD =
  'https://us-west2-avria-production.cloudfunctions.net/three_sixty_api/prod/v1/';

const threeSixtyApi = {
  production: THREE_SIXTY_GOOGLE_API_PROD,
  development: THREE_SIXTY_API_DEV,
  staging: THREE_SIXTY_API_STAGING
};

export const THREE_SIXTY_API = threeSixtyApi[ENV];

export const THREE_SIXTY_API_PROD_KEY =
  'tHcR7YBjJG4Ty9I0IYEVU4ejEotjYksb1uFC0wbr';
export const THREE_SIXTY_API_DEV_KEY =
  'UGDB9Sr4mR2IzN532KZW07uA5tAraS0T6Ah9QPNr';
export const THREE_SIXTY_API_STAGING_KEY =
  'YbSM7a1Q6zaPXLfXlTCXK1P0uXpZTNr946Yf0tKp';

const threeSixtyApiKey = {
  production: THREE_SIXTY_API_PROD_KEY,
  development: THREE_SIXTY_API_DEV_KEY,
  staging: THREE_SIXTY_API_STAGING_KEY
};

export const THREE_SIXTY_API_KEY = threeSixtyApiKey[ENV];

export const SOCKET_TEST_API = 'https://virtualsalesapp.azurewebsites.net';
export const SOCKET_PROD_API = 'https://prod-rso-websocket.azurewebsites.net';
export const SOCKET_STAGING_API =
  'https://staging-athum-rso-ws.azurewebsites.net';
const socket = {
  production: SOCKET_PROD_API,
  development: SOCKET_TEST_API,
  staging: SOCKET_STAGING_API
};
export const SOCKET = socket[ENV];

export const VERSION = process.env.REACT_APP_VERSION;
