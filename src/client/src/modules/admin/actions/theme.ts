import { createAction } from '~/core';

export enum IAdminThemeActionType {
    ToggleTheme = 'admin/theme/TOGGLE_THEME'
}

export const toggleTheme = () =>
    createAction(IAdminThemeActionType.ToggleTheme);
