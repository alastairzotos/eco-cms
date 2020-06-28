import { createAction } from '~/core';

export enum IAdminCoreActionType {
    ToggleTheme = 'admin/core/TOGGLE_THEME'
}

export const toggleTheme = () =>
    createAction(IAdminCoreActionType.ToggleTheme);
