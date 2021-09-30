export default class AvailableTimes {
  constructor(
    data = {
      'available-times': []
    }
  ) {
    this.availableTimes = data['available-times'];
  }

  availableTimes = [];
}
