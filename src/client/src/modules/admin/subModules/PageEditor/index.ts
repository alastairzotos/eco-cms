import { IModule } from '~/core';

import { pagesEpic } from './epics';
import { pageEditorApp } from './pages/PageEditor';
import { pagesReducer } from './reducers';

export * from './reducers';

export const pageEditorModule: IModule = {
    name: 'pages',
    reducer: pagesReducer,
    epic: pagesEpic,
    adminPages: [pageEditorApp]
};
