import { combineEpics } from 'redux-observable';

import { filesEpic } from './files';
import { pagesEpic } from './pages';

export default combineEpics(
    pagesEpic,
    filesEpic
);
