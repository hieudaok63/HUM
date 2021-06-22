import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import ActionUtility from '../../../utilities/ActionUtility';
import TourEffect from '../effects';

export default class TourAction {
  static TOUR_DATA_REQUEST = 'TourAction.TOUR_DATA_REQUEST';

  static TOUR_DATA_REQUEST_FINISHED = 'TourAction.TOUR_DATA_REQUEST_FINISHED';

  static TOUR_SELECTED_FLOORPLAN_FINISHED =
    'TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED';

  /* */
  static getMockData() {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        TourAction.TOUR_DATA_REQUEST,
        TourEffect.getMockData,
        language
      );
      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static selectFloorplan(option) {
    return ActionUtility.createAction(
      TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED,
      option
    );
  }
}
