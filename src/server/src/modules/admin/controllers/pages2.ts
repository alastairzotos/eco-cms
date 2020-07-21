import { IPage2 } from '@common*';
import { catchAsync, createRouter } from '~/core/routes';
import { authenticate } from '~/modules/auth';

import { IPage2Record } from '../models';
import { adminService } from '../services';

export const pages2Router = createRouter();

pages2Router.get('/pages2/get', authenticate, catchAsync<any, IPage2Record[]>(async (req, res) => {
    const pages = await adminService.pages2.getPages();

    res.json(pages);
}));

pages2Router.post('/pages2/add', authenticate, catchAsync<any, IPage2Record, IPage2>(async (req, res) => {
    const page = await adminService.pages2.addPage(req.body);

    res.json(page);
}));

pages2Router.post('/pages2/delete', authenticate, catchAsync<any, any, IPage2>(async (req, res) => {
    await adminService.pages2.deletePage(req.body);

    res.sendStatus(200);
}));

pages2Router.post('/pages2/save', authenticate, catchAsync<any, IPage2Record, IPage2>(async (req, res) => {
    await adminService.pages2.savePage(req.body);

    res.sendStatus(200);
}));

pages2Router.get('/pages2/get-page', catchAsync<any, IPage2Record, any, { path: string }>(async (req, res) => {
    const page = await adminService.pages2.getPageByPath(req.query.path);

    if (!page) {
        return res.sendStatus(404);
    }

    res.json(page);
}));
