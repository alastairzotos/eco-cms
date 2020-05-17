import { IPage } from '@common';
import { createAction } from '~/core';

import { IPageInfo } from '../models';

export enum IAdminPagesActionType {
    BeginAddPage = 'admin/pages/BEGIN_ADD_PAGE',
    AddPage = 'admin/pages/ADD_PAGE',
    SetAddPageError = 'admin/pages/SET_ADD_PAGE_ERROR',

    BeginGetPages = 'admin/pages/BEGIN_GET_PAGES',
    SetPages = 'admin/pages/SET_PAGES',
    SetGetPagesError = 'admin/pages/SET_GET_PAGES_ERROR',

    SelectCurrentPage = 'admin/pages/SELECT_CURRENT_PAGE',
    SetPageData = 'admin/pages/SET_PAGE_DATA',

    BeginSavePage = 'admin/pages/BEGIN_SAVE_PAGE',
    SetPageSaved = 'admin/pages/SET_PAGE_SAVED',
    SetSavePageError = 'admin/page/SET_SAVE_PAGE_ERROR'
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

export const selectCurrentPage = (id: string) =>
    createAction(IAdminPagesActionType.SelectCurrentPage, id);

export const setPageData = (data: IPageInfo) =>
    createAction(IAdminPagesActionType.SetPageData, data);

export const beginSavePage = (data: IPageInfo) =>
    createAction(IAdminPagesActionType.BeginSavePage, data);

export const setPageSaved = (data: IPageInfo) =>
    createAction(IAdminPagesActionType.SetPageSaved, data);

export const setSavePageError = (error: string) =>
    createAction(IAdminPagesActionType.SetSavePageError, error);
