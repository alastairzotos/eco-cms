import { IPage } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$ } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    IAdminPagesActionType,
    setGetPagesError,
    setPages
} from '../../actions';

export const getPagesEpic: Epic = action$ =>
    action$.ofType(IAdminPagesActionType.BeginGetPages).pipe(
        switchMap(() => {
            return fetch$({
                method: 'GET',
                url: '/admin/pages/get'
            }).pipe(
                switchMap((res: IResponse<IPage[]>) => of(setPages(res.body))),
                catchError(() => of(setGetPagesError())),
            );
        }),
    );
