import ActionUtility from '../../../utilities/ActionUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import SessionEffect from '../effects';

export default class SessionAction {
  static LOGIN_REQUEST = 'LOGIN_REQUEST';

  static LOGIN_REQUEST_FINISHED = 'LOGIN_REQUEST_FINISHED';

  static login(email, password, cookies) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        SessionAction.LOGIN_REQUEST,
        SessionEffect.login,
        language,
        email,
        password,
        cookies
      );
      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }
}
