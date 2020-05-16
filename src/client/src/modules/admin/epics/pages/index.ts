import { combineEpics } from 'redux-observable';

import { addPageEpic } from './addPage';
import { getPagesEpic } from './getPages';

export const pagesEpic = combineEpics(
    addPageEpic,
    getPagesEpic
);
