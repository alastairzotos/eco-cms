import { combineReducers } from 'redux';

import { IAdminPagesState, pagesReducer } from './pagesReducer';
import { IAdminThemeState, themeReducer } from './themeReducer';

export interface IAdminState {
    theme: IAdminThemeState;
    pages: IAdminPagesState;
}

export default combineReducers({
    theme: themeReducer,
    pages: pagesReducer
});
