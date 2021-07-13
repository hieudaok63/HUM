import ActionUtility from '../../../utilities/ActionUtility';
import LanguageEffect from '../effects';

export default class LanguageAction {
  static SET_LANGUAGE = 'LanguageAction.SET_LANGUAGE';
  static SET_LANGUAGE_FINISHED = 'LanguageAction.SET_LANGUAGE_FINISHED';

  static setLanguage(language) {
    return ActionUtility.createAction(
      LanguageAction.SET_LANGUAGE_FINISHED,
      language
    );
  }

  /* */
  static setLanguageFromTour() {
    return async (dispatch, getState) => {
      const { tour } = getState();
      const { defaultLanguage } = tour;
      const model = await ActionUtility.createThunkEffect(
        dispatch,
        LanguageAction.SET_LANGUAGE,
        LanguageEffect.setLanguage,
        defaultLanguage
      );

      return { model };
    };
  }
}
