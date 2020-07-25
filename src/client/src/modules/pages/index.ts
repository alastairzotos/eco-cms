import { IModule } from '~/core';

import epic from './epics';
import pages from './pages';
import reducer from './reducers';

export * from './actions';
export * from './reducers';

export const pagesModule: IModule = {
    name: 'pages',
    epic,
    reducer,
    pages
};
