import { createSelector } from 'reselect';

export class LogoSelector {
  static getBuilderLogo(state) {
    return state.threeSixty.builderLogo;
  }
}

export const builderLogoSelector = createSelector(
  [LogoSelector.getBuilderLogo],
  (builderLogo) => builderLogo
);
