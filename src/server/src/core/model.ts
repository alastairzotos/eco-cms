import * as mongoose from 'mongoose';

export class Model<S extends mongoose.Document, T extends mongoose.Model<S, {}> = mongoose.Model<S, {}>> {

    constructor(name: string, schema: mongoose.Schema) {
        this.model = mongoose.model<S, T>(name, schema);
    }
    model: T;
}
