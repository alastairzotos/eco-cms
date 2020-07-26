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
    pageType: {
        type: String
    },
    content: {
        type: String
    },
    published: {
        type: Boolean
    },
    navigation: {
        parentPage: {
            type: Schema.Types.ObjectId,
            ref: 'pages'
        },
        selected: Boolean
    }
});
