import { IFolder } from '@common';
import { Document } from 'mongoose';

export type IFolderRecord = IFolder & Document;
