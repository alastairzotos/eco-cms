import { Dictionary } from 'lodash';
import { IModule, moduleManager, startApp } from '~/core';
import {
    adminModule,
    authModule,
    coreModule,
    // pagesModule,
    pages2Module,
} from '~/modules';

export const start = (modules: IModule[] = []) => {
    moduleManager.modules = [
        coreModule,
        authModule,
        adminModule,
        // pagesModule,
        pages2Module,
        ...modules
    ];

    startApp();
};
