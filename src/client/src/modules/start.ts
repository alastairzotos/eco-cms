import { Dictionary } from 'lodash';
import { IModule, moduleManager, startApp } from '~/core';
import {
    adminModule,
    authModule,
    coreModule,
    pagesModule,
} from '~/modules';

export const start = (modules: IModule[] = []) => {
    moduleManager.modules = [
        coreModule,
        authModule,
        adminModule,
        ...modules,
        pagesModule,    // Pages module will capture all pages, so custom module pages must come first
    ];

    startApp();
};
