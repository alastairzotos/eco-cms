import { ISiteSettings } from '@common*';
import { createAction } from '~/core';

export enum IAdminSiteSettingsActions {
    BeginLoadSettings = 'admin/sitesettings/BEGIN_GET_SETTINGS',
    SetSiteSettings = 'admin/sitesettings/SET_SITE_SETTINGS',
    SetLoadSiteSettingsError = 'admin/sitesettings/SET_LOAD_SITE_SETTINGS_ERROR',

    BeginUpdateSettings = 'admin/sitesettings/BEGIN_UPDATE_SETTINGS',
    SetSettingsUpdated = 'admin/sitesettings/SET_SETTINGS_UPDATED',
    SetUpdateSettingsError = 'admin/sitesettings/SET_SETTINGS_UPDATE_ERROR'
}

export const beginLoadSettings = () =>
    createAction(IAdminSiteSettingsActions.BeginLoadSettings);

export const setSiteSettings = (settings: ISiteSettings) =>
    createAction(IAdminSiteSettingsActions.SetSiteSettings, settings);

export const setLoadSiteSettingsError = () =>
    createAction(IAdminSiteSettingsActions.SetLoadSiteSettingsError);

export const beginUpdateSettings = (settings: ISiteSettings) =>
    createAction(IAdminSiteSettingsActions.BeginUpdateSettings, settings);

export const setSettingsUpdated = (settings: ISiteSettings) =>
    createAction(IAdminSiteSettingsActions.SetSettingsUpdated, settings);

export const setUpdateSettingsError = () =>
    createAction(IAdminSiteSettingsActions.SetUpdateSettingsError);
