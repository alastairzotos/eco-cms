import { Router } from 'express';

import { Model } from './model';
import { Service } from './service';

export interface IModule {
    router: Router;
    model: Model<any, any>;
    service: Service;
}
