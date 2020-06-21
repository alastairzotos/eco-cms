import { Fab } from '@material-ui/core';
import Icon from '@material-ui/icons/CloudUpload';
import { createReducer, createSelector } from '@reduxjs/toolkit';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { createAction, fetch$, IAction, ICallStatus, IModule } from './core';

interface IFilesState {
    uploadStatus: ICallStatus | null;
}

export enum IAdminFilesActionTypes {
    BeginUploadFile = 'admin/files/BEGIN_UPLOAD_FILE',
    SetFileUploaded = 'admin/files/SET_FILE_UPLOADED',
    SetFileUploadError = 'admin/files/SET_FILE_UPLOAD_ERROR'
}

export const beginUploadFile = (files: FileList) =>
    createAction(IAdminFilesActionTypes.BeginUploadFile, files);

export const setFileUploaded = () =>
    createAction(IAdminFilesActionTypes.SetFileUploaded);

export const setFileUploadeError = () =>
    createAction(IAdminFilesActionTypes.SetFileUploadError);

const getState = (state: any): IFilesState => state.files;

const getUploadStatus = createSelector(
    getState,
    state => state.uploadStatus
);

export const filesModule: IModule = {
    name: 'files',
    reducer: createReducer<IFilesState>({ uploadStatus: null }, {
        [IAdminFilesActionTypes.BeginUploadFile]: state => ({
            ...state,
            uploadStatus: 'fetching'
        }),
        [IAdminFilesActionTypes.SetFileUploaded]: state => ({
            ...state,
            uploadStatus: 'success'
        }),
        [IAdminFilesActionTypes.SetFileUploadError]: state => ({
            ...state,
            uploadStatus: 'error'
        }),
    }),
    epic: action$ => action$.ofType(IAdminFilesActionTypes.BeginUploadFile).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, FileList>) => {
            const formData = new FormData();
            formData.set('enctype', 'multipart/form-data');
            for (let i = 0; i < action.payload.length; i++) {
                formData.append('files', action.payload.item(i));
            }

            return fetch$({
                method: 'POST',
                url: '/upload',
                contentType: 'multipart/form-data',
                body: formData
            }).pipe(
                switchMap(res => {
                    console.log(res);
                    return of(setFileUploaded());
                }),
                catchError(() => of(setFileUploadeError()))
            );
        })
    ),
    adminPages: [
        {
            title: 'Files',
            path: '/files',
            icon: Icon,
            component: () => {
                const dispatch = useDispatch();
                const status = useSelector(getUploadStatus);

                const [files, setFiles] = React.useState(null);

                return (
                    <>
                        {status === 'fetching' && <p>Uploading...</p>}
                        {status === 'success' && <p>Success</p>}
                        {status === 'error' && <p>Error</p>}

                        <input
                            type="file"
                            multiple
                            onChange={e => setFiles(e.target.files)}
                        />
                        <br />

                        <Fab
                            size="small"
                            variant="extended"
                            onClick={() => dispatch(beginUploadFile(files))}
                        >
                            Upload
                        </Fab>
                    </>
                );
            }
        }
    ]
};
