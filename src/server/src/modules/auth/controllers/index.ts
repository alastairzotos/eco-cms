import { Router } from 'express';
import { catchAsync } from '~/core/routes';

import { IAuthResponse, IUser, users } from '../models';

export const authRouter = Router({
    caseSensitive: true,
    strict: true
});

authRouter.post('/login', catchAsync<any, IAuthResponse, { user: IUser }>(async (req, res) => {
    const { email, password } = req.body.user;
    const user = await users.model.findOne({ email }).select('+password');

    if (!user || !users.validatePassword(user, password)) {
        return res.sendStatus(400);
    }

    res.json(await users.toAuthResponse(user));
}));

authRouter.post('/register', catchAsync<any, IAuthResponse, { user: IUser }>(async (req, res) => {
    const userData = req.body.user;
    const user = await users.model.create(userData);

    users.setPassword(user, userData.password);

    await user.save();
    res.json(await users.toAuthResponse(user));
}));
