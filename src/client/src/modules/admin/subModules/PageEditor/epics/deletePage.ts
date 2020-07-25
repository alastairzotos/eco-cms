import { IPage } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import {
    IAdminPageEditorActionType,
    setDeletePageError,
    setPageDeleted
} from '../actions';

export const deletePageEpic: Epic = action$ =>
    action$.ofType(IAdminPageEditorActionType.BeginDeletePage).pipe(
        switchMap((action: IAction<IAdminPageEditorActionType, IPage>) => {
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
