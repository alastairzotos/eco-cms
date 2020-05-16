import { RequestHandler } from 'express';
import * as core from 'express-serve-static-core';

export const catchAsync = <P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, Q = core.Query>(
    controller: RequestHandler<P, ResBody, ReqBody, Q>
): RequestHandler =>
    (req, res, next) =>
        controller(req as any, res, next).catch(e => next(e));
