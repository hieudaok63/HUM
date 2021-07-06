import ActionUtility from '../../../utilities/ActionUtility';
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

  /* */
  static createPanorama() {
    return async (dispatch, getState) => {
      const { amenities } = getState();
      const { image, container } = amenities;
      if (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const model = await ActionUtility.createThunkEffect(
        dispatch,
        AmenitiesActions.CREATE_PANORAMA,
        AmenitiesEffect.createPanorama,
        container,
        image
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

  static reset() {
    return ActionUtility.createAction(
      AmenitiesActions.RESET_AMENITIES_FINISHED
    );
  }
}
