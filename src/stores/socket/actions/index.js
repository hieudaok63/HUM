import socketIOClient from 'socket.io-client';
import ActionUtility from '../../../utilities/ActionUtility';
import SocketEffect from '../effects';

export default class SocketAction {
  static SOCKET_INIT_REQUEST = 'SOCKET_INIT_REQUEST';

  static SOCKET_INIT_REQUEST_FINISHED = 'SOCKET_INIT_REQUEST_FINISHED';

  static SOCKET_MESSAGE_REQUEST = 'SOCKET_MESSAGE_REQUEST';

  static SOCKET_MESSAGE_REQUEST_FINISHED = 'SOCKET_MESSAGE_REQUEST_FINISHED';

  static initSocket(url) {
    const io = socketIOClient(url);
    return ActionUtility.createAction(
      SocketAction.SOCKET_INIT_REQUEST_FINISHED,
      io
    );
  }

  static socketMessage(data) {
    return async (dispatch, getState) => {
      const { socket: socketState, session } = getState();
      const { socket } = socketState;
      const { logId } = session;
      const socketData = data;
      socketData.id = logId;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        SocketAction.SOCKET_MESSAGE_REQUEST,
        SocketEffect.sendMessage,
        socket,
        socketData
      );

      return { model };
    };
  }
}
