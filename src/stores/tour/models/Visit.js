export default class Visit {
  constructor(
    data = {
      mainPage: {},
      virtualVisit: [],
      presentialVisit: [],
      timeZone: '',
      hasScheduleMeeting: false
    }
  ) {
    this.mainPage = data.mainPage;
    this.virtualVisit = data.virtualVisit;
    this.presentialVisit = data.presentialVisit;
    this.timeZone = data.timeZone;
    this.canSchedule = data.hasScheduleMeeting;
  }

  mainPage = {};
  virtualVisit = [];
  presentialVisit = [];
  timeZone = '';
  canSchedule = false;
}
