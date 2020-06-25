import { IModule } from '~/core/module';

import { filesRouter } from './controllers';
import { folders } from './models';
import { filesService } from './services';

export const filesModule: IModule = {
    router: filesRouter,
    model: folders,
    service: filesService
};
