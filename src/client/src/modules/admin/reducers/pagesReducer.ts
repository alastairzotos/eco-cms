import { IPage } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminPagesActionType } from '../actions';

export interface IAdminPagesState {
    addPageStatus: ICallStatus | null;
    getPagesStatus: ICallStatus | null;
    pages: IPage[];
}

const INITIAL_STATE: IAdminPagesState = {
    addPageStatus: null,
    getPagesStatus: null,
    pages: []
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
    })
});
