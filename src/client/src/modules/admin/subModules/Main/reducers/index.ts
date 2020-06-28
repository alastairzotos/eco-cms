import { createReducer } from '@reduxjs/toolkit';
import { IAdminTheme } from '~/atomic/organisms/AdminLayout';

import { IAdminThemeActionType } from '../actions';

export interface IAdminMainState {
    theme: IAdminTheme;
}

const INITIAL_STATE: IAdminMainState = {
    theme: 'light'
};

export const themeReducer = createReducer<IAdminMainState>(INITIAL_STATE, {
    [IAdminThemeActionType.ToggleTheme]: state => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
    })
});
