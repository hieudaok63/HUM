import ActionUtility from '../../../utilities/ActionUtility';
import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import SessionEffect from '../effects';
import SocketAction from '../../socket/actions';

export default class SessionAction {
  static LOGIN_REQUEST = 'LOGIN_REQUEST';

  static LOGIN_REQUEST_FINISHED = 'LOGIN_REQUEST_FINISHED';

  static LOG_REQUEST = 'LOG_REQUEST';

  static LOG_REQUEST_FINISHED = 'LOG_REQUEST_FINISHED';

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

  /* */
  static log(logs) {
    return async (dispatch, getState) => {
      const { language: stateLanguage, threeSixty } = getState();
      const { language } = stateLanguage;
      const { builderId, propertyId, layoutName, selectedScene } = threeSixty;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        SessionAction.LOG_REQUEST,
        SessionEffect.log,
        language,
        builderId,
        propertyId,
        layoutName,
        logs
      );
      // dispatch(
      //   SocketAction.socketMessage({
      //     event: 'CHANGE-SCENE',
      //     data: {
      //       type: 'CHANGE-SCENE',
      //       name: selectedScene
      //     }
      //   })
      // );
      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }
}
