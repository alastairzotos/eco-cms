import { Dictionary } from 'lodash';
import { IModule, moduleManager, startApp } from '~/core';
import {
    adminModule,
    authModule,
    pagesModule
} from '~/modules';

export const start = (
    components: Dictionary<any>,
    modules: IModule[] = []
) => {
    moduleManager.components = components;
    moduleManager.modules = [
        authModule,
        adminModule,
        pagesModule,
        ...modules
    ];

    startApp();
};
