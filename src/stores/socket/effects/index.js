import SocketModel from '../models';

export default class SocketEffect {
  static async sendMessage(socket, socketData) {
    const model = new SocketModel(socketData);
    socket.emit('three-sixty-log', model);

    return model;
  }
}
