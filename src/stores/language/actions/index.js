import ActionUtility from '../../../utilities/ActionUtility';

export default class LanguageAction {
  static SET_LANGUAGE = 'LanguageAction.SET_LANGUAGE';

  static setLanguage(language) {
    return ActionUtility.createAction(LanguageAction.SET_LANGUAGE, language);
  }
}
