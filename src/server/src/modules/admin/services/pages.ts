import { IPage } from '@common*';
import { Service } from '~/core/service';

import { pagesModel } from '../models';

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
}

export const pagesService = new PagesService();
