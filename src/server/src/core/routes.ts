import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import * as core from 'express-serve-static-core';

export const createRouter = () =>
    Router({
        caseSensitive: true,
        mergeParams: true,
        strict: true
    });

/**
 * Type arguments:
 * - Path params
 * - Response body
 * - Request body
 * - Query params
 */
export const catchAsync = <P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, Q = core.Query>(
    controller: RequestHandler<P, ResBody, ReqBody, Q>
): RequestHandler =>
    (req, res, next) =>
        controller(req as any, res, next).catch(e => next(e));

export const identity = (req: Request, res: Response, next: NextFunction) => {
    console.log('identify');
    next();
};
