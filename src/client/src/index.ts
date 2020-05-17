import { applyModules } from './core';
import {
    adminModule,
    authModule,
    pagesModule
} from './modules';

applyModules([
    authModule,
    adminModule,
    pagesModule
]);
