/* eslint-disable class-methods-use-this */
import SessionAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class SessionReducer extends BaseReducer {
  initialState = {
    token: '',
    user: {},
    email: '',
    refreshToken: '',
    authTime: '',
    expirationTime: 0
  };

  [SessionAction.LOGIN_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      email: action.payload.user.email,
      refreshToken: action.payload.refreshToken,
      authTime: action.payload.authTime,
      expirationTime: action.payload.expirationTime
    };
  }
  [SessionAction.LOG_REQUEST_FINISHED](state) {
    return {
      ...state
    };
  }
}
