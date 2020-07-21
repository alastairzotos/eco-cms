import { IAdminState } from './admin';
import { IAuthState } from './auth/reducers';
import { IPagesState } from './pages/reducers';
import { IPages2State } from './pages2';

export interface IState {
    auth: IAuthState;
    admin: IAdminState;
    pages: IPagesState;
    pages2: IPages2State;
}
