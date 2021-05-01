import {
  THREE_SIXTY_API,
  THREE_SIXTY_API_KEY,
  WEBAPP_API,
  WEBAPP_API_KEY,
  VERSION
} from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import {
  ThreeSixtyStyleScenesModel,
  ThreeSixtyStylesMenuModel,
  ThreeSixtyUseWithFinishes,
  ThreeSixtyFurnitureByStyles,
  ThreeSixtyItem
} from '../models';
import { getScenes } from '../../../utils';

export default class ThreeSixtyEffect {
  static async getScenes(
    language,
    builderId,
    projectId,
    layoutName,
    level,
    style,
    mode
  ) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/rooms/${builderId}/${projectId}/${layoutName.replace(
      VERSION,
      ''
    )}${VERSION}/${level}/${style}/${mode}`;

    const response = await HttpUtility.get(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY
      }
    });
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new ThreeSixtyStyleScenesModel(response.data);

    return model;
  }

  static async getStyles(
    language,
    builderId,
    projectId,
    layoutName,
    level,
    room,
    mode
  ) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/styles-room/${builderId}/${projectId}/${layoutName.replace(
      VERSION,
      ''
    )}${VERSION}/${level}/${room}/${mode}`;
    const response = await HttpUtility.get(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY
      }
    });
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new ThreeSixtyStylesMenuModel(response.data);

    return model;
  }

  /** this one request the 360 datas */
  static async getScenesByStyles(
    language,
    builderId,
    propertyId,
    layoutName,
    level,
    selectedStyle
  ) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/style-scenes/${builderId}/${propertyId}/${layoutName.replace(
      VERSION,
      ''
    )}${VERSION}`;

    const response = await HttpUtility.post(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY
      }
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new ThreeSixtyUseWithFinishes({
      ...response.data,
      level,
      selectedStyle
    });

    return model;
  }

  static async getFurnitureByStyles(
    language,
    builderId,
    projectId,
    styles,
    scene,
    layout,
    level
  ) {
    const endpoint = `${WEBAPP_API}/${language}/furniture/360/guest/${builderId}/${projectId}/${layout}/${level}/${scene}`;
    const bodyObj = {
      styles
    };
    const response = await HttpUtility.post(endpoint, {
      headers: {
        'x-api-key': WEBAPP_API_KEY
      },
      body: JSON.stringify({
        bodyObj
      })
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new ThreeSixtyFurnitureByStyles(
      response.data.furnitureList[0]
    );

    return model;
  }

  static async furnitureCount(language, body) {
    const endpoint = `${WEBAPP_API}/${language}/furniture/favorite/guest`;
    const response = await HttpUtility.post(endpoint, {
      body: JSON.stringify({
        ...body
      })
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return true;
  }

  static async saveLog(language, log) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/logs`;
    const response = await HttpUtility.post(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY
      },
      body: JSON.stringify({
        log
      })
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return true;
  }

  static async get360Item(
    language,
    builderId,
    projectId,
    layoutName,
    selectedScene,
    selectedStyle,
    currentLevel
  ) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/${builderId}/${projectId}/${layoutName.replace(
      VERSION,
      ''
    )}${VERSION}`;

    const response = await HttpUtility.get(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY
      }
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new ThreeSixtyItem({
      ...response.data,
      selectedStyle,
      selectedScene,
      currentLevel
    });

    return model;
  }

  static async changeSceneSphere(threeSixty, key) {
    threeSixty.changeSphereScene(key);
  }

  static async updateSpheresFinishes(threeSixty, finish) {
    threeSixty.updateFinishes(finish);
  }

  static async updateSpheres(
    threeSixty,
    levels,
    currentLevel,
    selectedStyle,
    selectedScene,
    selectedFinish
  ) {
    const scenes = getScenes(levels, selectedStyle);
    threeSixty.updateScenes(
      scenes,
      selectedScene,
      selectedFinish,
      selectedStyle
    );
  }

  static async updateLevel(threeSixty, levels, currentLevel) {
    const level = levels[currentLevel - 1];
    threeSixty.changeSphereScene(level.defaultScene);
    return level.defaultScene;
  }

  static async changeSphereUse(
    threeSixty,
    selectedScene,
    selectedFinish,
    selectedUse
  ) {
    threeSixty.updateUse(selectedScene, selectedFinish, selectedUse);
  }

  static async getSphereUse(threeSixty, selectedScene) {
    return threeSixty.getSceneUse(selectedScene);
  }
}
