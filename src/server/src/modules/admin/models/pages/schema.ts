import { Schema } from 'mongoose';

const componentSchema = new Schema();
componentSchema.add({
    type: {
        type: [String, String],
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    props: {
        type: Schema.Types.Mixed,
        required: false
    },
    children: {
        type: [componentSchema],
        required: false
    }
});

const columnSchema = new Schema({
    span: {
        type: Number,
        required: true
    },
    children: [componentSchema]
});

const rowSchema = new Schema({
    columns: [columnSchema]
});

const pageContentSchema = new Schema({
    rows: [rowSchema]
});

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
    staging: [pageContentSchema],
    production: [pageContentSchema]
});
