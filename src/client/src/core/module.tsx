import { Dictionary } from 'lodash';
import { AnyAction, combineReducers, Reducer, Store } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { IAdminApp } from './adminApp';
import { IPages } from './pages';
import { ITheme } from './theme';

type IDispatchFunction = (action: AnyAction) => void;
export interface IModule {
    name: string;
    onInit?: (dispatch: IDispatchFunction) => void;
    epic?: Epic;
    reducer?: Reducer;
    pages?: IPages;
    adminPages?: IAdminApp[];
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
}

export const moduleManager = new ModuleManager();
