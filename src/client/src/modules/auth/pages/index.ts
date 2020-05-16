import loadable from '@loadable/component';
import { IPages } from '~/core';

export default {
    '/login': loadable(async () => import('./LoginPage')),
    '/register': loadable(async () => import('./RegisterPage'))
} as IPages;
