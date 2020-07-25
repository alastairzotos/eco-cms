import { combineEpics } from 'redux-observable';

import { addPageEpic } from './addPage';
import { deletePageEpic } from './deletePage';
import { getPagesEpic } from './getPages';
import { savePageEpic } from './savePage';

export const pagesEditorEpic = combineEpics(
    addPageEpic,
    getPagesEpic,
    savePageEpic,
    deletePageEpic
);
