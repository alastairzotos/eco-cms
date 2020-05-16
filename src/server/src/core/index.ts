import { IUserRecord } from '~/modules/auth/models/users/types';

declare global {
    namespace Express {
        interface Request {
            loggedInUser: IUserRecord;
        }
    }
}
