import { IModule } from '~/core/module';

import { adminRouter } from './controllers';
import { adminService } from './services';

export const adminModule: IModule = {
    router: adminRouter,
    model: null,
    service: adminService
};
