import { createSelector } from 'reselect';

export class LogoSelector {
  static getBuilderLogo(state) {
    return state.tour.logo.reduceLogo;
  }
  static getLogo(state) {
    return state.tour.logo;
  }
}

export const builderLogoSelector = createSelector(
  [LogoSelector.getBuilderLogo],
  (builderLogo) => builderLogo
);

export const logoSelector = createSelector(
  [LogoSelector.getLogo],
  (logo) => logo
);
