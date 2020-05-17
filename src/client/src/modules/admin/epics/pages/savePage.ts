import { IPage } from '@common';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';
import { IResponse } from '~/core/fetch';

import {
    IAdminPagesActionType,
    setPageSaved,
    setSavePageError
} from '../../actions';

export const savePageEpic: Epic = action$ =>
    action$.ofType(IAdminPagesActionType.BeginSavePage).pipe(
        switchMap((action: IAction<IAdminPagesActionType, IPage>) => {
            return fetch$({
                method: 'POST',
                url: '/admin/pages/save',
                body: action.payload
            }).pipe(
                switchMap(() => of(setPageSaved(action.payload))),
                catchError(e => of(setSavePageError(e))),
            );
        }),
    );
