import { createAction } from '~/core';

export enum IAdminFilesActionTypes {
    BeginUploadFiles = 'admin/files/BEGIN_UPLOAD_FILES',
    SetFilesUploaded = 'admin/files/SET_FILES_UPLOADED',
    SetFilesUploadError = 'admin/files/SET_FILES_UPLOAD_ERROR'
}

export const beginUploadFiles = (files: File[]) =>
    createAction(IAdminFilesActionTypes.BeginUploadFiles, files);

export const setFilesUploaded = () =>
    createAction(IAdminFilesActionTypes.SetFilesUploaded);

export const setFilesUploadError = () =>
    createAction(IAdminFilesActionTypes.SetFilesUploadError);
