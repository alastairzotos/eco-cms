import { ISiteSettings } from '@common*';
import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { fetch$, IResponse } from '~/core';

import { IAdminSiteSettingsActions, setLoadSiteSettingsError, setSiteSettings } from '../actions';

export const getSiteSettingsEpic: Epic = action$ =>
    action$.ofType(IAdminSiteSettingsActions.BeginLoadSettings).pipe(
        switchMap(() =>
            fetch$({
                method: 'GET',
                url: '/admin/settings'
            }).pipe(
                switchMap((res: IResponse<ISiteSettings>) => of(setSiteSettings(res.body))),
                catchError(() => of(setLoadSiteSettingsError()))
            )
        )
    );
