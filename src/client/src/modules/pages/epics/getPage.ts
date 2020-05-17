import { IPage } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction, IResponse } from '~/core';

import { IPagesActions, setGetPageError, setPage } from '../actions';

export const getPageEpic: Epic = action$ =>
    action$.ofType(IPagesActions.BeginGetPage).pipe(
        switchMap((action: IAction<IPagesActions, string>) =>
            fetch$({
                method: 'GET',
                url: '/admin/pages/get-page',
                query: { path: action.payload }
            }).pipe(
                switchMap((res: IResponse<IPage>) => of(setPage(res.body))),
                catchError(e => of(setGetPageError(e.status)))
            )
        )
    );
