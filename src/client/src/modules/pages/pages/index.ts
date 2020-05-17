import loadable from '@loadable/component';
import { IPages } from '~/core';

export default {
    '/:path': loadable(async () => import('./StaticPage')),
} as IPages;
