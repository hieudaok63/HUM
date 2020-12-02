export default class SocketModel {
  constructor(data) {
    this.id = data.id;
    this.event = data.event;
    this.data = data.data;
  }

  id = '';
  event = '';
  data = { type: '', action: '' };
}
