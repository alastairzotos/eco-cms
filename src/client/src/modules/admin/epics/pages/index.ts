import { combineEpics } from 'redux-observable';

import { addPageEpic } from './addPage';
import { getPagesEpic } from './getPages';
import { savePageEpic } from './savePage';

export const pagesEpic = combineEpics(
    addPageEpic,
    getPagesEpic,
    savePageEpic
);
