import { IPage } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminPagesActionType } from '../actions';
import { IPageInfo } from '../models';

export interface IAdminPagesState {
    addPageStatus: ICallStatus | null;
    getPagesStatus: ICallStatus | null;
    savePageStatus: ICallStatus | null;
    pages: IPage[];
    selectedPageId: string | null;
    currentError: string | null;
    selectedVersion: number;
}

const INITIAL_STATE: IAdminPagesState = {
    addPageStatus: null,
    getPagesStatus: null,
    savePageStatus: null,
    pages: [],
    selectedPageId: null,
    currentError: null,
    selectedVersion: 0
};

const updatePages = (pages: IPageInfo[], page: IPageInfo): IPageInfo[] => {
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

export const pagesReducer = createReducer<IAdminPagesState>(INITIAL_STATE, {
    [IAdminPagesActionType.BeginAddPage]: state => ({
        ...state,
        addPageStatus: 'fetching'
    }),
    [IAdminPagesActionType.AddPage]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        addPageStatus: 'success',
        pages: [...state.pages, action.payload]
    }),
    [IAdminPagesActionType.SetAddPageError]: state => ({
        ...state,
        addPageStatus: 'error'
    }),

    [IAdminPagesActionType.BeginGetPages]: state => ({
        ...state,
        getPagesStatus: 'fetching'
    }),
    [IAdminPagesActionType.SetPages]: (state, action: PayloadAction<IPage[]>) => ({
        ...state,
        getPagesStatus: 'success',
        pages: action.payload
    }),
    [IAdminPagesActionType.SetGetPagesError]: state => ({
        ...state,
        getPagesStatus: 'error'
    }),

    [IAdminPagesActionType.SelectCurrentPage]: (state, action: PayloadAction<string>) => ({
        ...state,
        selectedPageId: action.payload
    }),
    [IAdminPagesActionType.SetPageData]: (state, action: PayloadAction<IPageInfo>) => ({
        ...state,
        pages: updatePages(state.pages, action.payload)
    }),

    [IAdminPagesActionType.BeginSavePage]: state => ({
        ...state,
        savePageStatus: 'fetching'
    }),

    [IAdminPagesActionType.SetPageSaved]: (state, action: PayloadAction<IPageInfo>) => ({
        ...state,
        savePageStatus: 'success',
        pages: updatePages(state.pages, action.payload)
    }),

    [IAdminPagesActionType.SetSavePageError]: (state, action: PayloadAction<string>) => ({
        ...state,
        savePageStatus: 'error',
        currentError: action.payload
    }),

    [IAdminPagesActionType.SetPageVersion]: (state, action: PayloadAction<number>) => ({
        ...state,
        selectedVersion: action.payload
    }),

    [IAdminPagesActionType.AddPageVersion]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        pages: updatePages(state.pages, {
            ...action.payload,
            staging: [
                ...action.payload.staging,
                action.payload.staging[action.payload.staging.length - 1]
            ]
        }),
        selectedVersion: action.payload.staging.length
    }),

    [IAdminPagesActionType.DeletePageVersion]: (state, action: PayloadAction<{ page: IPage, version: number }>) => ({
        ...state,
        pages: updatePages(state.pages, {
            ...action.payload.page,
            staging: action.payload.page.staging.filter(
                (_, index) => index !== action.payload.version
            )
        }),
        selectedVersion: state.selectedVersion - 1
    })
});
