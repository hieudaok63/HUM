import { THREE_SIXTY_API } from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import Tour from '../models';

export default class TourEffect {
  static async getData(language, builder, project) {
    const endpoint = `${THREE_SIXTY_API}${language}/builders/${builder}/projects/${project}/360s`;
    const response = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new Tour(response.data);

    return model;
  }
}
