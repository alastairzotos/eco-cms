import { IModule } from '~/core';

import { dashboardApp } from './apps/Dashboard/Dashboard';
import { pageEditorApp } from './apps/PageEditor';
import epic from './epics';
import pages from './pages';
import reducer from './reducers';

export * from './actions';
export * from './reducers';

export const adminModule: IModule = {
    name: 'admin',
    epic,
    reducer,
    pages,
    adminPages: [
        dashboardApp,
        pageEditorApp
    ]
};
