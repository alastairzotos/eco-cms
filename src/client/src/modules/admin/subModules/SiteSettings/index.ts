import { IModule } from '~/core';

import { beginLoadSettings } from './actions';
import { siteSettingsAdminApp } from './apps/SiteSettingsEditor';
import { siteSettingsEpic } from './epics';
import { siteSettingsReducer } from './reducers';

export * from './reducers';
export * from './selectors';

export const siteSettingsModule: IModule = {
    name: 'siteSettings',
    onInit: dispatch => dispatch(beginLoadSettings()),
    reducer: siteSettingsReducer,
    epic: siteSettingsEpic,
    adminPages: [
        siteSettingsAdminApp
    ]
};
