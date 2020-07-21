import { IPage2 } from '@common';
import { createAction } from '~/core';

export enum IAdminPages2ActionType {
    BeginAddPage = 'admin/pages2/BEGIN_ADD_PAGE',
    AddPage = 'admin/pages2/ADD_PAGE',
    SetAddPageError = 'admin/pages2/SET_ADD_PAGE_ERROR',

    BeginGetPages = 'admin/pages2/BEGIN_GET_PAGES',
    SetPages = 'admin/pages2/SET_PAGES',
    SetGetPagesError = 'admin/pages2/SET_GET_PAGES_ERROR',

    SelectCurrentPage = 'admin/pages2/SELECT_CURRENT_PAGE',
    SetPageData = 'admin/pages2/SET_PAGE_DATA',

    BeginSavePage = 'admin/pages2/BEGIN_SAVE_PAGE',
    SetPageSaved = 'admin/pages2/SET_PAGE_SAVED',
    SetSavePageError = 'admin/page/SET_SAVE_PAGE_ERROR',

    BeginDeletePage = 'admin/pages2/BEGIN_DELETE_PAGE',
    SetPageDeleted = 'admin/pages2/SET_PAGE_DELETED',
    SetDeletePageError = 'admin/pages2/SET_DELETE_PAGE_ERROR',
}

export const beginAddPage = (page: IPage2) =>
    createAction(IAdminPages2ActionType.BeginAddPage, page);

export const addPage = (page: IPage2) =>
    createAction(IAdminPages2ActionType.AddPage, page);

export const setAddPageError = () =>
    createAction(IAdminPages2ActionType);

export const beginGetPages = () =>
    createAction(IAdminPages2ActionType.BeginGetPages);

export const setPages = (pages: IPage2[]) =>
    createAction(IAdminPages2ActionType.SetPages, pages);

export const setGetPagesError = () =>
    createAction(IAdminPages2ActionType.SetGetPagesError);

export const selectCurrentPage = (id: string) =>
    createAction(IAdminPages2ActionType.SelectCurrentPage, id);

export const setPageData = (data: IPage2) =>
    createAction(IAdminPages2ActionType.SetPageData, data);

export const beginSavePage = (data: IPage2) =>
    createAction(IAdminPages2ActionType.BeginSavePage, data);

export const setPageSaved = (data: IPage2) =>
    createAction(IAdminPages2ActionType.SetPageSaved, data);

export const setSavePageError = (error: IPage2) =>
    createAction(IAdminPages2ActionType.SetSavePageError, error);

export const beginDeletePage = (page: IPage2) =>
    createAction(IAdminPages2ActionType.BeginDeletePage, page);

export const setPageDeleted = (page: IPage2) =>
    createAction(IAdminPages2ActionType.SetPageDeleted, page);

export const setDeletePageError = () =>
    createAction(IAdminPages2ActionType.SetDeletePageError);
