import { IAdminTheme } from '~/atomic/organisms/AdminLayout';

import { localStorageNames } from './localStorage';

export const setTheme = (theme: IAdminTheme) =>
    localStorage.setItem(localStorageNames.editor.theme, theme);

export const getTheme = (): IAdminTheme =>
    localStorage.getItem(localStorageNames.editor.theme) as IAdminTheme || 'light';
