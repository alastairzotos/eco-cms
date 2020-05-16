import { IModule } from '~/core/module';

import { authRouter } from './controllers';
import { users } from './models';
import { authService } from './services';

export const authModule: IModule = {
    router: authRouter,
    model: users,
    service: authService
};

export * from './middleware';
