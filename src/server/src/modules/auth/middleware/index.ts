import { IAuthPayload } from '@common*';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '~/config';
import { catchAsync } from '~/core/routes';

import { users } from '../models';

const getTokenFromHeaders = (req: Request): string | null => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }

    return null;
};

export const authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req);
    if (!token) {
        return res.sendStatus(401);
    }

    const authPayload: IAuthPayload = jwt.verify(token, config.authkey) as any;
    if (!authPayload) {
        return res.sendStatus(401);
    }

    const user = await users.model.findById(authPayload.id);
    if (!user) {
        return res.sendStatus(401);
    }

    req.loggedInUser = user;
    next();
});
