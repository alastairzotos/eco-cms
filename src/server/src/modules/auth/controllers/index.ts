import { IAuthResponse } from '@common';
import { catchAsync, createRouter } from '~/core/routes';

import { IUserRecord, users } from '../models';

export const authRouter = createRouter();

authRouter.post('/login', catchAsync<any, IAuthResponse, IUserRecord>(async (req, res) => {
    const { email, password } = req.body;

    const user = await users.model.findOne({ email }).select('+password');

    if (!user || !users.validatePassword(user, password)) {
        return res.sendStatus(400);
    }

    const authResponse = await users.toAuthResponse(user);
    res.cookie('ecotoken', authResponse.token).json(authResponse);
}));

authRouter.post('/register', catchAsync<any, IAuthResponse, IUserRecord>(async (req, res) => {
    const userData = req.body;
    const user = await users.model.create(userData);

    users.setPassword(user, userData.password);
    await user.save();

    const authResponse = await users.toAuthResponse(user);
    res.cookie('ecotoken', authResponse.token).json(authResponse);
}));
