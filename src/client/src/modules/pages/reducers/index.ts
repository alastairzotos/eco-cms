import { IPage } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from 'lodash';
import { ICallStatus } from '~/core';

import { IPagesActions } from '../actions';

export interface IPagesState {
    page: IPage | null;
    getPageStatus: ICallStatus | null;
    error: number | null;
}

const INITIAL_STATE: IPagesState = {
    page: null,
    getPageStatus: null,
    error: null
};

const pagesReducer = createReducer<IPagesState>(INITIAL_STATE, {
    [IPagesActions.BeginGetPage]: state => ({
        ...state,
        getPageStatus: 'fetching',
        error: null,
        page: null
    }),
    [IPagesActions.SetPage]: (state, action: PayloadAction<IPage>) => ({
        ...state,
        getPageStatus: 'success',
        page: action.payload
    }),
    [IPagesActions.SetGetPageError]: (state, action: PayloadAction<number>) => ({
        ...state,
        getPageStatus: 'error',
        error: action.payload
    })
});

export default pagesReducer;
