import { createReducer } from '@reduxjs/toolkit';
import { IAdminTheme } from '~/atomic/organisms/AdminLayout';

import { IAdminThemeActionType } from '../actions';

export interface IAdminThemeState {
    theme: IAdminTheme;
}

const INITIAL_STATE: IAdminThemeState = {
    theme: 'light'
};

export const themeReducer = createReducer<IAdminThemeState>(INITIAL_STATE, {
    [IAdminThemeActionType.ToggleTheme]: state => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
    })
});
