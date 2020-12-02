/* eslint-disable class-methods-use-this */
import SocketAction from '../actions';
import BaseReducer from '../../../utilities/BaseReducer';

export default class SocketReducer extends BaseReducer {
  initialState = {
    socket: {}
  };

  [SocketAction.SOCKET_INIT_REQUEST_FINISHED](state, action) {
    return {
      ...state,
      socket: action.payload
    };
  }
  [SocketAction.SOCKET_MESSAGE_REQUEST_FINISHED](state) {
    return {
      ...state
    };
  }
}
