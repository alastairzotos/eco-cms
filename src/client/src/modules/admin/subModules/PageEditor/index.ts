import { IModule } from '~/core';

import { pagesEditorEpic } from './epics';
import { pageEditorApp } from './pages/PageEditor';
import { pageEditorReducer } from './reducers';

export * from './reducers';

export const pageEditorModule: IModule = {
    name: 'pageEditor',
    reducer: pageEditorReducer,
    epic: pagesEditorEpic,
    adminPages: [pageEditorApp],
};
