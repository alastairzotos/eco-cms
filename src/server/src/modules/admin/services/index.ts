import { Service } from '~/core/service';

import { pagesService, PagesService } from './pages';
import { pages2Service, Pages2Service } from './pages2';
import { SiteSettingsService, siteSettingsService } from './sitesettings';

class AdminService extends Service {

    constructor() {
        super();

        this.pages = pagesService;
        this.pages2 = pages2Service;
        this.siteSettings = siteSettingsService;
    }
    pages: PagesService;
    pages2: Pages2Service;
    siteSettings: SiteSettingsService;

    onStart = async () => {
        await this.pages.onStart();
        await this.pages2.onStart();
        await this.siteSettings.onStart();
    }
}

export const adminService = new AdminService();
