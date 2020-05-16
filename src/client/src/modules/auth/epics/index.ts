import { combineEpics } from 'redux-observable';

import { loginEpic } from './loginEpic';
import { logoutEpic } from './logoutEpic';
import { registerEpic } from './registerEpic';

export default combineEpics(
    loginEpic,
    logoutEpic,
    registerEpic
);
