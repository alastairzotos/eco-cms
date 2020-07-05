import { Dictionary } from 'lodash';
import * as React from 'react';
import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { IAdminApp } from './adminApp';
import { IPages } from './pages';

export interface IModule {
    name: string;
    epic?: Epic;
    reducer?: Reducer;
    pages?: IPages;
    adminPages?: IAdminApp[];
    components?: Dictionary<React.FC>;
}

export const combineModules = (name: string, ...modules: IModule[]): IModule => ({
    name,
    epic: combineEpics(
        ...modules
            .map(mod => mod.epic)
            .filter(epic => !!epic)
    ),
    reducer: combineReducers(
        modules
            .filter(mod => !!mod.reducer)
            .reduce((result, { name: moduleName, reducer }) => ({
                ...result,
                [moduleName]: reducer
            }), {})
    ),
    pages: modules
        .filter(mod => !!mod.pages)
        .reduce((allPages, mod) => ({
            ...allPages,
            ...(Object.keys(mod.pages).reduce((modulePages, url) => ({
                ...modulePages,
                [url]: mod.pages[url]
            }), {}))
        }), {}),
    adminPages: [].concat.apply(
        [],
        modules.map(mod => mod.adminPages)
    ).filter(app => !!app),
    components: modules.reduce((comps, mod) => ({
        ...comps,
        ...(mod.components || {})
    }), {})
});

class ModuleManager {
    constructor() {
        // tslint:disable-line
    }

    modules: IModule[];

    combineModules = (name: string): IModule =>
        combineModules(name, ...this.modules)

    getApps = (): IAdminApp[] =>
        [].concat.apply(
            [],
            this.modules.map(mod => mod.adminPages)
        ).filter(app => !!app)
}

export const moduleManager = new ModuleManager();
