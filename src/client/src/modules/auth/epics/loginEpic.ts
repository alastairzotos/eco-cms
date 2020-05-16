import { IAuthResponse, IUserLoginPayload } from '@common';
import cookies from 'cookiesjs';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    IAuthActionTypes,
    setLoginError,
    setUserLoggedIn
} from '../actions';

export const loginEpic: Epic = action$ =>
    action$.ofType(IAuthActionTypes.LoginUser).pipe(
        switchMap((action: IAction<IAuthActionTypes, IUserLoginPayload>) => {
            return fetch$({
                method: 'POST',
                url: '/login',
                body: action.payload
            }).pipe(
                switchMap((res: IResponse<IAuthResponse>) => {
                    cookies({ ecotoken: res.body.token });
                    return of(setUserLoggedIn(res.body));
                }),
                catchError(e => {
                    if (e.status === 401 || e.status === 404) {
                        return of(setLoginError({ statusCode: e.status }));
                    } else {
                        return of(setLoginError({ statusCode: 500 }));
                    }
                }),
            );
        }),
    );
