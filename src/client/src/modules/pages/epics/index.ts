import { combineEpics } from 'redux-observable';

import { getPageEpic } from './getPage';

export default combineEpics(
    getPageEpic
);
