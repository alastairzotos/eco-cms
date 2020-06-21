import { createAction } from '~/core';

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
