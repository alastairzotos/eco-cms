import { Document } from 'mongoose';

export interface IAuthPayload {
    id: string;
    email: string;
}

export interface IUserLoginPayload {
    email: string;
    password: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    // company: ICompany['_id'];  <-- for referencing other models
}

export interface IAuthResponse extends IUser {
    token: string;
}
