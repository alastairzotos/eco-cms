import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import passport from 'passport';
import * as path from 'path';
import xss from 'xss-clean';
import config from '~/config';

import { AppError } from './error';
import { IModule } from './module';
import { coreModules } from './modules';
import { createRouter } from './routes';

const startApp = async (modules: IModule[]) => {
    console.log('Connecting to database...');
    await mongoose.connect(
        config.db.connectionString.replace('%PASSWORD%', config.db.password),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log('Connected');

    const app = express();

    const rateLimiter = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this IP, please try again in 1h',
    });

    app.use(bodyParser());
    app.use(cookieParser());
    app.use(cors());
    app.use(mongoSanitize());
    // app.use(xss());
    app.use(helmet());
    app.use(compression());
    app.use(passport.initialize());
    app.use('*', rateLimiter);

    const api = createRouter();
    modules.forEach(mod => {
        if (mod.service) {
            mod.service.onStart();
        }
        api.use(mod.router);
    });
    api.use('*', req => {
        throw new AppError(`Endpoint not found: ${req.path}`, 404);
    });

    app.use('/api', api);

    app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
    });

    // app.all('*', () => {
    //     throw new AppError('Endpoint not found', 404);
    // });

    const errorHandler: ErrorRequestHandler = (error: AppError, req, res, next) => {
        const statusCode = error.statusCode || 500;
        console.log(error);
        res.sendStatus(statusCode);
    };

    app.use(errorHandler);

    const server = app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });

    process.on('unhandledRejection', (error: any) => {
        console.log(error);
        server.close(() => {
            // WARNING! shut down application.
            console.log('Shutting down...');
            process.exit(1);
        });
    });

    // When Heroku ends the process
    process.on('SIGTERM', () => {
        console.log('SIGTERM RECIEVED, Shutting down gracefully');

        // Do all the super important stuff here before it closes

        server.close(() => {
            console.log('Process terminated');
        });
    });
};

export const start = (modules: IModule[], onError: (e: any) => void) =>
    startApp([...coreModules, ...modules]).catch(onError);
