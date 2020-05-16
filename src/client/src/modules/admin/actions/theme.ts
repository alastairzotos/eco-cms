import { createAction } from '~/core';

export enum IThemeActionTypes {
    ToggleTheme = 'admin/theme/TOGGLE_THEME'
}

export const toggleTheme = () =>
    createAction(IThemeActionTypes.ToggleTheme);
