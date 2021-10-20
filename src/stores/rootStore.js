import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ENV } from '../config/main';
import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  const middleware = [thunk];
  if (ENV === 'development') {
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
