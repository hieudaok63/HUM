import { createSelector } from 'reselect';
import { rotationMessage } from '../../config/customization';

export const showSelector = createSelector(() => window.innerWidth < 568);

export const messageSelector = createSelector(() => rotationMessage);
