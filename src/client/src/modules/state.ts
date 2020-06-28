import { IAdminState } from './admin';
import { IAuthState } from './auth/reducers';
import { IPagesState } from './pages/reducers';

export interface IState {
    auth: IAuthState;
    admin: IAdminState;
    pages: IPagesState;
}
