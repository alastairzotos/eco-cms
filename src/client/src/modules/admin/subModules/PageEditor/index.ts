import { IModule } from '~/core';

import { beginGetPages } from './actions';
import { pagesEditorEpic } from './epics';
import { pageEditorApp } from './pages/PageEditor';
import { pageEditorReducer } from './reducers';

export * from './reducers';

export const pageEditorModule: IModule = {
    name: 'pageEditor',
    onInit: dispatch => dispatch(beginGetPages()),
    reducer: pageEditorReducer,
    epic: pagesEditorEpic,
    adminPages: [pageEditorApp],
};
