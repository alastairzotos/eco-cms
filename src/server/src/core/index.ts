import { IUser } from '~/modules/auth/models/users/types';

declare global {
    namespace Express {
        interface Request {
            loggedInUser: IUser;
        }
    }
}
