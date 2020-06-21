import { combineEpics } from 'redux-observable';

import { uploadFilesEpic } from './uploadFiles';

export const filesEpic = combineEpics(
    uploadFilesEpic
);
