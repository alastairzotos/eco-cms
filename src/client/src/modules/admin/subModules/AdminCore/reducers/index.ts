import { createReducer } from '@reduxjs/toolkit';
import { IAdminTheme } from '~/atomic/organisms/AdminLayout';

import { IAdminCoreActionType } from '../actions';

export interface IAdminCoreState {
    theme: IAdminTheme;
}

const INITIAL_STATE: IAdminCoreState = {
    theme: 'light'
};

export const coreReducer = createReducer<IAdminCoreState>(INITIAL_STATE, {
    [IAdminCoreActionType.ToggleTheme]: state => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
    })
});
