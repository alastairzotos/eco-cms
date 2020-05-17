import { IPage } from '@common';
import { Service } from '~/core/service';

import { IPageRecord, pagesModel } from '../models';

export class PagesService extends Service {
    onStart = async () => {
        // tslint:disable-line
    }

    getPages = async () =>
        pagesModel.getPages()

    addPage = async (page: IPage) =>
        pagesModel.addPage(page)

    savePage = async (page: IPage) =>
        pagesModel.savePage(page)

    getPageByPath = async (path: string): Promise<IPageRecord> => {
        const pathWithoutQs = path.includes('?') ? path.split('?')[0] : path;

        return pagesModel.getPageByPath(pathWithoutQs);
    }
}

export const pagesService = new PagesService();
