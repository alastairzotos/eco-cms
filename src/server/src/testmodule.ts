import { IModule } from './core/module';
import { createRouter } from './core/routes';

const testRouter = createRouter();

testRouter.get('/test', (req, res) => {
    res.json('test!');
});

export const testModule: IModule = {
    router: testRouter,
    model: null,
    service: null
};
