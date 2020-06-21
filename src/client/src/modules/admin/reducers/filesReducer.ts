import { createReducer } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminFilesActionTypes } from '../actions';

export interface IFilesState {
    uploadStatus: ICallStatus | null;
}

const INITIAL_STATE: IFilesState = {
    uploadStatus: null
};

export const filesReducer = createReducer<IFilesState>(INITIAL_STATE, {
    [IAdminFilesActionTypes.BeginUploadFiles]: state => ({
        ...state,
        uploadStatus: 'fetching'
    }),
    [IAdminFilesActionTypes.SetFilesUploaded]: state => ({
        ...state,
        uploadStatus: 'success'
    }),
    [IAdminFilesActionTypes.SetFilesUploadError]: state => ({
        ...state,
        uploadStatus: 'error'
    }),
});
