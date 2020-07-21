import { IPage2 } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$ } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    IAdminPages2ActionType,
    setGetPagesError,
    setPages
} from '../actions';

export const getPagesEpic: Epic = action$ =>
    action$.ofType(IAdminPages2ActionType.BeginGetPages).pipe(
        switchMap(() => {
            return fetch$({
                method: 'GET',
                url: '/admin/pages2/get'
            }).pipe(
                switchMap((res: IResponse<IPage2[]>) => of(setPages(res.body))),
                catchError(() => of(setGetPagesError())),
            );
        }),
    );
