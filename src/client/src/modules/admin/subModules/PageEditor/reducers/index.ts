import { IPage } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminPagesActionType } from '../actions';
import { IPageInfo } from '../models';

export interface IAdminPagesState {
    addPageStatus: ICallStatus | null;
    getPagesStatus: ICallStatus | null;
    savePageStatus: ICallStatus | null;
    deletePageStatus: ICallStatus | null;
    pages: IPage[];
    selectedPageId: string | null;
    currentError: string | null;
    selectedVariation: number;
    dirty: boolean;
}

const INITIAL_STATE: IAdminPagesState = {
    addPageStatus: null,
    getPagesStatus: null,
    savePageStatus: null,
    deletePageStatus: null,
    pages: [],
    selectedPageId: null,
    currentError: null,
    selectedVariation: 0,
    dirty: false
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
        pages: updatePages(state.pages, action.payload),
        dirty: true
    }),

    [IAdminPagesActionType.BeginSavePage]: state => ({
        ...state,
        savePageStatus: 'fetching'
    }),

    [IAdminPagesActionType.SetPageSaved]: (state, action: PayloadAction<IPageInfo>) => ({
        ...state,
        savePageStatus: 'success',
        pages: updatePages(state.pages, action.payload),
        dirty: false
    }),

    [IAdminPagesActionType.SetSavePageError]: (state, action: PayloadAction<string>) => ({
        ...state,
        savePageStatus: 'error',
        currentError: action.payload
    }),

    [IAdminPagesActionType.SetPageVariation]: (state, action: PayloadAction<number>) => ({
        ...state,
        selectedVariation: action.payload
    }),

    [IAdminPagesActionType.AddPageVariation]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        pages: updatePages(state.pages, {
            ...action.payload,
            staging: [
                ...action.payload.staging,
                action.payload.staging[state.selectedVariation]
            ]
        }),
        selectedVariation: action.payload.staging.length,
        dirty: true
    }),

    [IAdminPagesActionType.DeletePageVariation]: (
        state,
        action: PayloadAction<{ page: IPage, variation: number }>
    ) => ({
        ...state,
        pages: updatePages(state.pages, {
            ...action.payload.page,
            staging: action.payload.page.staging.filter(
                (_, index) => index !== action.payload.variation
            )
        }),
        selectedVariation: state.selectedVariation - 1,
        dirty: true
    }),

    [IAdminPagesActionType.BeginDeletePage]: state => ({
        ...state,
        deletePageStatus: 'fetching'
    }),
    [IAdminPagesActionType.SetPageDeleted]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        deletePageStatus: 'success',
        pages: state.pages.filter(page => page._id !== action.payload._id),
        selectedPageId: null,
        selectedVariation: 0
    }),
    [IAdminPagesActionType.SetDeletePageError]: state => ({
        ...state,
        deletePageStatus: 'error'
    })
});
