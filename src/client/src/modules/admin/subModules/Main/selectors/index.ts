import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.admin.main;

export const getTheme = createSelector(
    getState,
    state => state.theme
);
