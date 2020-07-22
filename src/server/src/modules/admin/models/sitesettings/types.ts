import { ISiteSettings } from '@common';
import { Document } from 'mongoose';

export type ISiteSettingsRecord = ISiteSettings & Document;
