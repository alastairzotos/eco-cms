import { IFilesAndFolders } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction, IResponse } from '~/core';

import { IAdminFilesActionTypes, setFilesAndFolders, setGetFilesAndFoldersError } from '../actions';

export const getFilesAndFoldersEpic: Epic = action$ =>
    action$.ofType(IAdminFilesActionTypes.BeginGetFilesAndFolders).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, string>) =>
            fetch$({
                method: 'GET',
                url: '/files/files-folders',
                query: { path: action.payload }
            }).pipe(
                switchMap((res: IResponse<IFilesAndFolders>) => of(setFilesAndFolders(res.body))),
                catchError(() => of(setGetFilesAndFoldersError()))
            )
        )
    );
