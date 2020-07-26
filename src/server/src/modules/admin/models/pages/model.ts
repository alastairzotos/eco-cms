import { IPage } from '@common*';
import { Model } from '~/core/model';

import { pageSchema } from './schema';
import { IPageRecord } from './types';

export class PagesModel extends Model<IPageRecord> {
    constructor() {
        super('pages', pageSchema);
    }

    getPages = async () =>
        this.model.find().populate('navigation.parentPage')

    addPage = async (page: IPage) => {
        const record = await this.model.create(page);

        return record.save();
    }

    savePage = async (page: IPage) =>
        this.model.updateOne({ _id: page._id }, page)

    deletePage = async (page: IPage) =>
        this.model.findByIdAndDelete(page._id)

    getPageByPath = async (path: string): Promise<IPageRecord> =>
        this.model.findOne({ path })
}

export const pagesModel = new PagesModel();
