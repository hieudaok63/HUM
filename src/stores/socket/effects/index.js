import SocketModel from '../models';

export default class SocketEffect {
  static async sendMessage(socket, socketData, event) {
    const model = new SocketModel(socketData);
    socket.emit(event, model);

    return model;
  }
}
