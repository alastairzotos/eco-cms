import { Dictionary } from 'lodash';
import { AnyAction, combineReducers, Reducer, Store } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { IAdminApp } from './adminApp';
import { IComponentInfo } from './createComponent';
import { IPages } from './pages';
import { ITheme } from './theme';

export type IComponents = Dictionary<IComponentInfo>;
type IModuleComponents = Dictionary<IComponents>;

type IDispatchFunction = (action: AnyAction) => void;
export interface IModule {
    name: string;
    onInit?: (dispatch: IDispatchFunction) => void;
    epic?: Epic;
    reducer?: Reducer;
    pages?: IPages;
    adminPages?: IAdminApp[];
    components?: IComponents;
    themes?: ITheme[];
}

export const combineModules = (name: string, ...modules: IModule[]): IModule => ({
    name,
    onInit: (dispatch: IDispatchFunction) =>
        modules.forEach(mod => mod.onInit && mod.onInit(dispatch)),
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
    }), {}),
    themes: [].concat.apply(
        [],
        modules.map(mod => mod.themes)
    ).filter(theme => !!theme)
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
