import { IPage } from '@common*';
import { catchAsync, createRouter } from '~/core/routes';
import { authenticate } from '~/modules/auth';

import { IPageRecord } from '../models';
import { adminService } from '../services';

export const pagesRouter = createRouter();

pagesRouter.get('/pages', authenticate, catchAsync<any, IPageRecord[]>(async (req, res) => {
    const pages = await adminService.pages.getPages();

    res.json(pages);
}));

pagesRouter.post('/add', authenticate, catchAsync<any, IPageRecord, IPage>(async (req, res) => {
    const page = await adminService.pages.addPage(req.body);

    res.json(page);
}));
