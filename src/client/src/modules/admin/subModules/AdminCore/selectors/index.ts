import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.admin.core;

export const getTheme = createSelector(
    getState,
    state => state.theme
);
