import { ISiteSettings } from '@common*';
import { catchAsync, createRouter } from '~/core/routes';
import { authenticate } from '~/modules/auth';

import { siteSettingsService } from '../services/sitesettings';

export const siteSettingsRouter = createRouter();

siteSettingsRouter.get('/settings', authenticate, catchAsync<any, ISiteSettings>(async (req, res) => {
    const settings = await siteSettingsService.getSettings();
    res.json(settings);
}));

siteSettingsRouter.post('/settings', authenticate, catchAsync<any, any, ISiteSettings>(async (req, res) => {
    await siteSettingsService.updateSettings(req.body);
    res.sendStatus(200);
}));
