import { combineReducers } from 'redux';
import ErrorReducer from './error/reducers';
import LanguageReducer from './language/reducers';
import LoadingReducer from './loading/reducers';
import PanoramaReducer from './panorama/reducers';
import SessionReducer from './session/reducers';
import ThreeSixtyReducer from './threeSixty/reducers';
import SocketReducer from './socket/reducers';
import TourReducer from './tour/reducers';
import AmenitiesReducer from './amenities/reducers';
import MenuReducer from './menu/reducers';
import ProjectReducer from './project/reducers';

const rootReducer = combineReducers({
  error: new ErrorReducer().reducer,
  loading: new LoadingReducer().reducer,
  session: new SessionReducer().reducer,
  language: new LanguageReducer().reducer,
  threeSixty: new ThreeSixtyReducer().reducer,
  panorama: new PanoramaReducer().reducer,
  socket: new SocketReducer().reducer,
  tour: new TourReducer().reducer,
  amenities: new AmenitiesReducer().reducer,
  menu: new MenuReducer().reducer,
  project: new ProjectReducer().reducer
});

export default rootReducer;
