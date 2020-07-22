import { combineEpics } from 'redux-observable';

import { getSiteSettingsEpic } from './getSiteSettings';
import { updateSiteSettingsEpic } from './updateSiteSettings';

export const siteSettingsEpic = combineEpics(
    getSiteSettingsEpic,
    updateSiteSettingsEpic
);
