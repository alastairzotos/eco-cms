import { IModule } from '~/core';

import pages from './pages';
import { themeReducer } from './reducers';

export const mainAdmin: IModule = {
    name: 'main',
    reducer: themeReducer,
    pages
};

export * from './reducers';
export * from './selectors';
export * from './actions';
