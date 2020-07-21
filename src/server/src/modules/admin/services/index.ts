import { Service } from '~/core/service';

import { pagesService, PagesService } from './pages';
import { pages2Service, Pages2Service } from './pages2';

class AdminService extends Service {

    constructor() {
        super();

        this.pages = pagesService;
        this.pages2 = pages2Service;
    }
    pages: PagesService;
    pages2: Pages2Service;

    onStart = async () => {
        await this.pages.onStart();
        await this.pages2.onStart();
    }
}

export const adminService = new AdminService();
