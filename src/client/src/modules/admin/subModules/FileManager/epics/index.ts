import { combineEpics } from 'redux-observable';

import { getFilesAndFoldersEpic } from './getFilesAndFolders';
import { updateFilenameEpic } from './updateFilename';
import { uploadFilesEpic } from './uploadFiles';

export const filesEpic = combineEpics(
    uploadFilesEpic,
    getFilesAndFoldersEpic,
    updateFilenameEpic
);
