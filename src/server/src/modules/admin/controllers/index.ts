import { createRouter } from '~/core/routes';

import { pagesRouter } from './pages';

export const adminRouter = createRouter();

adminRouter.use(
    '/admin',
    pagesRouter
);
