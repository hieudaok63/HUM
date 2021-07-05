import { createSelector } from 'reselect';

export class LoaderSelector {
  static LoaderSelector(state) {
    return state.loading.loader;
  }
}

export const loadingSelector = createSelector(
  [LoaderSelector.LoaderSelector],
  (loading) => loading
);
