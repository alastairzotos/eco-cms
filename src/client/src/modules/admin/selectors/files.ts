import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

import { IFilesState } from '../reducers/filesReducer';

const getState = (state: IState): IFilesState => state.admin.files;

export const getUploadStatus = createSelector(
    getState,
    state => state.uploadStatus
);
