import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import { IAdminFilesActionTypes, setFilesUploaded, setFilesUploadError } from '../../actions';

export const uploadFilesEpic: Epic = action$ =>
    action$.ofType(IAdminFilesActionTypes.BeginUploadFiles).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, File[]>) => {
            const formData = new FormData();
            formData.set('enctype', 'multipart/form-data');
            action.payload.forEach(item => {
                formData.append('files', item);
            });

            return fetch$({
                method: 'POST',
                url: '/upload',
                contentType: 'multipart/form-data',
                body: formData
            }).pipe(
                switchMap(() => of(setFilesUploaded())),
                catchError(() => of(setFilesUploadError()))
            );
        })
);
