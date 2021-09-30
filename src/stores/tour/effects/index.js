import { THREE_SIXTY_API } from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import Tour from '../models';
import Visit from '../models/Visit';

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

  static async getCustomPage(language, builder, project) {
    const endpoint = `${THREE_SIXTY_API}${language}/builders/${builder}/projects/${project}/visits/custom-pages`;
    const response = await HttpUtility.get(endpoint);
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new Visit(response.data['custom-pages']);

    return model;
  }

  static async getAvailableTimes(language, builder, project, date) {
    const endpoint = `${THREE_SIXTY_API}${language}/builders/${builder}/projects/${project}/visits/available-times/${date}`;
    const response = await HttpUtility.get(endpoint);
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = response.data['available-times'];

    return model;
  }

  static async postScheduleMeeting(language, builder, project, bodyObj) {
    const endpoint = `${THREE_SIXTY_API}${language}/builders/${builder}/projects/${project}/visits`;
    const response = await HttpUtility.post(endpoint, {
      body: JSON.stringify({
        ...bodyObj
      })
    });

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = response.data.visit;

    return model;
  }
}
