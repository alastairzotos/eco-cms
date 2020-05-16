import { IUser } from '@common';
import { Document } from 'mongoose';

export type IUserRecord = IUser & Document;
