import { IFile, IFilesAndFolders } from '@common';
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
    gfs.collection('fs');
});

const storage = new GridFsStorage({
    url: connectionString,
    file: (req: Request<any, any, any, { path: string }>, file) => ({
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

privateRouter.post(
    '/update-filename',
    authenticate,
    catchAsync<any, any, IFile>(async (req, res) => {
        await filesService.updateFilename(req.body, await conn);
        res.sendStatus(200);
    })
);

const staticRouter = createRouter();

staticRouter.get('*', catchAsync(async (req, res) => {
    const filename = req.params[0];

    gfs.exist({ filename }, async (err, found) => {
        if (err || !found) {
            return res.status(404).send('File not found');
        }

        gfs.files.find({ filename }).toArray((_, files) => {
            res.set('Content-Type', files[0].contentType);
            res.set('Content-Disposition', 'attachment; filename="' + files[0].filename + '"');

            const readstream = gfs.createReadStream({ filename });
            readstream.pipe(res);
        });
    });
}));

export const filesRouter = createRouter();
filesRouter.use('/files', privateRouter);
filesRouter.use('/static', staticRouter);
