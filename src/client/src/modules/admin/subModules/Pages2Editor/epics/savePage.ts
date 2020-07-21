import { IPage2 } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import {
    IAdminPages2ActionType,
    setPageSaved,
    setSavePageError
} from '../actions';

export const savePageEpic: Epic = action$ =>
    action$.ofType(IAdminPages2ActionType.BeginSavePage).pipe(
        switchMap((action: IAction<IAdminPages2ActionType, IPage2>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages2/save',
                body: action.payload
            }).pipe(
                switchMap(() => of(setPageSaved(action.payload))),
                catchError(e => of(setSavePageError(e))),
            );
        }),
    );
