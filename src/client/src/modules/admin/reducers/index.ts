import { combineReducers } from 'redux';

import { IThemeState, themeReducer } from './themeReducer';

export interface IAdminState {
    theme: IThemeState;
}

export default combineReducers({
    theme: themeReducer
});
