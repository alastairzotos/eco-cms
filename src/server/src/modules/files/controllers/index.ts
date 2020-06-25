import { IFilesAndFolders } from '@common';
import { Request } from 'express';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import * as path from 'path';
import config from '~/config';
import { catchAsync, createRouter } from '~/core/routes';
import { authenticate } from '~/modules/auth';

import { filesService } from '../services';

const privateRouter = createRouter();

let gfs: Grid.Grid;

const connectionString = config.db.connectionString.replace('%PASSWORD%', config.db.password);

const conn = mongoose.createConnection(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: connectionString,
    file: (req: Request<any, any, any, { path: string}>, file) => ({
        filename: path.resolve(req.query.path, file.originalname)
    })
});

const upload = multer({ storage });

privateRouter.post('/upload', authenticate, upload.array('files'), (req, res) => {
    res.sendStatus(200);
});

privateRouter.get(
    '/files-folders',
    authenticate,
    catchAsync<any, IFilesAndFolders, any, { path: string }>(async (req, res) => {
        res.json(await filesService.getFilesAndFolders(req.query.path, await conn));
    })
);

export const filesRouter = createRouter();
filesRouter.use('/files', privateRouter);
