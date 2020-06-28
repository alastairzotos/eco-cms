import loadable from '@loadable/component';
import { IPages } from '~/core';

export default {
    '/admin/:tab': loadable(async () => import('./AdminPage')),
} as IPages;
