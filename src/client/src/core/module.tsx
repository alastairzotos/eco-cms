import { combineReducers, Reducer } from 'redux';
import { combineEpics, Epic } from 'redux-observable';

import { IPages } from './pages';

export interface IModule {
    name: string;
    epic: Epic;
    reducer: Reducer;
    pages?: IPages;
}

const combinePages = (modules: IModule[]): IPages => {
    const pages: IPages = {};

    modules.forEach(mod => {
        if (mod.pages) {
            Object.keys(mod.pages).forEach(uri => {
                pages[uri] = mod.pages[uri];
            });
        }
    });

    return pages;
};

export const combineModules = (
    name: string,
    modules: IModule[],
    initialReducers: {
        [name: string]: Reducer
    } = {}
): IModule => ({
    name,
    epic: combineEpics(...modules.map(mod => mod.epic).filter(epic => !!epic)),
    reducer: combineReducers(modules.reduce(
        (result, { name: subName, reducer }) => ({
            ...result,
            [subName]: reducer,
        }),
        initialReducers,
    )),
    pages: combinePages(modules)
});
