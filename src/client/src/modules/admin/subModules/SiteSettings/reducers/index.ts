import { ISiteSettings } from '@common*';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core';

import { IAdminSiteSettingsActions } from '../actions';

export interface IAdminSiteSettingsState {
    loadSettingsStatus: ICallStatus | null;
    updateSettingsStatus: ICallStatus | null;
    siteSettings: ISiteSettings;
}

const INITIAL_STATE: IAdminSiteSettingsState = {
    loadSettingsStatus: null,
    updateSettingsStatus: null,
    siteSettings: null
};

export const siteSettingsReducer = createReducer<IAdminSiteSettingsState>(INITIAL_STATE, {
    [IAdminSiteSettingsActions.BeginLoadSettings]: state => ({
        ...state,
        loadSettingsStatus: 'fetching'
    }),
    [IAdminSiteSettingsActions.SetSiteSettings]: (state, action: PayloadAction<ISiteSettings>) => ({
        ...state,
        loadSettingsStatus: 'success',
        siteSettings: action.payload
    }),
    [IAdminSiteSettingsActions.SetLoadSiteSettingsError]: state => ({
        ...state,
        loadSettingsStatus: 'error'
    }),

    [IAdminSiteSettingsActions.BeginUpdateSettings]: state => ({
        ...state,
        updateSettingsStatus: 'fetching'
    }),
    [IAdminSiteSettingsActions.SetSettingsUpdated]: (state, action: PayloadAction<ISiteSettings>) => ({
        ...state,
        updateSettingsStatus: 'success',
        siteSettings: action.payload
    }),
    [IAdminSiteSettingsActions.SetUpdateSettingsError]: state => ({
        ...state,
        updateSettingsStatus: 'error'
    })
});
