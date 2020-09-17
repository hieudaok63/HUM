import { combineReducers } from 'redux';
import ErrorReducer from './error/reducers';
import LanguageReducer from './language/reducers';
import LoadingReducer from './loading/reducers';
import SessionReducer from './session/reducers';
import ThreeSixtyReducer from './threeSixty/reducers';

const rootReducer = combineReducers({
  error: new ErrorReducer().reducer,
  loading: new LoadingReducer().reducer,
  session: new SessionReducer().reducer,
  language: new LanguageReducer().reducer,
  threeSixty: new ThreeSixtyReducer().reducer
});

export default rootReducer;
