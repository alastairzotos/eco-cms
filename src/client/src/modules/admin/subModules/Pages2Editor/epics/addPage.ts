import { IPage2 } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    addPage,
    IAdminPages2ActionType,
    setAddPageError
} from '../actions';

export const addPageEpic: Epic = action$ =>
    action$.ofType(IAdminPages2ActionType.BeginAddPage).pipe(
        switchMap((action: IAction<IAdminPages2ActionType, IPage2>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages2/add',
                body: action.payload
            }).pipe(
                switchMap((res: IResponse<IPage2>) => of(addPage(res.body))),
                catchError(() => of(setAddPageError())),
            );
        }),
    );
