import { Service } from '~/core/service';

import { pagesService, PagesService } from './pages';
import { SiteSettingsService, siteSettingsService } from './sitesettings';

class AdminService extends Service {

    constructor() {
        super();

        this.pages = pagesService;
        this.siteSettings = siteSettingsService;
    }
    pages: PagesService;
    siteSettings: SiteSettingsService;

    onStart = async () => {
        await this.pages.onStart();
        await this.siteSettings.onStart();
    }
}

export const adminService = new AdminService();
