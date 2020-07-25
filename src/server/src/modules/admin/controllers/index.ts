import { createRouter } from '~/core/routes';

import { pagesRouter } from './pages';
import { siteSettingsRouter } from './sitesettings';

export const adminRouter = createRouter();

adminRouter.use(
    '/admin',
    pagesRouter,
    siteSettingsRouter
);
