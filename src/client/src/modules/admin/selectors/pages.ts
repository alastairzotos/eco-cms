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

export const getSelectedPageId = createSelector(
    getState,
    state => state.selectedPageId
);

export const getSelectedPage = createSelector(
    getState,
    state => state.pages && state.pages.find(page => page._id === state.selectedPageId)
);

export const getSavePageStatus = createSelector(
    getState,
    state => state.savePageStatus
);

export const getSelectedVersion = createSelector(
    getState,
    state => state.selectedVersion
);
