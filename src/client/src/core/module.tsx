import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core';
import { Dictionary } from 'lodash';
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
}

class ModuleManager {
    constructor() {
        // tslint:disable-line
    }

    components: Dictionary<any>;
    modules: IModule[];

    combineModules = (
        name: string,
        initialReducers: {
            [name: string]: Reducer
        } = {}
    ): IModule => ({
        name,
        epic: combineEpics(...this.modules.map(mod => mod.epic).filter(epic => !!epic)),
        reducer: combineReducers(
            this.modules
                .filter(mod => !!mod.reducer)
                .reduce(
                    (result, { name: subName, reducer }) => ({
                        ...result,
                        [subName]: reducer,
                    }),
                    initialReducers,
                )
        ),
        pages: this.combinePages()
    })

    getApps = (): IAdminApp[] =>
        [].concat.apply(
            [],
            this.modules.map(mod => mod.adminPages)
        ).filter(app => !!app)

    private combinePages = (): IPages => {
        const pages: IPages = {};

        this.modules.forEach(mod => {
            if (mod.pages) {
                Object.keys(mod.pages).forEach(uri => {
                    pages[uri] = mod.pages[uri];
                });
            }
        });

        return pages;
    }
}

export const moduleManager = new ModuleManager();
