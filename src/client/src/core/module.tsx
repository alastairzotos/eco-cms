import { Dictionary } from 'lodash';
import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { IAdminApp } from './adminApp';
import { IComponentType } from './createComponent';
import { IPages } from './pages';

export type IComponents = Dictionary<IComponentType>;
type IModuleComponents = Dictionary<IComponents>;

export interface IModule {
    name: string;
    epic?: Epic;
    reducer?: Reducer;
    pages?: IPages;
    adminPages?: IAdminApp[];
    components?: IComponents;
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
    moduleMap: Dictionary<IModule> = {};

    combineModules = (name: string): IModule => {
        this.moduleMap = this.modules.reduce((map, mod) => ({
            ...map,
            [mod.name]: mod
        }), {});

        return combineModules(name, ...this.modules);
    }

    getApps = (): IAdminApp[] =>
        [].concat.apply(
            [],
            this.modules.map(mod => mod.adminPages)
        ).filter(app => !!app)

    getModuleComponents = (): IModuleComponents => {
        const components: IModuleComponents = {};

        this.modules.forEach(mod => {
            const keys = mod.components ? Object.keys(mod.components) : [];
            if (keys.length > 0) {
                components[mod.name] = components[mod.name] || {};

                keys.forEach(key => {
                    components[mod.name][key] = mod.components[key];
                });
            }
        });

        return components;
    }
}

export const moduleManager = new ModuleManager();
