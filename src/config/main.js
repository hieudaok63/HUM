export const ENV = localStorage.getItem('ENV') || process.env.REACT_APP_ENV;

export const logger = localStorage.getItem('logger') || false;

export const threeSixtyBuilder =
  localStorage.getItem('three-sixty-builder') || false;
