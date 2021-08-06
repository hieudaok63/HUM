import { createSelector } from 'reselect';

export class LogoSelector {
  static getBuilderLogo(state) {
    return state.tour.logo.reduceLogo;
  }
}

export const builderLogoSelector = createSelector(
  [LogoSelector.getBuilderLogo],
  (builderLogo) => builderLogo
);
