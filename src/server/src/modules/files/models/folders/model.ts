import { IFolder } from '@common*';
import { Model } from '~/core/model';

import { folderSchema } from './schema';
import { IFolderRecord } from './types';

class FoldersModel extends Model<IFolderRecord> {
    constructor() {
        super('Folders', folderSchema);
    }

    getFolders = async () =>
        this.model.find()

    addFolder = async (folder: IFolder) => {
        const record = await this.model.create(folder);

        return record.save();
    }

    saveFolder = async (folder: IFolder) =>
        this.model.updateOne({ _id: folder._id }, folder)

    deleteFolder = async (folder: IFolder) =>
        this.model.findByIdAndDelete(folder._id)

    getFolderByPath = async (path: string): Promise<IFolderRecord> =>
        this.model.findOne({ path })

}

export const folders = new FoldersModel();
