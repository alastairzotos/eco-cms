import { IPage2 } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import {
    IAdminPages2ActionType,
    setDeletePageError,
    setPageDeleted
} from '../actions';

export const deletePageEpic: Epic = action$ =>
    action$.ofType(IAdminPages2ActionType.BeginDeletePage).pipe(
        switchMap((action: IAction<IAdminPages2ActionType, IPage2>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages2/delete',
                body: action.payload
            }).pipe(
                switchMap(() => of(setPageDeleted(action.payload))),
                catchError(() => of(setDeletePageError())),
            );
        }),
    );
