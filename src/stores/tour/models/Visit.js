export default class Visit {
  constructor(
    data = {
      mainPage: {},
      virtualVisit: [],
      presentialVisit: [],
      timeZone: ''
    }
  ) {
    this.mainPage = data.mainPage;
    this.virtualVisit = data.virtualVisit;
    this.presentialVisit = data.presentialVisit;
    this.timeZone = data.timeZone;
  }

  mainPage = {};
  virtualVisit = [];
  presentialVisit = [];
  timeZone = '';
}
