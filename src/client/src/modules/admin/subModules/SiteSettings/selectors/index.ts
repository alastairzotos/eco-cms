import { createSelector } from 'reselect';
import { moduleManager } from '~/core';
import { IState } from '~/modules/state';

const getState = (state: IState) => state.admin.siteSettings;

export const getSiteSettingsLoadStatus = createSelector(
    getState,
    state => state.loadSettingsStatus
);

export const getSiteSettings = createSelector(
    getState,
    state => state.siteSettings
);

export const getSelectedTheme = createSelector(
    getState,
    state =>
        moduleManager
            .moduleMap[state.siteSettings.selectedTheme.moduleId]
            .themes
            .find(theme => theme.name === state.siteSettings.selectedTheme.themeName)
);

export const getSiteSettingsUpdateStatus = createSelector(
    getState,
    state => state.updateSettingsStatus
);
