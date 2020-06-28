import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

import { IAdminFilesState } from '../reducers';

const getState = (state: IState): IAdminFilesState => state.admin.files;

export const getUploadStatus = createSelector(
    getState,
    state => state.uploadStatus
);

export const getCurrentPath = createSelector(
    getState,
    state => state.currentPath
);

export const getFilesAndFoldersFetchStatus = createSelector(
    getState,
    state => state.getFilesFoldersStatus
);

export const getFilesAndFolders = createSelector(
    getState,
    state => state.filesAndFolders
);

export const getFilesViewStyle = createSelector(
    getState,
    state => state.filesViewStyle
);

export const getPreviewFileId = createSelector(
    getState,
    state => state.previewId
);

export const getPreviewFile = createSelector(
    getState,
    state => state.filesAndFolders.files.find(file => file._id === state.previewId)
);

export const getFileUpdateStatus = createSelector(
    getState,
    state => state.fileUpdateStatus
);
