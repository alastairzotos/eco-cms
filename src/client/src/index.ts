import { applyModules } from './core';
import {
    adminModule,
    authModule
} from './modules';

applyModules([
    authModule,
    adminModule
]);
