import ActionUtility from '../../../utilities/ActionUtility';
import TourAction from '../../tour/actions';
import AmenitiesEffect from '../effects';

export default class AmenitiesActions {
  static SET_2D_IMAGE_FINISHED = 'SET_2D_IMAGE_FINISHED';

  static SET_PANO_FINISHED = 'SET_PANO_FINISHED';

  static RESET_AMENITIES_FINISHED = 'RESET_AMENITIES_FINISHED';

  static SET_PANO_CONTAINER_FINISHED = 'SET_PANO_CONTAINER_FINISHED';

  static CREATE_PANORAMA = 'CREATE_PANORAMA';

  static CREATE_PANORAMA_FINISHED = 'CREATE_PANORAMA_FINISHED';

  static SET_SELECTED_AMENITY_FINISHED = 'SET_SELECTED_AMENITY_FINISHED';

  static SET_AMENITY_FINISHED = 'SET_AMENITY_FINISHED';

  static SET_PANO_SPOTS_FINISHED = 'SET_PANO_SPOTS_FINISHED';

  static CHANGE_LANGUAGE_REQUEST_FINISHED = 'CHANGE_LANGUAGE_REQUEST_FINISHED';

  /* */
  static createPanorama() {
    return async (dispatch, getState) => {
      const { amenities, language: stateLanguage, tour } = getState();
      const { image, container, spots } = amenities;
      const { language } = stateLanguage;
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        AmenitiesActions.CREATE_PANORAMA,
        AmenitiesEffect.createPanorama,
        container,
        image,
        spots,
        language,
        async (type, key) => {
          const amenity = tour[type].content.find((item) => item.key === key);
          if (amenity) {
            await dispatch(TourAction.selectType(amenity.media[0].type));
            await dispatch(AmenitiesActions.setAmenity(amenity.media));
            await dispatch(AmenitiesActions.setSelectedAmenity(key));
          }
        }
      );

      return { model };
    };
  }

  static setSelectedAmenity(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_SELECTED_AMENITY_FINISHED,
      option
    );
  }

  /* */
  static setAmenityImage(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_2D_IMAGE_FINISHED,
      option
    );
  }

  static setPano(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_PANO_FINISHED,
      option
    );
  }

  static setSpots(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_PANO_SPOTS_FINISHED,
      option
    );
  }

  static setAmenity(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_AMENITY_FINISHED,
      option
    );
  }

  static setContainer(option) {
    return ActionUtility.createAction(
      AmenitiesActions.SET_PANO_CONTAINER_FINISHED,
      option
    );
  }

  static setLanguage(option) {
    return ActionUtility.createAction(
      AmenitiesActions.CHANGE_LANGUAGE_REQUEST_FINISHED,
      option
    );
  }

  static reset() {
    return ActionUtility.createAction(
      AmenitiesActions.RESET_AMENITIES_FINISHED
    );
  }
}
