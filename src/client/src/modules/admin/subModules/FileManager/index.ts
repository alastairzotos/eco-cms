import { IModule } from '~/core';

import { filesEpic } from './epics';
import { fileManagerApp } from './pages/FileManager';
import { filesReducer } from './reducers';

export const filesModule: IModule = {
    name: 'files',
    reducer: filesReducer,
    epic: filesEpic,
    adminPages: [
        fileManagerApp
    ]
};

export * from './reducers';
