import { IFilesAndFolders } from '@common*';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminFilesActionTypes } from '../actions';

export interface IFilesState {
    uploadStatus: ICallStatus | null;
    getFilesFoldersStatus: ICallStatus | null;
    filesAndFolders: IFilesAndFolders;
    currentPath: string;
}

const INITIAL_STATE: IFilesState = {
    uploadStatus: null,
    getFilesFoldersStatus: null,
    filesAndFolders: {
        files: [],
        folders: []
    },
    currentPath: '/'
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

    [IAdminFilesActionTypes.BeginGetFilesAndFolders]: state => ({
        ...state,
        getFilesFoldersStatus: 'fetching'
    }),
    [IAdminFilesActionTypes.SetFilesAndFolders]: (state, action: PayloadAction<IFilesAndFolders>) => ({
        ...state,
        getFilesFoldersStatus: 'success',
        filesAndFolders: action.payload
    }),
    [IAdminFilesActionTypes.SetGetFilesAndFoldersError]: state => ({
        ...state,
        getFilesFoldersStatus: 'error'
    }),

    [IAdminFilesActionTypes.SetCurrentPath]: (state, action: PayloadAction<string>) => ({
        ...state,
        currentPath: action.payload
    })
});
