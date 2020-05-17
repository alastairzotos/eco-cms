import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.pages;

export const getPageFetchStatus = createSelector(
    getState,
    state => state.getPageStatus
);

export const getPage = createSelector(
    getState,
    state => state.page
);

export const getPageError = createSelector(
    getState,
    state => state.error
);
