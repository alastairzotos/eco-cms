import { combineReducers } from 'redux';

import { filesReducer, IFilesState } from './filesReducer';
import { IAdminPagesState, pagesReducer } from './pagesReducer';
import { IAdminThemeState, themeReducer } from './themeReducer';

export interface IAdminState {
    theme: IAdminThemeState;
    pages: IAdminPagesState;
    files: IFilesState;
}

export default combineReducers({
    theme: themeReducer,
    pages: pagesReducer,
    files: filesReducer
});
