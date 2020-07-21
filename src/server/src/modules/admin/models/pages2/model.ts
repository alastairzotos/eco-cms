import { IPage2 } from '@common*';
import { Model } from '~/core/model';

import { page2Schema } from './schema';
import { IPage2Record } from './types';

export class Pages2Model extends Model<IPage2Record> {
    constructor() {
        super('pages2', page2Schema);
    }

    getPages = async () =>
        this.model.find()

    addPage = async (page: IPage2) => {
        const record = await this.model.create(page);

        return record.save();
    }

    savePage = async (page: IPage2) =>
        this.model.updateOne({ _id: page._id }, page)

    deletePage = async (page: IPage2) =>
        this.model.findByIdAndDelete(page._id)

    getPageByPath = async (path: string): Promise<IPage2Record> =>
        this.model.findOne({ path })
}

export const pages2Model = new Pages2Model();
