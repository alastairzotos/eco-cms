import { Schema } from 'mongoose';

export const pageSchema = new Schema({
    path: {
        type: String,
        required: [true, 'Path not provided']
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    staging: [{
        type: String
    }],
    production: [{
        type: String
    }]
});
