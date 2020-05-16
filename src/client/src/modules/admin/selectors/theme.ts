import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.admin.theme;

export const getTheme = createSelector(
    getState,
    state => state.theme
);
