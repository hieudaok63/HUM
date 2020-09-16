import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import ActionUtility from '../../../utilities/ActionUtility';
import ThreeSixtyEffect from '../effects';

export default class ThreeSixtyAction {
  static VIEW_MENU_REQUEST = 'ThreeSixtyAction.VIEW_MENU_REQUEST';

  static VIEW_MENU_REQUEST_FINISHED =
    'ThreeSixtyAction.VIEW_MENU_REQUEST_FINISHED';

  static STYLE_MENU_REQUEST = 'ThreeSixtyAction.STYLE_MENU_REQUEST';

  static STYLE_MENU_REQUEST_FINISHED =
    'ThreeSixtyAction.STYLE_MENU_REQUEST_FINISHED';

  static THREE_SIXTY_DATA_REQUEST = 'ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST';

  static THREE_SIXTY_DATA_REQUEST_FINISHED =
    'ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST_FINISHED';

  static getScenes(
    builderId = '',
    projectId = '',
    layoutName = '',
    level = '1',
    style = 'default',
    mode = 'day'
  ) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.VIEW_MENU_REQUEST,
        ThreeSixtyEffect.getScenes,
        language,
        builderId,
        projectId,
        layoutName,
        level,
        style,
        mode
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getStyles(
    builderId = '',
    projectId = '',
    layoutName = '',
    level = '1',
    room = 'default',
    mode = 'day'
  ) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.STYLE_MENU_REQUEST,
        ThreeSixtyEffect.getStyles,
        language,
        builderId,
        projectId,
        layoutName,
        level,
        room,
        mode
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getRoomUseWithFinishes(
    builderId = '',
    propertyId = '',
    layoutName = '',
    level = '1',
    style = 'default',
    room = 'default',
    uses = [],
    mode = 'day',
    finish = 'default'
  ) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        ThreeSixtyAction.THREE_SIXTY_DATA_REQUEST,
        ThreeSixtyEffect.getRoomUseWithFinishes,
        language,
        builderId,
        propertyId,
        layoutName,
        level,
        style,
        room,
        uses,
        mode,
        finish
      );

      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  // add updateScene static function
}
