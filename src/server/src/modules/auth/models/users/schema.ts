import { Schema } from 'mongoose';

export const userSchema = new Schema({
    name: {
        type: String,
        required: [true, '']
    },
    email: {
        type: String,
        unique: true,
        required: [true, '']
    },
    password: {
        type: String,
        minlength: [8, 'Password too short'],
        required: [true, ''],
        select: false
    }
});
