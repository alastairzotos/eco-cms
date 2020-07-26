import { IPage } from '@common*';
import { FC } from 'react';

export type IPages = { [url: string]: FC<any> };

interface IPageTree<T> {
    page: IPage;
    children: Array<IPageTree<T>>;
}

interface IPageToTreeOptions<T> {
    populate?: (page: IPage) => Partial<T>;
    filter?: (page: IPage) => boolean;
}

export const pagesToTree = <T>(
    pages: IPage[],
    options?: IPageToTreeOptions<T>,
    parent?: IPage
): Array<IPageTree<T>> => {
    options = {
        populate: () => ({}),
        filter: () => true,
        ...options
    };

    return pages
        .filter(page => (
            parent
                ? page.navigation.parentPage && page.navigation.parentPage._id === parent._id
                : !page.navigation.parentPage
        ))
        .filter(options.filter)
        .map(page => ({
            page,
            children: pagesToTree(pages, options, page),
            ...options.populate(page)
        }));
};
