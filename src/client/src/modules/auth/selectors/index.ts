import { createSelector } from 'reselect';
import { IState } from '~/modules/state';

import { IRegisterResponseType } from '../models';

const getState = (state: IState) => state.auth;

export const isLoggingIn = createSelector(
    getState,
    state => state.loginCallStatus === 'fetching'
);

export const getLoginError = createSelector(
    getState,
    state => state.loginCallStatus === 'error'
);

export const isLoggedIn = createSelector(
    getState,
    state => !!state.loggedInUser
);

export const getLoggedInUser = createSelector(
    getState,
    state => state.loggedInUser
);

export const isRegistering = createSelector(
    getState,
    state => state.registerCallStatus === 'fetching'
);

export const hasError = createSelector(
    getState,
    state => state.registerCallStatus === 'error'
);

export const isRegistered = createSelector(
    getState,
    state => state.registerCallStatus === 'success'
);

export const isGettingLoggedInUser = createSelector(
    getState,
    state => state.getLoggedInUserStatus === 'fetching'
);

export const hasGetLoggedInUserError = createSelector(
    getState,
    state => state.getLoggedInUserStatus === 'error'
);

export const isUserLoggingOut = createSelector(
    getState,
    state => state.logoutCallStatus === 'fetching'
);
