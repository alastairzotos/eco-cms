import { IPage } from '@common*';
import { Service } from '~/core/service';

import { pagesModel } from '../models';

export class PagesService extends Service {
    onStart = async () => {
        // tslint:disable-line
    }

    getPages = async () => {
        const pages = await pagesModel.getPages();

        return pages;
    }

    addPage = async (page: IPage) => {
        return pagesModel.addPage(page);
    }
}

export const pagesService = new PagesService();
