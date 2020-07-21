import { IPage2 } from '@common';
import { Service } from '~/core/service';

import { IPage2Record, pages2Model } from '../models';

export class Pages2Service extends Service {
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
                published: false
            });
        }
    }

    getPages = async () =>
        pages2Model.getPages()

    addPage = async (page: IPage2) =>
        pages2Model.addPage(page)

    savePage = async (page: IPage2) =>
        pages2Model.savePage(page)

    deletePage = async (page: IPage2) =>
        pages2Model.deletePage(page)

    getPageByPath = async (path: string): Promise<IPage2Record> => {
        const pathWithoutQs = path.includes('?') ? path.split('?')[0] : path;

        return pages2Model.getPageByPath(pathWithoutQs);
    }
}

export const pages2Service = new Pages2Service();
