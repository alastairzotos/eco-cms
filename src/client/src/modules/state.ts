import { IAdminState } from './admin/reducers';
import { IAuthState } from './auth/reducers';

export interface IState {
    auth: IAuthState;
    admin: IAdminState;
}
