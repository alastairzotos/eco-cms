import { IPage } from '@common';
import { Service } from '~/core/service';

import { IPageRecord, pagesModel } from '../models';

export class PagesService extends Service {
    onStart = async () => {
        const pages = await this.getPages();

        const homePath = '/';

        if (!pages.find(page => page.path === homePath)) {
            await this.addPage({
                path: homePath,
                title: 'My site',
                description: 'Welcome to my site',
                pageType: 'home',
                content: 'Welcome to my home page!',
                published: false,
                navigation: {
                    parentPage: null,
                    selected: true
                }
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
