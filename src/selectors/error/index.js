import { createSelector } from 'reselect';

export class LoaderSelector {
  static errorSelector(state) {
    return state.error.message;
  }
}

export const errorSelector = createSelector(
  [LoaderSelector.errorSelector],
  (error) => error
);
