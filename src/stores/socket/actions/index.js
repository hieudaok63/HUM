import socketIOClient from 'socket.io-client';
import ActionUtility from '../../../utilities/ActionUtility';
import SocketEffect from '../effects';

export default class SocketAction {
  static SOCKET_INIT_REQUEST = 'SOCKET_INIT_REQUEST';

  static SOCKET_INIT_REQUEST_FINISHED = 'SOCKET_INIT_REQUEST_FINISHED';

  static SOCKET_MESSAGE_REQUEST = 'SOCKET_MESSAGE_REQUEST';

  static SOCKET_MESSAGE_REQUEST_FINISHED = 'SOCKET_MESSAGE_REQUEST_FINISHED';

  /* */
  static initSocket(url) {
    const io = socketIOClient(url, {
      withCredentials: false,
      reconnectionDelayMax: 10000
    });
    io.connect();
    return ActionUtility.createAction(
      SocketAction.SOCKET_INIT_REQUEST_FINISHED,
      io
    );
  }

  /* */
  static disconnect() {
    return async (dispatch, getState) => {
      const { socket: socketState } = getState();
      const { socket } = socketState;
      socket.disconnect();
    };
  }

  /* */
  static socketMessage(data, event) {
    return async (dispatch, getState) => {
      const { socket: socketState, threeSixty } = getState();
      const { socket } = socketState;
      const { builderId, projectId, layoutName } = threeSixty;
      const socketData = data;
      socketData.builderId = builderId;
      socketData.projectId = projectId;
      socketData.layoutName = layoutName;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        SocketAction.SOCKET_MESSAGE_REQUEST,
        SocketEffect.sendMessage,
        socket,
        socketData,
        event
      );

      return { model };
    };
  }
}
