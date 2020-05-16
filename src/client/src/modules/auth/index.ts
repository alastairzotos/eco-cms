import { IModule } from '~/core';

import epic from './epics';
import pages from './pages';
import reducer from './reducers';

export * from './actions';
export * from './reducers';

export const authModule: IModule = {
    name: 'auth',
    epic,
    reducer,
    pages
};
