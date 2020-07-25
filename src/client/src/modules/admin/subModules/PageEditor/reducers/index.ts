import { IPage } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminPageEditorActionType } from '../actions';

export interface IAdminPageEditorState {
    addPageStatus: ICallStatus | null;
    getPagesStatus: ICallStatus | null;
    savePageStatus: ICallStatus | null;
    deletePageStatus: ICallStatus | null;
    pages: IPage[];
    selectedPageId: string | null;
    dirty: boolean;
}

const INITIAL_STATE: IAdminPageEditorState = {
    addPageStatus: null,
    getPagesStatus: null,
    savePageStatus: null,
    deletePageStatus: null,
    pages: [],
    selectedPageId: null,
    dirty: false,
};

const updatePages = (pages: IPage[], page: IPage): IPage[] => {
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

export const pageEditorReducer = createReducer<IAdminPageEditorState>(INITIAL_STATE, {
    [IAdminPageEditorActionType.BeginAddPage]: state => ({
        ...state,
        addPageStatus: 'fetching'
    }),
    [IAdminPageEditorActionType.AddPage]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        addPageStatus: 'success',
        pages: [...state.pages, action.payload]
    }),
    [IAdminPageEditorActionType.SetAddPageError]: state => ({
        ...state,
        addPageStatus: 'error'
    }),

    [IAdminPageEditorActionType.BeginGetPages]: state => ({
        ...state,
        getPagesStatus: 'fetching'
    }),
    [IAdminPageEditorActionType.SetPages]: (state, action: PayloadAction<IPage[]>) => ({
        ...state,
        getPagesStatus: 'success',
        pages: action.payload
    }),
    [IAdminPageEditorActionType.SetGetPagesError]: state => ({
        ...state,
        getPagesStatus: 'error'
    }),

    [IAdminPageEditorActionType.SelectCurrentPage]: (state, action: PayloadAction<string>) => ({
        ...state,
        selectedPageId: action.payload
    }),
    [IAdminPageEditorActionType.SetPageData]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        pages: updatePages(state.pages, action.payload),
        dirty: true
    }),

    [IAdminPageEditorActionType.BeginSavePage]: state => ({
        ...state,
        savePageStatus: 'fetching'
    }),

    [IAdminPageEditorActionType.SetPageSaved]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        savePageStatus: 'success',
        pages: updatePages(state.pages, action.payload),
        dirty: false
    }),

    [IAdminPageEditorActionType.SetSavePageError]: (state, action: PayloadAction<string>) => ({
        ...state,
        savePageStatus: 'error',
        currentError: action.payload
    }),

    [IAdminPageEditorActionType.BeginDeletePage]: state => ({
        ...state,
        deletePageStatus: 'fetching'
    }),
    [IAdminPageEditorActionType.SetPageDeleted]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        deletePageStatus: 'success',
        pages: state.pages.filter(page => page._id !== action.payload._id),
        selectedPageId: null,
        selectedVariation: 0
    }),
    [IAdminPageEditorActionType.SetDeletePageError]: state => ({
        ...state,
        deletePageStatus: 'error'
    })
});
