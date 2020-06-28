import { IPage } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    addPage,
    IAdminPagesActionType,
    setAddPageError
} from '../actions';

export const addPageEpic: Epic = action$ =>
    action$.ofType(IAdminPagesActionType.BeginAddPage).pipe(
        switchMap((action: IAction<IAdminPagesActionType, IPage>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages/add',
                body: action.payload
            }).pipe(
                switchMap((res: IResponse<IPage>) => of(addPage(res.body))),
                catchError(() => of(setAddPageError())),
            );
        }),
    );
