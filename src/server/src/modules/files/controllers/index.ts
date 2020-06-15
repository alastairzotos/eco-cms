import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import config from '~/config';
import { createRouter, identity } from '~/core/routes';

export const filesRouter = createRouter();

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
    url: connectionString
});

const upload = multer({ storage });

filesRouter.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.sendStatus(200);
});
