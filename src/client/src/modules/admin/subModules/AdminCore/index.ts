import { IModule } from '~/core';

import pages from './pages';
import { coreReducer } from './reducers';

export const adminCore: IModule = {
    name: 'core',
    reducer: coreReducer,
    pages
};

export * from './reducers';
export * from './selectors';
export * from './actions';
