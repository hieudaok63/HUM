export default class ThreeSixtyModel {
  constructor(data) {
    console.log(data.floorplan);
    this.builderId = data.builderId;
    this.projectId = data.projectId;
    this.floorplan = data.floorplan;
    this.layoutName = this.getLayoutName();
    this.displayName = this.getDisplayName();
    this.defaultStyle = this.getDefaultStyle();
    this.levels = this.getLevels();
    this.styles = this.getStyles();
    this.area = this.getArea();
    this.bathrooms = this.getBathrooms();
    this.bedrooms = this.getBedrooms();
    this.features = this.getFeatures();
    this.floorPlanId = this.getFloorplanId();
    this.parking = this.getParking();
    this.unit = this.getUnit();
    this.level = this.getLevel();
    this.levelScenes = this.getLevelScenes();
    this.miniMap = this.getLevelMinimap();
    this.selectedScene = this.getSelectedScene();
  }

  builderId = '';
  projectId = '';
  floorplan = {};
  layoutName = '';
  displayName = '';
  defaultStyle = '';
  levels = [];
  styles = [];
  area = 0;
  bathrooms = 0;
  bedrooms = 0;
  features = [];
  floorPlanId = null;
  parking = 0;
  unit = '';
  level = {};

  getLayoutName() {
    return this.floorplan?.layoutName;
  }

  getDisplayName() {
    return this.floorplan?.displayName;
  }

  getDefaultStyle() {
    return this.floorplan?.defaultStyle;
  }

  getLevels() {
    return this.floorplan?.levels;
  }

  getStyles() {
    return this.floorplan?.styles;
  }

  getArea() {
    return this.floorplan?.area;
  }

  getBathrooms() {
    return this.floorplan?.bathrooms;
  }

  getBedrooms() {
    return this.floorplan?.bedrooms;
  }

  getFeatures() {
    return this.floorplan?.features;
  }

  getFloorplanId() {
    return this.floorplan?.floorPlanId;
  }

  getParking() {
    return this.floorplan?.parking;
  }

  getUnit() {
    return this.floorplan?.unit;
  }

  getLevel() {
    return this.floorplan?.levels[0];
  }

  getLevelScenes() {
    return this.level?.scenes;
  }

  getLevelMinimap() {
    return this.level?.minimap;
  }

  getSelectedScene() {
    return this.level?.defaultScene;
  }
}
