import { IPage } from '@common*';
import { ListItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import * as React from 'react';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentPage, setPages } from '../actions';
import { getPages, getSelectedPageId } from '../selectors';

import './pages.css';

const useStyles = makeStyles(theme => ({
    pageItem: {
        'padding': theme.spacing(1),
        '&:hover': {
            outline: `1px dashed ${theme.palette.divider}`
        }
    }
}));

export const PagesView: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const pages = useSelector(getPages);
    const selectedPageId = useSelector(getSelectedPageId);

    return (
        <RLDD
            items={pages.map((page, index) => ({ id: index, ...page }))}
            itemRenderer={(item: { id: number } & IPage) => {
                return (
                    <ListItem
                        className={clsx('page-list-item', classes.pageItem)}
                        button
                        selected={item._id === selectedPageId}
                        onClick={() => dispatch(selectCurrentPage(item._id))}
                    >
                        {item.title}
                    </ListItem>
                );
            }}

            onChange={items => {
                dispatch(setPages(items as any));
            }}
        />
    );
};
