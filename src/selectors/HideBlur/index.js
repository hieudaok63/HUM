import { createSelector } from 'reselect';
import { isPreview } from '../../utils';

export class HideBlurSelector {
  static getBlur(state) {
    return (
      state.threeSixty.selectedMenuOption === 'mini-map' ||
      state.loading.loading === true
    );
  }

  static getHide(state) {
    return isPreview() || state.loading.loading || state.error.message !== '';
  }
}

export const blurSelector = createSelector(
  [HideBlurSelector.getBlur],
  (blur) => blur
);

export const hideSelector = createSelector(
  [HideBlurSelector.getHide],
  (hide) => hide
);
