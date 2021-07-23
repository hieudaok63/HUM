import { createSelector } from 'reselect';

export class LanguageSelector {
  static getLanguage(state) {
    return state.language.language;
  }
}

export const languageSelector = createSelector(
  [LanguageSelector.getLanguage],
  (language) => language
);
