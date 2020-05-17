import { createReducer } from '@reduxjs/toolkit';
import { IAdminTheme } from '~/atomic/organisms/AdminLayout';
import { getTheme } from '~/core';

import { IAdminThemeActionType } from '../actions';

export interface IAdminThemeState {
    theme: IAdminTheme;
}

const INITIAL_STATE: IAdminThemeState = {
    theme: getTheme()
};

export const themeReducer = createReducer<IAdminThemeState>(INITIAL_STATE, {
    [IAdminThemeActionType.ToggleTheme]: state => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
    })
});
