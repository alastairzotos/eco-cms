import { ISiteSettings } from '@common*';
import { Service } from '~/core/service';

import { siteSettingsModel } from '../models/sitesettings';

export class SiteSettingsService extends Service {
    onStart = async () => {
        await siteSettingsModel.init();
    }

    getSettings = async () =>
        siteSettingsModel.getSettings()

    updateSettings = async (settings: ISiteSettings) =>
        siteSettingsModel.updateSettings(settings)
}

export const siteSettingsService = new SiteSettingsService();
