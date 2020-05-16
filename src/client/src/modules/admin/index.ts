import { IModule } from '~/core';

// import epic from './epics';
import pages from './pages';
import reducer from './reducers';

// export * from './actions';
export * from './reducers';

export const adminModule: IModule = {
    name: 'admin',
    epic: null,
    reducer,
    pages
};
