import { IFile, IFilesAndFolders } from '@common';
import { createAction } from '~/core';

import { IFilesViewStyle } from '../models';

export enum IAdminFilesActionTypes {
    BeginUploadFiles = 'admin/files/BEGIN_UPLOAD_FILES',
    SetFilesUploaded = 'admin/files/SET_FILES_UPLOADED',
    SetFilesUploadError = 'admin/files/SET_FILES_UPLOAD_ERROR',

    BeginGetFilesAndFolders = 'admin/files/BEGIN_GET_FILES_AND_FOLDERS',
    SetFilesAndFolders = 'admin/files/SET_FILES_AND_FOLDERS',
    SetGetFilesAndFoldersError = 'admin/files/SET_GET_FILES_AND_FOLDERS_ERROR',

    SetCurrentPath = 'admin/files/SET_CURRENT_PATH',

    SetFilesViewStyle = 'admin/files/SET_FILES_VIEW_STYLE',

    PreviewFile = 'admin/files/PREVIEW_FILE',

    BeginUpdateFile = 'admin/files/BEGIN_UPDATE_FILE',
    SetFile = 'admin/files/SET_FILE',
    SetUpdateFileError = 'admin/files/SET_UPDATE_FILE_ERROR'
}

export const beginUploadFiles = (files: File[]) =>
    createAction(IAdminFilesActionTypes.BeginUploadFiles, files);

export const setFilesUploaded = () =>
    createAction(IAdminFilesActionTypes.SetFilesUploaded);

export const setFilesUploadError = () =>
    createAction(IAdminFilesActionTypes.SetFilesUploadError);

export const beginGetFilesAndFolders = (path: string) =>
    createAction(IAdminFilesActionTypes.BeginGetFilesAndFolders, path);

export const setFilesAndFolders = (filesAndFolders: IFilesAndFolders) =>
    createAction(IAdminFilesActionTypes.SetFilesAndFolders, filesAndFolders);

export const setGetFilesAndFoldersError = () =>
    createAction(IAdminFilesActionTypes.SetGetFilesAndFoldersError);

export const setCurrentPath = (path: string) =>
    createAction(IAdminFilesActionTypes.SetCurrentPath, path);

export const setFilesViewStyle = (viewStyle: IFilesViewStyle) =>
    createAction(IAdminFilesActionTypes.SetFilesViewStyle, viewStyle);

export const previewFile = (file: IFile) =>
    createAction(IAdminFilesActionTypes.PreviewFile, file);

export const beginUpdateFile = (file: IFile) =>
    createAction(IAdminFilesActionTypes.BeginUpdateFile, file);

export const setFile = (file: IFile) =>
    createAction(IAdminFilesActionTypes.SetFile, file);

export const setUpdateFileError = () =>
    createAction(IAdminFilesActionTypes.SetUpdateFileError);
