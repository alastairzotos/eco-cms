import { IPage2 } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Dictionary } from 'lodash';
import { ICallStatus } from '~/core';

import { IPages2Actions } from '../actions';

export interface IPages2State {
    page: IPage2 | null;
    getPageStatus: ICallStatus | null;
    error: number | null;
}

const INITIAL_STATE: IPages2State = {
    page: null,
    getPageStatus: null,
    error: null
};

const pagesReducer = createReducer<IPages2State>(INITIAL_STATE, {
    [IPages2Actions.BeginGetPage]: state => ({
        ...state,
        getPageStatus: 'fetching',
        error: null,
        page: null
    }),
    [IPages2Actions.SetPage]: (state, action: PayloadAction<IPage2>) => ({
        ...state,
        getPageStatus: 'success',
        page: action.payload
    }),
    [IPages2Actions.SetGetPageError]: (state, action: PayloadAction<number>) => ({
        ...state,
        getPageStatus: 'error',
        error: action.payload
    })
});

export default pagesReducer;
