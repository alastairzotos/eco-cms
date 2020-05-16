import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.admin.pages;

export const getAddPageStatus = createSelector(
    getState,
    state => state.addPageStatus
);

export const getGetPagesStatus = createSelector(
    getState,
    state => state.getPagesStatus
);

export const getPages = createSelector(
    getState,
    state => state.pages
);
