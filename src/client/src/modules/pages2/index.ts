import { IModule } from '~/core';

import epic from './epics';
import pages from './pages';
import reducer from './reducers';

export * from './actions';
export * from './reducers';

export const pages2Module: IModule = {
    name: 'pages2',
    epic,
    reducer,
    pages
};
