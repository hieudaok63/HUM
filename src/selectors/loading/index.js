import { createSelector } from 'reselect';

export class LoaderSelector {
  static LoaderSelector(state) {
    return state.loading.loading;
  }
}

export const loadingSelector = createSelector(
  [LoaderSelector.LoaderSelector],
  (loading) => loading
);
