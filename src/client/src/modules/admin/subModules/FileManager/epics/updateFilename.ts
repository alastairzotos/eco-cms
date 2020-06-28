import { IFile } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import { IAdminFilesActionTypes, setFile, setUpdateFileError } from '../actions';

export const updateFilenameEpic: Epic = action$ =>
    action$.ofType(IAdminFilesActionTypes.BeginUpdateFile).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, IFile>) =>
            fetch$({
                method: 'POST',
                url: '/files/update-filename',
                body: action.payload
            }).pipe(
                switchMap(() => of(setFile(action.payload))),
                catchError(() => of(setUpdateFileError()))
            )
        )
    );
