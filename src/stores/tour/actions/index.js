import HttpErrorResponseModel from '../../../models/HttpErrorResponseModel';
import ActionUtility from '../../../utilities/ActionUtility';
import TourEffect from '../effects';

export default class TourAction {
  static TOUR_DATA_REQUEST = 'TourAction.TOUR_DATA_REQUEST';

  static TOUR_DATA_REQUEST_FINISHED = 'TourAction.TOUR_DATA_REQUEST_FINISHED';

  static TOUR_SELECTED_FLOORPLAN_FINISHED =
    'TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED';

  static TOUR_SELECTED_TYPE_FINISHED = 'TOUR_SELECTED_TYPE_FINISHED';

  static TOUR_IMAGE_GALLEY_FINISHED = 'TOUR_IMAGE_GALLEY_FINISHED';

  static TOUR_VIDEO_GALLERY_FINISHED = 'TOUR_VIDEO_GALLERY_FINISHED';

  static TOUR_GALLEY_IMAGES_FINISHED = 'TOUR_GALLEY_IMAGES_FINISHED';

  static TOUR_GALLEY_VIDEOS_FINISHED = 'TOUR_GALLEY_VIDEOS_FINISHED';

  /* */
  static getData(builder, project) {
    return async (dispatch, getState) => {
      const { language: stateLanguage } = getState();
      const { language } = stateLanguage;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        TourAction.TOUR_DATA_REQUEST,
        TourEffect.getData,
        language,
        builder,
        project
      );
      const isError = model instanceof HttpErrorResponseModel;
      return { model, isError };
    };
  }

  static getFloorplanIndex(name) {
    return async (dispatch, getState) => {
      const { tour } = getState();
      const { floorplans } = tour;

      if (floorplans.length === 0) return null;

      const floorplanIndex = floorplans.findIndex(
        (item) => item.layoutName?.toLowerCase() === name?.toLowerCase()
      );

      return floorplanIndex;
    };
  }

  static selectFloorplan(option) {
    return ActionUtility.createAction(
      TourAction.TOUR_SELECTED_FLOORPLAN_FINISHED,
      option
    );
  }

  static selectType(option) {
    return ActionUtility.createAction(
      TourAction.TOUR_SELECTED_TYPE_FINISHED,
      option
    );
  }

  static setImageGallery(option) {
    return ActionUtility.createAction(
      TourAction.TOUR_IMAGE_GALLEY_FINISHED,
      option
    );
  }

  static setVideoGallery(option) {
    return ActionUtility.createAction(
      TourAction.TOUR_VIDEO_GALLERY_FINISHED,
      option
    );
  }

  static setGalleryImages(gallery) {
    return ActionUtility.createAction(
      TourAction.TOUR_GALLEY_IMAGES_FINISHED,
      gallery
    );
  }

  static setGalleryVideos(gallery) {
    return ActionUtility.createAction(
      TourAction.TOUR_GALLEY_VIDEOS_FINISHED,
      gallery
    );
  }
}
