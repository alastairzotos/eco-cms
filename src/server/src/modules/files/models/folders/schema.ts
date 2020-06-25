import { Schema } from 'mongoose';

export const folderSchema = new Schema({
    path: {
        type: String,
        required: [true, '']
    }
});
