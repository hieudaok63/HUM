import ActionUtility from '../../../utilities/ActionUtility';

export default class LoadingAction {
  static IS_LOADING = 'LoadingAction.IS_LOADING';
  static IS_LOADER = 'IS_LOADER';

  static isLoading(loading) {
    return ActionUtility.createAction(LoadingAction.IS_LOADING, loading);
  }

  static setLoader(loader) {
    return ActionUtility.createAction(LoadingAction.IS_LOADER, loader);
  }
}
