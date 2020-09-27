import { createSelector } from 'reselect';

export class ViewStyleSelector {
  static getDisplayName(state) {
    return state.threeSixty.displayName;
  }

  static getSelectedStyleName(state) {
    return state.threeSixty.selectedStyleName;
  }
}

export const displayNameSelector = createSelector(
  [ViewStyleSelector.getDisplayName],
  (displayName) => displayName
);

export const styleNameSelector = createSelector(
  [ViewStyleSelector.getSelectedStyleName],
  (selectedStyleName) => selectedStyleName
);
