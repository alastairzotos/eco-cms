import { createReducer } from '@reduxjs/toolkit';
import { IAdminTheme } from '~/atomic/organisms/AdminLayout';

import { IThemeActionTypes } from '../actions';

export interface IThemeState {
    theme: IAdminTheme;
}

const INITIAL_STATE: IThemeState = {
    theme: 'light'
};

export const themeReducer = createReducer<IThemeState>(INITIAL_STATE, {
    [IThemeActionTypes.ToggleTheme]: state => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
    })
});
