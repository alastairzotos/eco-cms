import { IAuthPayload, IAuthResponse } from '@common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import config from '~/config';
import { Model } from '~/core/model';

import { userSchema } from './schema';
import { IUserRecord } from './types';

const SALT_ROUNDS = 10;

class AuthModel extends Model<IUserRecord> {
    constructor() {
        super('Users', userSchema);
    }

    setPassword = (user: IUserRecord, password: string) => {
        user.password = bcrypt.hashSync(password, SALT_ROUNDS);
    }

    validatePassword = (user: IUserRecord, password: string) =>
        bcrypt.compareSync(password, user.password)

    generateJWT = async (user: IUserRecord) =>
        jwt.sign(
            {
                id: user._id,
                email: user.email
            } as IAuthPayload,
            config.authkey,
            {
                expiresIn: '24h'
            }
        )

    toAuthResponse = async (user: IUserRecord): Promise<IAuthResponse> => {
        const userObject = { ...user.toObject() };
        delete userObject.password;

        return {
            ...userObject,
            token: await this.generateJWT(user)
        };
    }
}

export const users = new AuthModel();
