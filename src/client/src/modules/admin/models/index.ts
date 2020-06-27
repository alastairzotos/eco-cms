import { IPage } from '@common';

export type IPageInfo = IPage & {
    scroll?: number;
};

export type IFilesViewStyle = 'grid' | 'list';
