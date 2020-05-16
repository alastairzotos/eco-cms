import { IModule } from '~/core/module';

import { authRouter } from './controllers';
import { users } from './models';
import { authService } from './services';

const module: IModule = {
    router: authRouter,
    model: users,
    service: authService
};

export default module;

export * from './controllers';
export * from './middleware';
export * from './models';
export * from './services';
