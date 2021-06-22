export default class Tour {
  constructor(
    data = {
      builderId: '',
      projectId: '',
      logo: {},
      defaultLanguage: 'en',
      availableLanguages: [],
      floorplans: [],
      amenities: [],
      exterior: [],
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
    this.amenities = data.amenities;
    this.exterior = data.exterior;
    this.urls = data.urls;
    this.location = data.location;
  }

  builderId = '';
  projectId = '';
  logo = {};
  defaultLanguage = 'en';
  availableLanguages = [];
  floorplans = [];
  amenities = [];
  exterior = [];
  urls = {};
  location = {};
}
