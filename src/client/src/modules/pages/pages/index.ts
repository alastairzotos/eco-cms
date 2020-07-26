import loadable from '@loadable/component';
import { IPages } from '~/core';

export default {
    '/': loadable(async () => import('./StaticPage')),
    '*': loadable(async () => import('./StaticPage')),
} as IPages;
