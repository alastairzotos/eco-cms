import { IPage } from '@common';
import { createAction } from '~/core';

export enum IAdminPageEditorActionType {
    BeginAddPage = 'admin/pageeditor/BEGIN_ADD_PAGE',
    AddPage = 'admin/pageeditor/ADD_PAGE',
    SetAddPageError = 'admin/pageeditor/SET_ADD_PAGE_ERROR',

    BeginGetPages = 'admin/pageeditor/BEGIN_GET_PAGES',
    SetPages = 'admin/pageeditor/SET_PAGES',
    SetGetPagesError = 'admin/pageeditor/SET_GET_PAGES_ERROR',

    SelectCurrentPage = 'admin/pageeditor/SELECT_CURRENT_PAGE',
    SetPageData = 'admin/pageeditor/SET_PAGE_DATA',

    BeginSavePage = 'admin/pageeditor/BEGIN_SAVE_PAGE',
    SetPageSaved = 'admin/pageeditor/SET_PAGE_SAVED',
    SetSavePageError = 'admin/page/SET_SAVE_PAGE_ERROR',

    BeginDeletePage = 'admin/pageeditor/BEGIN_DELETE_PAGE',
    SetPageDeleted = 'admin/pageeditor/SET_PAGE_DELETED',
    SetDeletePageError = 'admin/pageeditor/SET_DELETE_PAGE_ERROR',
}

export const beginAddPage = (page: IPage) =>
    createAction(IAdminPageEditorActionType.BeginAddPage, page);

export const addPage = (page: IPage) =>
    createAction(IAdminPageEditorActionType.AddPage, page);

export const setAddPageError = () =>
    createAction(IAdminPageEditorActionType);

export const beginGetPages = () =>
    createAction(IAdminPageEditorActionType.BeginGetPages);

export const setPages = (pages: IPage[]) =>
    createAction(IAdminPageEditorActionType.SetPages, pages);

export const setGetPagesError = () =>
    createAction(IAdminPageEditorActionType.SetGetPagesError);

export const selectCurrentPage = (id: string) =>
    createAction(IAdminPageEditorActionType.SelectCurrentPage, id);

export const setPageData = (data: IPage) =>
    createAction(IAdminPageEditorActionType.SetPageData, data);

export const beginSavePage = (data: IPage) =>
    createAction(IAdminPageEditorActionType.BeginSavePage, data);

export const setPageSaved = (data: IPage) =>
    createAction(IAdminPageEditorActionType.SetPageSaved, data);

export const setSavePageError = (error: IPage) =>
    createAction(IAdminPageEditorActionType.SetSavePageError, error);

export const beginDeletePage = (page: IPage) =>
    createAction(IAdminPageEditorActionType.BeginDeletePage, page);

export const setPageDeleted = (page: IPage) =>
    createAction(IAdminPageEditorActionType.SetPageDeleted, page);

export const setDeletePageError = () =>
    createAction(IAdminPageEditorActionType.SetDeletePageError);
