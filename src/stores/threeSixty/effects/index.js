import {
  THREE_SIXTY_API,
  THREE_SIXTY_API_KEY,
  VERSION
} from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import {
  ThreeSixtyStyleScenesModel,
  ThreeSixtyStylesMenuModel
} from '../models';

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
    const endpoint = `${THREE_SIXTY_API}${language}/360s/rooms/${builderId}/${projectId}/${layoutName}${VERSION}/${level}/${style}/${mode}`;

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
    const endpoint = `${THREE_SIXTY_API}${language}/360s/styles-room/${builderId}/${projectId}/${layoutName}${VERSION}/${level}/${room}/${mode}`;

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
}
