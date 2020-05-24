import { IPage } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import {
    IAdminPagesActionType,
    setDeletePageError,
    setPageDeleted
} from '../../actions';

export const deletePageEpic: Epic = action$ =>
    action$.ofType(IAdminPagesActionType.BeginDeletePage).pipe(
        switchMap((action: IAction<IAdminPagesActionType, IPage>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages/delete',
                body: action.payload
            }).pipe(
                switchMap(() => of(setPageDeleted(action.payload))),
                catchError(() => of(setDeletePageError())),
            );
        }),
    );
