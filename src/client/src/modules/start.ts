import { ThemeOptions } from '@material-ui/core';
import { Dictionary } from 'lodash';
import { IModule, moduleManager, startApp } from '~/core';
import {
    adminModule,
    authModule,
    pagesModule
} from '~/modules';

export const start = (
    components: Dictionary<any>,
    theme: ThemeOptions,
    modules: IModule[] = []
) => {
    moduleManager.components = components;
    moduleManager.theme = theme;
    moduleManager.modules = [
        authModule,
        adminModule,
        pagesModule,
        ...modules
    ];

    startApp();
};
