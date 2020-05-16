import { IAuthResponse, IUser } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { fetch$, IAction, IResponse } from '~/core';

import {
    IAuthActionTypes,
    setRegisterUserError,
    setUserRegistered
} from '../actions';

export const registerEpic: Epic = action$ =>
    action$.ofType(IAuthActionTypes.RegisterUser).pipe(
        mergeMap((action: IAction<IAuthActionTypes, IUser>) => {
            return fetch$({
                method: 'POST',
                url: '/register',
                body: action.payload
            }).pipe(
                mergeMap(() => of(setUserRegistered())),
                catchError(() => of(setRegisterUserError())),
            );
        }),
    );
