import SocketModel from '../models';

export default class SocketEffect {
  static async sendMessage(socket, socketData) {
    const model = new SocketModel(socketData);
    console.log(model);
    if (socket) {
      socket.emit('three-sixty-log', model);
    }

    return model;
  }
}
