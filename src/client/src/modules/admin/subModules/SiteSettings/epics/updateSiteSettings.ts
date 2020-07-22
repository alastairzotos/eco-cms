import { ISiteSettings } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IAction } from '~/core';

import { IAdminSiteSettingsActions, setSettingsUpdated, setUpdateSettingsError } from '../actions';

export const updateSiteSettingsEpic: Epic = action$ =>
    action$.ofType(IAdminSiteSettingsActions.BeginUpdateSettings).pipe(
        switchMap((action: IAction<IAdminSiteSettingsActions, ISiteSettings>) =>
            fetch$({
                method: 'POST',
                url: '/admin/settings',
                body: action.payload
            }).pipe(
                switchMap(() => of(setSettingsUpdated(action.payload))),
                catchError(() => of(setUpdateSettingsError()))
            )
        )
    );
