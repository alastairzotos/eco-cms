import { IPage } from '@common';
import { Document } from 'mongoose';

export type IPageRecord = IPage & Document;
