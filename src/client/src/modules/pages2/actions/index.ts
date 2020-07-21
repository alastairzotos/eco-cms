import { IPage2 } from '@common';
import { Dictionary } from 'lodash';
import { createAction } from '~/core';

export enum IPages2Actions {
    BeginGetPage = 'pages2/BEGIN_GET_PAGE',
    SetPage = 'pages2/SET_PAGE',
    SetGetPageError = 'pages2/SET_GET_PAGE_ERROR'
}

export const beginGetPage = (path: string) =>
    createAction(IPages2Actions.BeginGetPage, path);

export const setPage = (page: IPage2) =>
    createAction(IPages2Actions.SetPage, page);

export const setGetPageError = (error: number) =>
    createAction(IPages2Actions.SetGetPageError, error);
