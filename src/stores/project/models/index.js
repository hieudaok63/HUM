import { returnProjectTheme } from '../../../utils';

export default class SectionsModel {
  constructor(data = {}, propertyId = null, propertiesSections = {}) {
    const {
      project = {},
      projects = [],
      builder: builderInfo = {},
      layout: selectedLayout = null,
      layouts: prices = [],
      defaultProjectId = null
    } = data;
    const {
      sections = [],
      general = {},
      twilioMeetingAvailable = false,
      id = null
    } = project;
    const existingSections = propertiesSections;
    if (propertyId) {
      existingSections[propertyId] = sections;
    }
    this.sections = sections;
    this.general = general;
    this.propertiesSections = existingSections;
    this.selectedProject = defaultProjectId || id || propertyId;
    this.theme = returnProjectTheme(project);
    this.twilioMeetingAvailable = twilioMeetingAvailable;
    this.id = id;
    this.projects = projects;
    this.builderInfo = builderInfo;
    this.selectedLayout = selectedLayout;
    this.prices = prices;
  }

  sections = [];

  general = {};

  propertiesSections = {};

  selectedProject = null;

  theme = {};

  twilioMeetingAvailable = false;

  id = null;

  projects = [];

  builderInfo = {};

  selectedLayout = null;

  prices = [];
}
