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
    this.selectedStyleName = data.style.name;
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

class ThreeSixtyUseWithFinishes {
  constructor(data) {
    this.builderId = data.builderId;
    this.builderLogo = data.builderLogo;
    this.defaultStyle = data.defaultStyle;
    this.displayName = data.displayName;
    this.language = data.language;
    this.layoutName = data.layoutName;
    this.levels = data.levels;
    this.menu = data.menu;
    this.personalized = data.personalized;
    this.projectId = data.projectId;
    this.rotationMessage = data.rotationMessage;
    this.shoppingCart = data.shoppingCart;
    this.showError = data.showError;
    this.surveyCompletedDefaults = data.surveyCompletedDefaults;
    this.totalLevels = data.totalLevels;
    this.urls = data.urls;
  }

  builderId = '';
  builderLogo = '';
  defaultStyle = '';
  displayName = '';
  language = '';
  layoutName = '';
  levels = [];
  menu = [];
  personalized = {};
  projectId = 0;
  rotationMessage = '';
  shoppingCart = {};
  showError = false;
  surveyCompletedDefaults = {};
  totalLevels = 1;
  urls = {};
}

class ThreeSixtyFurnitureByStyles {
  constructor(data) {
    this.furniture = data.furniture;
  }

  furniture = [];
}

class ThreeSixtyItem {
  constructor(data) {
    this.threeSixty = data.threeSixtyItem;
    this.level = data.currentLevel;
    this.selectedScene = data.selectedScene;
    this.selectedStyle = data.selectedStyle;
    this.levels = this.getScenes();
  }

  threeSixty = {};

  getScenes() {
    const selectedStyle =
      this.selectedStyle === 'default'
        ? this.threeSixty.defaultStyle
        : this.selectedStyle;
    const currentLevel = this.threeSixty.levels.find(
      (level) => level.levelNumber === this.level
    );
    const scenes = currentLevel.styles.find((style) => {
      return style.key === selectedStyle;
    });

    console.log('scenes', scenes);

    return scenes;
  }
}

export {
  ThreeSixtyModel,
  ThreeSixtyStyleScenesModel,
  ThreeSixtyStylesMenuModel,
  ThreeSixtyUseWithFinishes,
  ThreeSixtyFurnitureByStyles,
  ThreeSixtyItem
};
