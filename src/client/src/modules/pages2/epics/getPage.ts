import { IPage2 } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction, IResponse } from '~/core';

import { IPages2Actions, setGetPageError, setPage } from '../actions';

export const getPageEpic: Epic = action$ =>
    action$.ofType(IPages2Actions.BeginGetPage).pipe(
        switchMap((action: IAction<IPages2Actions, string>) =>
            fetch$({
                method: 'GET',
                url: '/admin/pages2/get-page',
                query: { path: action.payload }
            }).pipe(
                switchMap((res: IResponse<IPage2>) => of(setPage(res.body))),
                catchError(e => of(setGetPageError(e.status)))
            )
        )
    );
