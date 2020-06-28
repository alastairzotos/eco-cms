import { IFile, IFilesAndFolders } from '@common*';
import { ObjectID } from 'mongodb';
import * as mongoose from 'mongoose';
import { Service } from '~/core/service';

import { folders } from '../models';

const isInFolder = (filename: string, path: string) => {
    if (filename !== path && filename.startsWith(path)) {
        const basename = filename.substr(path.length + 1);

        return basename.indexOf('/') < 0;
    }

    return false;
};

export class FilesService extends Service {
    constructor() {
        super();
    }

    updateFilename = async (file: IFile, filesConn: mongoose.Connection) => {
        await filesConn.collection('fs.files')
            .updateOne({ _id: new ObjectID(file._id) }, {
                $set: {
                    filename: file.filename
                }
            });
    }

    getFilesAndFolders = async (path: string, filesConn: mongoose.Connection): Promise<IFilesAndFolders> => {
        const allFolders = await folders.getFolders();
        const subFolders = allFolders.filter(folder => isInFolder(folder.path, path));

        const allFiles = await filesConn.collection('fs.files').find<IFile>().toArray();
        const subFiles = allFiles.filter(file => isInFolder(file.filename, path));

        return {
            files: subFiles,
            folders: subFolders
        };
    }
}

export const filesService = new FilesService();
