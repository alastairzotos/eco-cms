import { IPage, ISiteSettings } from '@common*';
import { Model } from '~/core/model';

import { siteSettingsSchema } from './schema';
import { ISiteSettingsRecord } from './types';

export class SiteSettingsModel extends Model<ISiteSettingsRecord> {
    constructor() {
        super('sitesettings', siteSettingsSchema);
    }
    private settingsId: string;

    init = async () => {
        const settings = await this.getSettings();

        if (!settings) {
            const record = await this.model.create({
                selectedTheme: {
                    moduleId: '',
                    themeName: ''
                },
                navigationItems: []
            } as ISiteSettings);

            await record.save();
            this.settingsId = record._id;
        } else {
            this.settingsId = settings._id;
        }
    }

    getSettings = async () =>
        this.model.findOne()

    updateSettings = async (settings: ISiteSettings) =>
        this.model.updateOne({ _id: this.settingsId }, settings)
}

export const siteSettingsModel = new SiteSettingsModel();
