import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import { IAdminFilesActionTypes, setFileUploaded, setFileUploadeError } from '../../actions';

export const uploadFilesEpic: Epic = action$ =>
    action$.ofType(IAdminFilesActionTypes.BeginUploadFile).pipe(
        switchMap((action: IAction<IAdminFilesActionTypes, FileList>) => {
            const formData = new FormData();
            formData.set('enctype', 'multipart/form-data');
            for (let i = 0; i < action.payload.length; i++) {
                formData.append('files', action.payload.item(i));
            }

            return fetch$({
                method: 'POST',
                url: '/upload',
                contentType: 'multipart/form-data',
                body: formData
            }).pipe(
                switchMap(() => of(setFileUploaded())),
                catchError(() => of(setFileUploadeError()))
            );
        })
);
