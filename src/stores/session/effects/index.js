import {
  WEBAPP_API,
  THREE_SIXTY_API,
  THREE_SIXTY_API_KEY
} from '../../../config/endpoints';
import HttpUtility from '../../../utilities/HttpUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import { LoginModel, LogModel } from '../models';

export default class SessionEffect {
  static async login(language, email, password, cookies = null) {
    const endpoint = `${WEBAPP_API}/${language}/login`;

    const loginObj = { email, password };
    const response = await HttpUtility.post(endpoint, {
      body: JSON.stringify({
        ...loginObj
      })
    });
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }
    if (cookies) {
      const {
        token,
        user,
        refreshToken,
        expirationTime,
        accessToken
      } = response.data;
      cookies.set('user', JSON.stringify(user));
      cookies.set('token', token);
      cookies.set('refreshToken', refreshToken);
      cookies.set('expirationTime', expirationTime);
      cookies.set('accessToken', accessToken);
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('expirationTime', expirationTime);
      sessionStorage.setItem('accessToken', accessToken);
    }
    const model = new LoginModel(response.data);

    return model;
  }

  /* */
  static async log(language, builderId, projectId, layoutName, logs) {
    const endpoint = `${THREE_SIXTY_API}${language}/360s/logs`;
    const log = {
      builderId,
      projectId,
      layoutName,
      logs
    };
    const response = await HttpUtility.post(endpoint, {
      headers: {
        'x-api-key': THREE_SIXTY_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(log)
    });
    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    const model = new LogModel(response.data);

    return model;
  }
}
