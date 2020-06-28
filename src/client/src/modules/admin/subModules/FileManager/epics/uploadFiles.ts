import { Observable } from 'redux';
import { Epic, StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';
import { IState } from '~/modules/state';

import { IAdminFilesActionTypes, setFilesUploaded, setFilesUploadError } from '../actions';
import { getCurrentPath } from '../selectors';

export const uploadFilesEpic: Epic = (action$, state$: StateObservable<IState>) =>
    action$.ofType(IAdminFilesActionTypes.BeginUploadFiles).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, File[]>) => {
            const formData = new FormData();
            formData.set('enctype', 'multipart/form-data');
            action.payload.forEach(item => {
                formData.append('files', item);
            });

            return fetch$({
                method: 'POST',
                url: '/files/upload',
                contentType: 'multipart/form-data',
                body: formData,
                query: { path: getCurrentPath(state$.value) }
            }).pipe(
                switchMap(() => of(setFilesUploaded())),
                catchError(() => of(setFilesUploadError()))
            );
        })
);
