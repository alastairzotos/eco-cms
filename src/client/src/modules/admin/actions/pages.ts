import { IPage } from '@common';
import { createAction } from '~/core';

export enum IAdminPagesActionType {
    BeginAddPage = 'admin/pages/BEGIN_ADD_PAGE',
    AddPage = 'admin/pages/ADD_PAGE',
    SetAddPageError = 'admin/pages/SET_ADD_PAGE_ERROR',

    BeginGetPages = 'admin/pages/BEGIN_GET_PAGES',
    SetPages = 'admin/pages/SET_PAGES',
    SetGetPagesError = 'admin/pages/SET_GET_PAGES_ERROR'
}

export const beginAddPage = (page: IPage) =>
    createAction(IAdminPagesActionType.BeginAddPage, page);

export const addPage = (page: IPage) =>
    createAction(IAdminPagesActionType.AddPage, page);

export const setAddPageError = () =>
    createAction(IAdminPagesActionType);

export const beginGetPages = () =>
    createAction(IAdminPagesActionType.BeginGetPages);

export const setPages = (pages: IPage[]) =>
    createAction(IAdminPagesActionType.SetPages, pages);

export const setGetPagesError = () =>
    createAction(IAdminPagesActionType.SetGetPagesError);
