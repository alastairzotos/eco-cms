import { IPage } from '@common*';
import { Model } from '~/core/model';

import { pageSchema } from './schema';
import { IPageRecord } from './types';

export class PagesModel extends Model<IPageRecord> {
    constructor() {
        super('pages', pageSchema);
    }

    getPages = async () => {
        const pages = await this.model.find();

        return pages;
    }

    addPage = async (page: IPage) => {
        const record = await this.model.create(page);

        return record.save();
    }
}

export const pagesModel = new PagesModel();
