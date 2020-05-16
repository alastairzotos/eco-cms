import { IUser } from '@common';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { ICallStatus } from '~/core/fetch';

import { IAuthActionTypes, ILoginErrorPayload } from '../actions';

export interface IAuthState {
    registerCallStatus: ICallStatus | null;
    loginCallStatus: ICallStatus | null;
    logoutCallStatus: ICallStatus | null;
    getLoggedInUserStatus: ICallStatus | null;
    loggedInUser: IUser | null;
}

const INITIAL_STATE: IAuthState = {
    registerCallStatus: null,
    loginCallStatus: null,
    logoutCallStatus: null,
    getLoggedInUserStatus: null,
    loggedInUser: null
};

export const authReducer = createReducer<IAuthState>(INITIAL_STATE, {
    [IAuthActionTypes.RegisterUser]: state => ({
        ...state,
        userExists: false,
        registerCallStatus: 'fetching'
    }),

    [IAuthActionTypes.SetUserConflict]: state => ({
        ...state,
        registerCallStatus: 'error',
        userExists: true
    }),

    [IAuthActionTypes.SetUserRegistered]: state => ({
        ...state,
        userExists: false,
        registerCallStatus: 'success'
    }),

    [IAuthActionTypes.SetRegisterUserError]: state => ({
        ...state,
        registerCallStatus: 'error'
    }),

    [IAuthActionTypes.LoginUser]: state => ({
        ...state,
        loginCallStatus: 'fetching'
    }),

    [IAuthActionTypes.SetLoginError]: (state, action: PayloadAction<ILoginErrorPayload>) => ({
        ...state,
        loginCallStatus: 'error'
    }),

    [IAuthActionTypes.SetUserLoggedIn]: (state, action: PayloadAction<IUser>) => ({
        ...state,
        loginCallStatus: 'success',
        loggedInUser: action.payload
    }),

    [IAuthActionTypes.BeginLogoutUser]: state => ({
        ...state,
        logoutCallStatus: 'fetching'
    }),

    [IAuthActionTypes.SetUserLogoutError]: state => ({
        ...state,
        logoutCallStatus: 'error'
    }),

    [IAuthActionTypes.SetUserLoggedOut]: state => ({
        ...state,
        logoutCallStatus: 'success',
        loggedInUser: null
    }),

    [IAuthActionTypes.BeginGetLoggedInUser]: state => ({
        ...state,
        getLoggedInUserStatus: 'fetching'
    }),

    [IAuthActionTypes.SetGetLoggedInUserError]: state => ({
        ...state,
        getLoggedInUserStatus: 'error'
    }),

    [IAuthActionTypes.SetLoggedInUser]: (state, action: PayloadAction<IUser>) => ({
        ...state,
        getLoggedInUserStatus: 'success',
        loggedInUser: action.payload
    })
});
