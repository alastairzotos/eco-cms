import { Service } from '~/core/service';

import { pagesService, PagesService } from './pages';

class AdminService extends Service {

    constructor() {
        super();

        this.pages = pagesService;
    }
    pages: PagesService;
}

export const adminService = new AdminService();
