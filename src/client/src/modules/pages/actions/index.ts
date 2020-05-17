import { IPage } from '@common';
import { Dictionary } from 'lodash';
import { createAction } from '~/core';

export enum IPagesActions {
    BeginGetPage = 'pages/BEGIN_GET_PAGE',
    SetPage = 'pages/SET_PAGE',
    SetGetPageError = 'pages/SET_GET_PAGE_ERROR'
}

export const beginGetPage = (path: string) =>
    createAction(IPagesActions.BeginGetPage, path);

export const setPage = (page: IPage) =>
    createAction(IPagesActions.SetPage, page);

export const setGetPageError = (error: number) =>
    createAction(IPagesActions.SetGetPageError, error);
