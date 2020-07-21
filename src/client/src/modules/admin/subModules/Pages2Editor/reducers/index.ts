import { IPage2 } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminPages2ActionType } from '../actions';

export interface IAdminPages2State {
    addPageStatus: ICallStatus | null;
    getPagesStatus: ICallStatus | null;
    savePageStatus: ICallStatus | null;
    deletePageStatus: ICallStatus | null;
    pages: IPage2[];
    selectedPageId: string | null;
    dirty: boolean;
}

const INITIAL_STATE: IAdminPages2State = {
    addPageStatus: null,
    getPagesStatus: null,
    savePageStatus: null,
    deletePageStatus: null,
    pages: [],
    selectedPageId: null,
    dirty: false,
};

const updatePages = (pages: IPage2[], page: IPage2): IPage2[] => {
    const pageId = pages.findIndex(p => p._id === page._id);

    if (pageId > -1) {
        const newPages = [...pages];
        newPages[pageId] = {
            ...pages[pageId],
            ...page
        };

        return newPages;
    }

    return pages;
};

export const pages2Reducer = createReducer<IAdminPages2State>(INITIAL_STATE, {
    [IAdminPages2ActionType.BeginAddPage]: state => ({
        ...state,
        addPageStatus: 'fetching'
    }),
    [IAdminPages2ActionType.AddPage]: (state, action: PayloadAction<IPage2>) => ({
        ...state,
        addPageStatus: 'success',
        pages: [...state.pages, action.payload]
    }),
    [IAdminPages2ActionType.SetAddPageError]: state => ({
        ...state,
        addPageStatus: 'error'
    }),

    [IAdminPages2ActionType.BeginGetPages]: state => ({
        ...state,
        getPagesStatus: 'fetching'
    }),
    [IAdminPages2ActionType.SetPages]: (state, action: PayloadAction<IPage2[]>) => ({
        ...state,
        getPagesStatus: 'success',
        pages: action.payload
    }),
    [IAdminPages2ActionType.SetGetPagesError]: state => ({
        ...state,
        getPagesStatus: 'error'
    }),

    [IAdminPages2ActionType.SelectCurrentPage]: (state, action: PayloadAction<string>) => ({
        ...state,
        selectedPageId: action.payload
    }),
    [IAdminPages2ActionType.SetPageData]: (state, action: PayloadAction<IPage2>) => ({
        ...state,
        pages: updatePages(state.pages, action.payload),
        dirty: true
    }),

    [IAdminPages2ActionType.BeginSavePage]: state => ({
        ...state,
        savePageStatus: 'fetching'
    }),

    [IAdminPages2ActionType.SetPageSaved]: (state, action: PayloadAction<IPage2>) => ({
        ...state,
        savePageStatus: 'success',
        pages: updatePages(state.pages, action.payload),
        dirty: false
    }),

    [IAdminPages2ActionType.SetSavePageError]: (state, action: PayloadAction<string>) => ({
        ...state,
        savePageStatus: 'error',
        currentError: action.payload
    }),

    [IAdminPages2ActionType.BeginDeletePage]: state => ({
        ...state,
        deletePageStatus: 'fetching'
    }),
    [IAdminPages2ActionType.SetPageDeleted]: (state, action: PayloadAction<IPage2>) => ({
        ...state,
        deletePageStatus: 'success',
        pages: state.pages.filter(page => page._id !== action.payload._id),
        selectedPageId: null,
        selectedVariation: 0
    }),
    [IAdminPages2ActionType.SetDeletePageError]: state => ({
        ...state,
        deletePageStatus: 'error'
    })
});
