import { getLocalStorage } from '../utils';

export const ENV = getLocalStorage('ENV') || process.env.REACT_APP_ENV;

export const logger = getLocalStorage('logger') || false;

export const threeSixtyBuilder =
  getLocalStorage('three-sixty-builder') || false;
