class ThreeSixtyModel {
  constructor(data) {
    this.levelPosition = data.levelPosition;
    this.displayName = data.displayName;
    this.selectedStyleName = data.selectedStyleName;
    this.selectedStyle = data.selectedStyle;
    this.selectedScene = data.selectedScene;
    this.currentRoomUse = data.currentRoomUse;
    this.personalized = data.personalized;
    this.takeTestUri = data.takeTestUri;
    this.levelMinimap = data.levelMinimap;
    this.currentLevel = data.currentLevel;
    this.registerUri = data.registerUri;
    this.rotationMessage = data.rotationMessage;
    this.shoppingMenuTitle = data.shoppingMenuTitle;
    this.showShoppingCar = data.showShoppingCar;
    this.totalPages = data.totalPages;
    this.miniMapHotspots = data.miniMapHotspots;
    this.totalLevels = data.totalLevels;
    this.layoutName = data.layoutName;
    this.roomUse = data.roomUse;
    this.furniture = data.furniture;
    this.builderId = data.builderId;
    this.projectId = data.projectId;
    this.mapSize = data.mapSize;
    this.threeSixty = data.threeSixty;
    this.finishScenes = data.finishScenes;
  }

  levelPosition = {
    bottom: '0px',
    right: '0px'
  };

  displayName = '';

  selectedStyleName = 'default';

  selectedStyle = 'default';

  selectedScene = 'default';

  currentRoomUse = 'default';

  personalized = {};

  takeTestUri = '';

  levelMinimap = '';

  currentLevel = 1;

  registerUri = '';

  rotationMessage = '';

  shoppingMenuTitle = false;

  showShoppingCar = false;

  totalPages = 0;

  miniMapHotspots = [];

  totalLevels = 0;

  layoutName = '';

  roomUse = [];

  furniture = [];

  builderId = '';

  projectId = '';

  mapSize = {};

  threeSixty = {};

  finishScenes = {};
}

class ThreeSixtyStyleScenesModel {
  constructor(data) {
    this.scenes = data.style.scenes;
    this.builderLogo = data.builderLogo;
  }

  scenes = [];

  builderLogo = '';
}

class ThreeSixtyStylesMenuModel {
  constructor(data) {
    this.menu = data.styles;
  }

  menu = [];
}

export {
  ThreeSixtyModel,
  ThreeSixtyStyleScenesModel,
  ThreeSixtyStylesMenuModel
};
