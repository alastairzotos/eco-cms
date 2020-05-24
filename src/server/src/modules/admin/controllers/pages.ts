import { IPage } from '@common*';
import { catchAsync, createRouter } from '~/core/routes';
import { authenticate } from '~/modules/auth';

import { IPageRecord } from '../models';
import { adminService } from '../services';

export const pagesRouter = createRouter();

pagesRouter.get('/pages/get', authenticate, catchAsync<any, IPageRecord[]>(async (req, res) => {
    const pages = await adminService.pages.getPages();

    res.json(pages);
}));

pagesRouter.post('/pages/add', authenticate, catchAsync<any, IPageRecord, IPage>(async (req, res) => {
    const page = await adminService.pages.addPage(req.body);

    res.json(page);
}));

pagesRouter.post('/pages/delete', authenticate, catchAsync<any, any, IPage>(async (req, res) => {
    await adminService.pages.deletePage(req.body);

    res.sendStatus(200);
}));

pagesRouter.post('/pages/save', authenticate, catchAsync<any, IPageRecord, IPage>(async (req, res) => {
    await adminService.pages.savePage(req.body);

    res.sendStatus(200);
}));

pagesRouter.get('/pages/get-page', catchAsync<any, IPageRecord, any, { path: string }>(async (req, res) => {
    const page = await adminService.pages.getPageByPath(req.query.path);

    if (!page) {
        return res.sendStatus(404);
    }

    res.json(page);
}));
