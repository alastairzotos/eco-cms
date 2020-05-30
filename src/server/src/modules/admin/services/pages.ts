import { IPage } from '@common';
import { Service } from '~/core/service';

import { IPageRecord, pagesModel } from '../models';

export class PagesService extends Service {
    onStart = async () => {
        const pages = await this.getPages();

        const notFoundPath = '/not-found';
        const notFoundCode = '<p>Page not found</p>';

        if (!pages.find(page => page.path === notFoundPath)) {
            await this.addPage({
                path: notFoundPath,
                title: 'Page not found',
                description: 'Page not found',
                staging: [notFoundCode],
                production: [notFoundCode]
            });
        }
    }

    getPages = async () =>
        pagesModel.getPages()

    addPage = async (page: IPage) =>
        pagesModel.addPage(page)

    savePage = async (page: IPage) =>
        pagesModel.savePage(page)

    deletePage = async (page: IPage) =>
        pagesModel.deletePage(page)

    getPageByPath = async (path: string): Promise<IPageRecord> => {
        const pathWithoutQs = path.includes('?') ? path.split('?')[0] : path;

        return pagesModel.getPageByPath(pathWithoutQs);
    }
}

export const pagesService = new PagesService();
