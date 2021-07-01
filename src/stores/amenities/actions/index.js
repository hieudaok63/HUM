import ActionUtility from '../../../utilities/ActionUtility';

export default class AmenitiesActions {
  static SET_2D_IMAGE_FINISHED = 'SET_2D_IMAGE_FINISHED';

  static SET_PANO_FINISHED = 'SET_PANO_FINISHED';

  static RESET_AMENITIES_FINISHED = 'RESET_AMENITIES_FINISHED';

  /* */
  static setAmenitieImage(option) {
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

  static reset() {
    return ActionUtility.createAction(
      AmenitiesActions.RESET_AMENITIES_FINISHED
    );
  }
}
