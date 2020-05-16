import { IUser, IUserLoginPayload } from '@common';
import { createAction } from '~/core';

export enum IAuthActionTypes {
    RegisterUser = 'auth/REGISTER_USER',
    SetUserConflict = 'auth/SET_USER_CONFLICT',
    SetUserRegistered = 'auth/SET_USER_REGISTERED',
    SetRegisterUserError = 'auth/SET_REGISTER_USER_ERROR',
    LoginUser = 'auth/LOGIN_USER',
    SetLoginError = 'auth/SET_LOGIN_ERROR',
    SetUserLoggedIn = 'auth/SET_USER_LOGGED_IN',
    BeginGetLoggedInUser = 'auth/BEGIN_GET_LOGGED_IN_USER',
    SetGetLoggedInUserError = 'auth/SET_GET_LOGGED_IN_USER_ERROR',
    SetLoggedInUser = 'auth/SET_LOGGED_IN_USER',
    BeginLogoutUser = 'auth/BEGIN_LOGOUT_USER',
    SetUserLogoutError = 'auth/SET_USER_LOGOUT_ERROR',
    SetUserLoggedOut = 'auth/SET_USER_LOGGED_OUT',
}

export interface ILoginErrorPayload {
    statusCode: number;
}

export const loginUser = (loginDetails: IUserLoginPayload) =>
    createAction<IAuthActionTypes, IUserLoginPayload>(IAuthActionTypes.LoginUser, loginDetails);

export const setLoginError = (payload: ILoginErrorPayload) =>
    createAction<IAuthActionTypes, ILoginErrorPayload>(IAuthActionTypes.SetLoginError, payload);

export const setUserLoggedIn = (user: IUser) =>
    createAction<IAuthActionTypes, IUser>(IAuthActionTypes.SetUserLoggedIn, user);

export const registerUser = (registerDetails: IUser) =>
    createAction<IAuthActionTypes, IUser>(IAuthActionTypes.RegisterUser, registerDetails);

export const setUserConflict = () =>
    createAction<IAuthActionTypes, never>(IAuthActionTypes.SetUserConflict);

export const setUserRegistered = () =>
    createAction<IAuthActionTypes, never>(IAuthActionTypes.SetUserRegistered);

export const setRegisterUserError = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.SetRegisterUserError);

export const beginGetLoggedInUser = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.BeginGetLoggedInUser);

export const setGetLoggedInUserError = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.SetGetLoggedInUserError);

export const setLoggedInUser = (user: IUser) =>
    createAction<IAuthActionTypes, IUser>(IAuthActionTypes.SetLoggedInUser, user);

export const beginLogoutUser = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.BeginLogoutUser);

export const setUserLogoutError = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.SetUserLogoutError);

export const setUserLoggedOut = () =>
    createAction<IAuthActionTypes>(IAuthActionTypes.SetUserLoggedOut);
