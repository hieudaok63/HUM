import ActionUtility from '../../../utilities/ActionUtility';

export default class MenuAction {
  static SET_SELECTED_MENU_ITEM = 'SET_SELECTED_MENU_ITEM';

  static SET_SELECTED_PROPERTY_MENU_ITEM = 'SET_SELECTED_PROPERTY_MENU_ITEM';

  static STORE_INTERACTIVE_MAP_SECTION_SUCCESSFUL =
    'STORE_INTERACTIVE_MAP_SECTION_SUCCESSFUL';

  static setSelectedMenuItem(selectedMenuItem) {
    return ActionUtility.createAction(MenuAction.SET_SELECTED_MENU_ITEM, {
      selectedMenuItem
    });
  }

  static setSelectedPropertyMenuItem(selectedPropertyMenuItem) {
    return ActionUtility.createAction(
      MenuAction.SET_SELECTED_PROPERTY_MENU_ITEM,
      {
        selectedPropertyMenuItem
      }
    );
  }

  static storeInteractiveMapLocation(interactiveMapLocation) {
    return ActionUtility.createAction(
      MenuAction.STORE_INTERACTIVE_MAP_SECTION_SUCCESSFUL,
      {
        interactiveMapLocation
      }
    );
  }
}
