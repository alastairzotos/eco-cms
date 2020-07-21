import { createRouter } from '~/core/routes';

import { pagesRouter } from './pages';
import { pages2Router } from './pages2';

export const adminRouter = createRouter();

adminRouter.use(
    '/admin',
    pagesRouter,
    pages2Router
);
