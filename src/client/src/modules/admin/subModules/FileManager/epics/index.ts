import { combineEpics } from 'redux-observable';

import { getFilesAndFoldersEpic } from './getFilesAndFolders';
import { uploadFilesEpic } from './uploadFiles';

export const filesEpic = combineEpics(
    uploadFilesEpic,
    getFilesAndFoldersEpic
);
