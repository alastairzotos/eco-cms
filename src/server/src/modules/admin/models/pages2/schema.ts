import { Schema } from 'mongoose';

export const page2Schema = new Schema({
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
    pageType: {
        type: String
    },
    content: {
        type: String
    },
    published: {
        type: Boolean
    }
});
