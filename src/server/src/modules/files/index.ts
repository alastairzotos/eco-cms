import { IModule } from '~/core/module';

import { filesRouter } from './controllers';
// import { adminService } from './services';

export const filesModule: IModule = {
    router: filesRouter,
    model: null,
    service: null
};
