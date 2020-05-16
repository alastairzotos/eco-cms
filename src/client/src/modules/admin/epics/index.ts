import { combineEpics } from 'redux-observable';

import { pagesEpic } from './pages';

export default combineEpics(
    pagesEpic
);
