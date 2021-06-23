import { THREE_SIXTY_API } from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import Tour from '../models';

export default class TourEffect {
  static async getMockData(language) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s`;
    const response = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new Tour(response.data);

    return model;
  }
}
