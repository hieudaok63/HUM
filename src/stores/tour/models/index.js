export default class Tour {
  constructor(
    data = {
      builderId: '',
      projectId: '',
      logo: {},
      defaultLanguage: 'en',
      availableLanguages: [],
      floorplans: [],
      floorplansSectionName: {},
      sections: [],
      urls: {},
      location: {}
    }
  ) {
    this.builderId = data.builderId;
    this.projectId = data.projectId;
    this.logo = data.logo;
    this.defaultLanguage = data.defaultLanguage;
    this.availableLanguages = data.availableLanguages;
    this.floorplans = data.floorplans;
    this.floorplansSectionName = data.floorplansSectionName;
    this.sections = data.sections;
    this.urls = data.urls;
    this.location = data.location;
  }

  builderId = '';
  projectId = '';
  logo = {};
  defaultLanguage = 'en';
  availableLanguages = [];
  floorplans = [];
  floorplansSectionName = {};
  sections = [];
  urls = {};
  location = {};
}
