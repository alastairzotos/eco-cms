import { IModule } from '~/core';

import { pages2Epic } from './epics';
import { pageEditorApp } from './pages/PageEditor';
import { pages2Reducer } from './reducers';

export * from './reducers';

export const pages2Module: IModule = {
    name: 'pages2',
    reducer: pages2Reducer,
    epic: pages2Epic,
    adminPages: [pageEditorApp],
};
