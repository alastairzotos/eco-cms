import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';
import { fetch$ } from '~/core';

import {
    IAuthActionTypes,
    setUserLoggedOut,
    setUserLogoutError
} from '../actions';

export const logoutEpic: Epic = action$ =>
    action$.ofType(IAuthActionTypes.BeginLogoutUser).pipe(
        switchMap(() => {
            return fetch$({
                method: 'POST',
                url: '/perf-logout'
            }).pipe(
                switchMap(() => of(setUserLoggedOut())),
                catchError(e => of(setUserLogoutError())),
            );
        }),
    );
